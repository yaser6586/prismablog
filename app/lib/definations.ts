export type PostType = {
    id  : string
    createdAt: Date
    updatedAt :Date
    title   :  string 
    intro? : string | null
    content : string | null
    conclusion? : string | null
    imageUrl? : string | null
    imageUrl2? : string | null
    videoUrl? : string  | null
    category? :  Category
    view ? :   number | null
    published: Boolean 
    authorId : string
    liked? : LikeType[]
  }
  export type LikeType = {
    id    : string   
   userId : string
   postId : string
   }
  
  export type ProfileType = {
    id   :  string
 
  
    name? : string
    bio  : string | null
    user : UserType 
    userId : string
    
  }
  
  export type UserType = {
    id    :  string
    email  : string 
    imgUrl : string
    name : string | null
    likes : LikeType[]
    comment : CommentType[]
    posts : PostType[]
    role : "USER" | "ADMIN"
    username? : string
    password? : string
    profile? : ProfileType
  }
  export type CommentType = {
    id  :   string
    comment :string
    userId : string
    postId : string   
  }
  export type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  export type SignUpInputs = {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  export type Category = 'tech' |'goodnews' |'movie'|'gadgets'|'game' |'car' |null
  
  export type SignInInputs = {
   
    username: string;
    password: string;
   
  };

  export type RestPassInputs = {
    password : string
    confirm : string
    token 
    : string
  }

  export type SecureUser = Omit<UserType , "username" | "password" | "likes" | "posts" |  "comment" | "imgUrl">
  export type ProfileUser = Omit<UserType , "username" | "password" | "likes" | "posts" |  "comment" >

  export type SessionUser = {
    imgUrl: string;
    userId: string;
    role: string | null | undefined;
    profileId: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}


 export type UserOfProfile = {profileId : string
  userId : string
  ImgUrl : string
name : string}