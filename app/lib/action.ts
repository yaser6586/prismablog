'use server'

import { revalidatePath } from "next/cache";
import {  getAllUser } from "./data";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Category, RestPassInputs, SessionUser, SignUpInputs, UserType } from "./definations";
import {hash} from 'bcrypt'
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer"
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { client } from "../config/awsSdk";
import { error } from "console";



const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = Number(process.env.MAIL_PORT);
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;







const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// const prisma = new PrismaClient()

export async function addPost(prevState : any,formData : FormData){
    
    
    
        const  userId = formData.get("userId") as string
        const title = formData.get("title") as string
        const content = formData.get('body') as string
        const category = formData.get('category') as Category
        const imageUrl1 = formData.get('image1') as File
        const imageUrl2 = formData.get('image2') as File
        const videoUrl =  formData.get("videoUrl") as string
        const intro = formData.get("intro") as string
        const conclusion = formData.get("conclusion") as string
        const buffer1 = Buffer.from(await imageUrl1.arrayBuffer())
        const buffer2 = Buffer.from(await imageUrl2.arrayBuffer())
        const baseUrl = "https://teknext-bucket.storage.iran.liara.space/"


        const params1 = {
          Body: buffer1,
          Bucket: process.env.LIARA_BUCKET_NAME,
          Key: `post/${randomUUID()}-${imageUrl1.name}`,
          ContentType : "img/jpg"
        };

        const params2 = {
          Body: buffer2,
          Bucket: process.env.LIARA_BUCKET_NAME,
          Key: `post/${randomUUID()}-${imageUrl2.name}`,
          ContentType : "img/jpg"
        };


        if(params1&&params2){

          try {
            await client.send(new PutObjectCommand(params1));
            await client.send(new PutObjectCommand(params2));
          } catch (error) {
            return { status : "error" , message : "تصویرها آپلود نشدند"}
          }

        }


     try {
        
    await prisma.post.create({
      data : {
        imageUrl : `${baseUrl}${params1.Key}`,
        imageUrl2 :`${baseUrl}${params2.Key}`,
        videoUrl,
        title,intro,content,conclusion,authorId:userId,category,
      }
    })

  
    return {status : "successful", message : "پست با موفقیت ارسال شد"}


     } catch (error) {
      return {status : "error", message : "پست جدید ایجاد نشد"}

     }
   

   

}

export async function deletePost(id : string){
 let  params1;
 let params2;

  const post = await prisma.post.findUnique({
    where : {
      id : id
    }
  })


  if(post?.imageUrl&&post.imageUrl2) {
    params1 = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `${post.imageUrl.slice(47,)}`
    };
    params2 = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `${post.imageUrl2.slice(47,)}`
    };
  }

 

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
        await client.send(new DeleteObjectCommand(params1!));
        await client.send(new DeleteObjectCommand(params2!));

        
    } catch (error) {
        throw new Error('the post cant be deleted')
    }
    

   
    
    revalidatePath('/' );
  
}

export async function handleEditPost(prevState : any , formData : FormData  ) {
  const  postId = formData.get("postId") as string
  const title = formData.get("title") as string
  const content = formData.get('body') as string
  const category = formData.get('category') as Category
  const imageUrl1 = formData.get('image1') as File
  const imageUrl2 = formData.get('image2') as File
  const videoUrl =  formData.get("videoUrl") as string
  const intro = formData.get("intro") as string
  const conclusion = formData.get("conclusion") as string
  const buffer1 = Buffer.from(await imageUrl1.arrayBuffer())
  const buffer2 = Buffer.from(await imageUrl2.arrayBuffer())
  const baseUrl = "https://teknext-bucket.storage.iran.liara.space/"
  let newParams1;
  let newParams2;

  const post = await prisma.post.findUnique({
    where: {
      id : postId
    }
  })


  if(imageUrl1 && post?.imageUrl){
    
     const params1 = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: `${post.imageUrl.slice(47,)}`
      };
      newParams1 = {
        Body: buffer1,
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: `post/${randomUUID()}-${imageUrl1.name}`,
        ContentType : "img/jpg"
      };
   
    
  try {
    await client.send(new DeleteObjectCommand(params1));
    await client.send(new PutObjectCommand(newParams1));
    
  } catch (error) {
    return { status : "error" , message : "عکس اول حذف نشد"}
  }

  }

  if(imageUrl2 && post?.imageUrl2){
    
   
    const params2 = {
       Bucket: process.env.LIARA_BUCKET_NAME,
       Key: `${post.imageUrl2.slice(47,)}`
     };
     newParams2 = {
      Body: buffer2,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `post/${randomUUID()}-${imageUrl2.name}`,
      ContentType : "img/jpg"
    };
   
 try {
 
   await client.send(new DeleteObjectCommand(params2));
   await client.send(new PutObjectCommand(newParams2));
 } catch (error) {
  return { status : "error" , message : "عکس دوم حذف نشد"}
 }

 }
    
  try {
    await prisma.post.update({
        where : {
            id : postId
        },
        data :{
         imageUrl : `${baseUrl}${newParams1?.Key}`,
         imageUrl2 : `${baseUrl}${newParams2?.Key}`,
         videoUrl:videoUrl,
         title:title,
         intro : intro,
         content : content,
         conclusion:  conclusion,
         category:category
         }
    })
    revalidatePath('/' );
    return { status : "successful" , message : "پست با موفقیت آپدیت شد"}
   

  } catch (error) {
    return {
      status : "error",
      message : "پست متاسفانه آپدیت نشد"
    }
  }
  

}

