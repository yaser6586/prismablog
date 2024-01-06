export type PostType = {
    id  : string
    createdAt: Date
    updatedAt :Date
    title   :  string 
    content : string | null
    imageUrl? : string | null
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
    bio  : string | null
    userId : string
  }
  
  export type UserType = {
    id    :  string
    email  : string 
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
  export type Category = 'tech' |'goodnews' |'movie'|'gadgets'|'game' | null
  
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

  export type SecureUser = Omit<UserType , "username" | "password" | "likes" | "posts" |  "comment">