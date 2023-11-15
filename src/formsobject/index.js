import { z } from "zod";

export const loginObject=z.object({
    email:z.string().email({message:"Not a valid email"}),
    password:z.string().min(8,{message:"Password must be minimum 8 Digit"})
  })

  export const SingupObject = z.object({
    name:z.string().min(4,{message:"Name Must minimum 4 characters"}),
    email:z.string().email({message:"Not a valid email"}),
    password:z.string().min(8,{message:"password must be minimum 8 Digit"})
  })

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  export const AddBlogObject = z.object({
    title:z.string().min(4,{message:"Minimum 4 digit"}),
    content:z.string().min(4,{message:"minimum 4 digit"}),
    images:z.instanceof(FileList, { message: 'image is required' }).refine((file)=>file.length >=1,{message:"image is required"}).refine((filetype)=>ACCEPTED_IMAGE_TYPES.includes(filetype[0]?.type),{message:"Not a valid image"}),
  })