'use server'

import { revalidatePath } from "next/cache";
import { addNewPost, getAllUser } from "./data";
import { redirect } from "next/navigation";

import { throws } from "assert";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Category, RestPassInputs, SignUpInputs } from "./definations";
import {hash} from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer"
import { Resend } from "resend";
import { error } from "console";
import ResetMailTemp from "../ui/main/ResetMailTemp";

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = Number(process.env.MAIL_PORT);
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;







const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// const prisma = new PrismaClient()

export async function addPost(data : FormData){
    const session = await getServerSession(authOptions)
    
    try {
        const  userId = session?.user.userId as string
        const title = data.get("title") as string
        const content = data.get('body') as string
        const category = data.get('category') as Category
        const imageUrl = data.get('url') as string
        
        addNewPost(userId,title,content , category , imageUrl)
        prisma.$disconnect()
    } catch (error) {
        throw new Error('the post cant be added') 
    }
   
   
    revalidatePath('/');
    redirect('/#posts');
   

}

export async function deletePost(id : string){

    const deleteComments =  prisma.comment.deleteMany({
        where : {
            postId : id
        }
    }
    )
    const deletePosts =  prisma.post.delete({
        where :{
            id : id
        }
    })
    // be carful in transaction other prisma cruds should not have await keyword 
    try {
        const transaction = await prisma.$transaction([deleteComments ,deletePosts ])
        prisma.$disconnect()
    } catch (error) {
        throw new Error('the post cant be deleted')
    }
    

   
    revalidatePath('/dashboard/editpost');
    revalidatePath('/' );
  
}

export async function handleEditPost(id:string , title: string , body : string  ) {
    
  try {
    await prisma.post.update({
        where : {
            id : id
        },
        data :{
          title : title,
          content : body,
       
        }
    })
    revalidatePath('/' );
    revalidatePath('/dashboard/editpost' );
   prisma.$disconnect()
    
  } catch (error) {
    throw new Error('the post cant be updated')
  }
  

}

export async function addComment( commentData : FormData){
    const comment = commentData.get("comment") as string
    const postId = commentData.get("postId") as string
    const userId =  commentData.get("userId") as string
    console.log(userId)
   try {
  
    await prisma.comment.create({
        data : {
            comment : comment,
            postId : postId,
            userId :  userId
        }
    })
    revalidatePath('/');
   
    prisma.$disconnect()
    
   } catch (error) {
    console.log(error)
   } 
}

export async function deleteComment(id : string){
    await prisma.comment.delete({
        where : {
            id : id
        }
    })
    revalidatePath('/dashboard/editcomments');
    revalidatePath('/[id]');
    revalidatePath('/');
    
 
}
 export async function AddViewPost(id : string){
    try {
        await prisma.post.update({
            where : {
                id : id
            },
            data : {
                view : {increment : 1} 
            }
           
        })
        revalidatePath('/')
    } catch (error) {
        throw new Error("the view can not be increased " + error);
        
    }
 }

 export async function handlePostLike(userId : string , postId :string){
    try {
        await prisma.like.create({
          data : {
            userId : userId ,
            postId : postId
            }
        })
        revalidatePath('/')
    } catch (error) {
        throw new Error("post can not be liked try again" + error);
        
    }
 }

 export async function handlePostDislike(id : string){
    try {
        await prisma.like.deleteMany({
          where : {
            postId : id
            }
        })
        revalidatePath('/')
        
    } catch (error) {
        throw new Error("post can not be disliked try again" + error);
        
    }
 }

 export async function createNewUser ( data : SignUpInputs) {
   
  const isEmailRepetitive = await prisma.user.findUnique({
    where : {
      email : data.email
    }
  })
  if(isEmailRepetitive){
    return {
      error : "با این ایمیل قبلا حساب کاربری  ایجاد شده است اگر پسورد خود را فراموش کرده اید به بازیابی پسورد مراجعه کنید"
    }
  }

    
  const isUserNameRepetitive = await prisma.user.findUnique({
    where : {
      username : data.username
    }
  })

  if(isUserNameRepetitive) {
  return {
    error : " این نام کابری(یوزر) قبلا استفاده شده"
  }
  }


    try {
   const hashPass = await hash(data.password,6)
   const newUser =   await prisma.user.create({
  
        data : {
            name : data.name ,
            email : data.email,
            username : data.username,
            password : hashPass
        }
      })
    const {password , username, ...rest} = newUser 
    return {
      rest,
      message : "حساب کاربری با موفقیت ایجاد شد",
      status : "successfull"
    }
    } catch (error) {
        
      return {
        error : "ایجاد حساب کاربری موفقیت آمیز نبود دوباره تلاش کنید"
      }
        
    }
 }

