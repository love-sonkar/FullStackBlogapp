import { z } from "zod";

export const loginObject=z.object({
    email:z.string().email({message:"Not a valid email"}),
    password:z.string().min(8,{message:"Password must be minimum 8 Digit"})
  })

  export const SingupObject = z.object({
    name:z.string().min(3,{message:"Name Must"}),
    email:z.string().email({message:"Not a valid email"}),
    password:z.string().min(8,{message:"password must be minimum 8 Digit"})
  })

  export const AddBlogObject = z.object({
    title:z.string().min(4,{message:"Minimum 4 digit"}),
    content:z.string().min(4,{message:"minimum 4 digit"}),
  })