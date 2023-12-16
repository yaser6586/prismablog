type PostType = {
    id  : string
    createdAt: Date
    updatedAt :Date
    title   :  String 
    content : String | null
    published: Boolean 
    authorId : string
  }
  
  type ProfileType = {
    id   :  string
    bio  : String | null
    userId : string
  }
  
  type UserType = {
    id    :  string
    email  : String 
    name : String | null
    profile? : ProfileType
  }
  type CommentType = {
    id  :   string
    comment :String
   
    postId : string   
  }