export async function resetPasswordEmail( data : FormData) {

    const email = data.get("email")
    if( !email || typeof email !== "string" ){
        return {
            error : 'فرمت اشتباه ایمیل'
        }
    }
    const user =  await prisma.user.findUnique({
        where : {
            email : email
        }
    })
    if(!user) {
        return {
             error : 'کاربری با این ایمیل پیدا نشد لطفا ایمیل را بازبینی کنید'
        }
    }
    const token = await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
      })

      

// const resend = new Resend("re_im3N9sNy_28GRJyUnxv1Liu9TYP5hL7DH");

// const result = await resend.emails.send({
//   from: 'info@teknext.ir',
//   to: user.email,
//   subject: 'Hello World',
//   html : ` <h1 dir="rtl" >سلام ${user.name}</h1> ،
//        <p dir='rtl'>
//             اخیرا کسی تقاضای ریست رمز کاربری شما را برای ما فرستاده است.
//             اگر شما نبوده اید این ایمیل را نادیده بگیرید و اگر شما این در خواست را فرستاده اید از طریق اینک زیر پس.رد خو را ریست کنید
             
//         </p> </br>
//      <a dir="rtl" href=https://teknext.ir/passwordReset/${token.token}> https://teknext.ir/passwordReset/${token.token}</a> 
      
//      </br>
      
//      واحد امنیت سایت تک نکست`
// });
//  if(result) {
//     redirect("/resetemailsent")
//  }else {
//     return {
//         error : "email has not be sent"
//     }
//  }


      const transporter =  nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
       
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
        
      });
  
      
       transporter.sendMail({
        from: 'security@teknext.ir',
        to: user.email,
        subject: 'ریست پسورد teknext',
        html: `<div style='display: flex ; flex-direction: column; justify-content: center;'>
        <h1 dir="rtl" style=" margin: auto; font-size: large; font-family:
         'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; color: blue;">سلام ${user.name}</h1> ،
           <p dir='rtl' style="font-size: medium; text-align: center;">
                اخیرا کسی تقاضای ریست رمز کاربری شما را برای ما فرستاده است.
                اگر شما نبوده اید این ایمیل را نادیده بگیرید و اگر شما این در خواست را فرستاده اید از طریق اینک زیر پس.رد خو را ریست کنید
               
           <br><br><br>
       لینک ریست : <a dir="rtl" href=https://teknext.ir/passwordReset/${token.token}> https://teknext.ir/passwordReset/${token.token}</a> 
        
        <br>
        <br><br><br>
        
        واحد امنیت سایت تک نکست
    </p>`
    
      })
        .then(() => {console.log('OK, Email has been sent.')
    })
        .catch(console.error);

        redirect("/resetemailsent")
}


export async function restPassFinalStep( data : RestPassInputs) {

   
   
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
        where : {
            token : data.token ,
            createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
            resetAt : null
        }
    })

    if (!passwordResetToken) {
        
        return {
          error:
            'این لینک منقضی شده و یا اشتباه است لطفا دوباره درخواست ارسال لینک ریست پسورد را انجام کنید',
        }
      }
   const encrypted = await hash(data.password, 6)

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  })

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  })

  try {
    await prisma.$transaction([updateUser, updateToken])
  } catch (err) {
    console.error(err)
    return {
      error: `خطایی رخ داده است لطفا دوباره امتحان کنید ،درصورت رفع نشدن خطا با پشتیبانی سایت تماس بگیرید`
    }
  }

  redirect("/resetSuccessful")

}