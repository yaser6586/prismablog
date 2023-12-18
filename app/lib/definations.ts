type PostType = {
    id  : string
    createdAt: Date
    updatedAt :Date
    title   :  string 
    content : string | null
    imageUrl? : string | null
    category? : string | null
    like? :   number | null
    view ? :   number | null
    published: Boolean 
    authorId : string
  }
  
  type ProfileType = {
    id   :  string
    bio  : string | null
    userId : string
  }
  
  type UserType = {
    id    :  string
    email  : string 
    name : string | null
    profile? : ProfileType
  }
  type CommentType = {
    id  :   string
    comment :string
   
    postId : string   
  }