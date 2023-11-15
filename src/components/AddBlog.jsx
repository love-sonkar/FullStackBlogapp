import React ,{useState} from "react";
import FromSectionWrapper from "./formcomponent/FromSectionWrapper";
import { useForm } from "react-hook-form";
import HeadingTag from "./HeadingTag";
import InputBox from "./InputBox";
import ErrorText from "./formcomponent/ErrorText";
import ButtonComponent from "./ButtonComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogObject } from "../formsobject";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DataBase from "../appwrite/dbconfig";
import { useNavigate } from "react-router-dom";
import fileUpload from "../appwrite/uploadfile";

const AddBlog = ({data}) => {
  const [fileinput,setfileInput] = useState()
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  console.log(data)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({defaultValues:{
    title:data?.title ?? "",
    content:data?.content??"",
  },resolver:zodResolver(AddBlogObject)});
  const handleAddBlog = async (data) => {
    // if(data?.images)
    if(!fileinput){
      return toast.error("Please add image")
    }
    const imagefile = fileinput && await fileUpload.UploadFile(fileinput)
    const formData = {
      ...data,
      images:imagefile.$id,
      status: "active",
      userid: userData.$id,
    };
    try {
      const postData = await DataBase.CreatePost({...formData});
      if (postData) {
        toast.success("Blog Added");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <FromSectionWrapper>
      <form
        noValidate
        onSubmit={handleSubmit(handleAddBlog)}
        className="flex flex-col gap-4 w-96 border rounded-md p-4  dark:bg-gray-900 border-gray-200 dark:border-gray-600"
      >
        <HeadingTag>Add Blog</HeadingTag>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <InputBox
            id="title"
            register={register("title")}
            type="text"
            placeholder="Type your Title"
          />
          {errors?.title && <ErrorText>{errors?.title?.message}</ErrorText>}
        </div>
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Blog Content
          </label>
          <InputBox
            id="content"
            register={register("content")}
            type="text"
            placeholder="Type your email"
          />
          {errors?.content && <ErrorText>{errors?.content?.message}</ErrorText>}
        </div>
        <div>
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          image
          </label>
        <input type="file" id="images"  onChange={(e)=>setfileInput(e.target.files[0])} />
          {errors?.images && <ErrorText>{errors?.images?.message}</ErrorText>}
        </div>

        <ButtonComponent type="submit" disabled={isSubmitting}>
          {isSubmitting ? "loading" : "Add Blog"}
        </ButtonComponent>
      </form>
    </FromSectionWrapper>
  );
};

export default AddBlog;