export async function addComment( commentData : FormData){
    const comment = commentData.get("comment") as string
    const postId = commentData.get("postId") as string
    const userId =  commentData.get("userId") as string
    
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
    error : " این نام کاربری(یوزر) قبلا استفاده شده"
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
      await prisma.profile.create({
       
        data : {
          userId : newUser.id,
          name : newUser.name,
          bio : ""
         
          // profileImagUrl : `https://teknext-bucket.storage.iran.liara.space/avatar/default-avatar.png`
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
        from: 'info@teknext.ir',
        to: user.email,
        subject: 'ریست پسورد teknext',
        html: `    <style>
        .container {
            max-width: 100%;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            direction: rtl;
            text-align: center;
            
            

        }
        .heading {
            font-size: larger;
            margin:20px auto ;
            

        }
        .name{
            color: rgb(52, 52, 245);
        }
        .mailBody{
            margin: auto;
            padding-bottom: 50px;
        }
    </style>
   <div class="container">
        <h1 class="heading">سلام <span class="name">${user.name}</span></h1>
           <p dir='rtl' class="mailBody">
                اخیرا کسی تقاضای ریست رمز کاربری شما را برای ما فرستاده است.
                اگر شما نبوده اید این ایمیل را نادیده بگیرید و اگر شما این در خواست را فرستاده اید از طریق اینک زیر پسورد خو را ریست کنید
               
           <br><br><br>
       لینک ریست : <a  dir="rtl" href=https://teknext.ir/passwordReset/${token.token}> https://teknext.ir/passwordReset/${token.token.slice(0,10)}</a> 
        
        <br>
        <br><br><br>
        
        واحد امنیت سایت تک نکست
    </p>
   </div>
`
    
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


export async function uploadAvatar(prevState : any , formData : FormData){
  const file = Object(formData.get("file")) 
  const userId = formData.get("userId") as string
 
  if(file.size === 0 ){
     return {
      status : "error",message : "لطفا عکس را انتخاب کنید"
     }
  }
 if(file.size > 4e+6) {
  return {
    status : "error",message : "حجم عکس  نباید بیشتر از 4 مگابایت باشد"
   }
 }

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await uploadFileToLiara(buffer , file.name , userId)
  return result
}

export async function uploadFileToLiara(file : Buffer , filename : any , userId : string) {
  const fileBuffer = file;
  const params = {
    Body: fileBuffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `avatar/${randomUUID()}-${filename}`,
    ContentType : "img/jpg"
  };

  // delete previous picture from liara disk space
   const defaultUtl = "https://teknext-bucket.storage.iran.liara.space/avatar/default-avatar.png"
  
   const user = await prisma.user.findUnique({
    where : {
      id : userId
    }
   })

     const prevPicName = user?.imgUrl!.slice(47,)

     if(user?.imgUrl !== defaultUtl &&  prevPicName !== params.Key ) {
      const prevParams = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: prevPicName
      };
      
     
      
      await client.send(new DeleteObjectCommand(prevParams));
      
    
    }


  const command = new PutObjectCommand(params)

  try {
   const result =  await client.send(command);
   await prisma.user.update({
    where : {
      id : userId
    },
    data : {
      imgUrl : `https://teknext-bucket.storage.iran.liara.space/${params.Key}`
    }
   })
    revalidatePath("/")
   return {
    status : "successful",
    message: "عکس با موفقیت آپلود شد"
  }
  
  } catch (error) {
    return {
      status : "error",
      message: "upload failed"
    }
  }

}

export async function changProfile(data : FormData){
  const name = data.get("name") as string
  const email = data.get("email") as string
  const bio = data.get("bio") as string
  const userId = data.get("userId") as string
  
  
 
 const repitetive = await prisma.user.findUnique({
    where:{
      email : email
    },
    include : {
      profile : true
    }
  })
  // if(repitetive && name === repitetive.profile?.name ){
  //     return{ status : "error" , message : "مقدار  نام تغییری نکرده است"}

  // }
  // if(repitetive && 
  //   bio === repitetive?.profile?.bio ){
  //     return{ status : "error" , message : "مقدار بیو  تغییری نکرده است"}

  // }
 
if(repitetive) {
  return{ status : "error" , message : " با این ایمیل قبلا ثبت نام شده لطفا  ایمیل دیگری را وارد کنید یا فیلد را خالی بگذارید"}
}
// try {
 
  
    
// } catch (error) {
//   console.log(error)
//   return{ status : "error" , message : "نام و ایمیل جدید متاسفانه ثبت نشد"}

// }




// try {
//   await prisma.user.update({
//     where : {
//       id : userId
//     },
//     data :{
//       email : email ,
//       name : name
//     }
//   })
// await prisma.profile.update({
//   where:{
//     userId : userId
//   },
//   data : {
//     name : name,
//     bio : bio
//   }
// })
// revalidatePath("/")
//   return {
//     status : "successful" , message : "پروفایل با موفقیت آپدیت شد"
//   }
// } catch (error) {
 
//   return{ status : "error" , message : "پروفایل جدید متاسفانه ثبت نشد"}

// }

 
const user = await prisma.user.findUnique({
  where:{
    id : userId
  },
  include : {
    profile : true
  }
})


if(user && name !== user?.profile?.name && name !=="") {

  try {
    await prisma.profile.update({
      where : {
        userId : userId
      },
      data : {
         name : name
      }
    })
    await prisma.user.update({
      where : {
        id : userId
      },
      data : {
       name : name
      }
      
    })
  } catch (error) {
    return {status : "error", message : "نام جدید ذخیره نشده "}
  }
}

if(user && bio !== user?.profile?.bio) {

  try {
    await prisma.profile.update({
      where : {
        userId : userId
      },
      data : {
         bio : bio
      }
    })
  } catch (error) {
    return {status : "error", message : "بیو جدید ذخیره نشده "}
  }
}

if(user && email !== user?.email && email !== "") {

  try {
    await prisma.user.update({
      where : {
        id : userId
      },
      data : {
         email : email
      }
    })
  } catch (error) {
    return {status : "error", message : "ایمیل جدید ذخیره نشده "}
  }
}
revalidatePath("/")
return {status : "successful", message : " پروفایل با موفقیت آپدید شد"}
}

export async function handleDeleteUploadedPhoto( userId : string){
  
  const defaultUrl = "https://teknext-bucket.storage.iran.liara.space/avatar/default-avatar.png"
  
  const user = await prisma.user.findUnique({
    where : {
      id : userId
    }
  })


 if(user?.imgUrl === defaultUrl) {
    return {
      status : "error" , message : "قبلا آوارتار را پاک کرده اید"
    }
  }
  
  const keyName = user?.imgUrl?.slice(47,)
  
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: keyName
  };
  
 
  try {
    
    await client.send(new DeleteObjectCommand(params));
    await prisma.user.update({
      where : {
        id : userId
      },
      data : {
        imgUrl : defaultUrl
      }

    })
    revalidatePath("/")
    
    return {
      status : "successful" , message : "آواتار شما با موفقیت حذف شد"
    }
   
  } catch (error) {
   return {
      status : "error" , message : "عکس حذف نشد دوباره تلاش کنید"
    }
  }
}



