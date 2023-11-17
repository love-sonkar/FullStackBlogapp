import React, { useState } from "react";
import FromSectionWrapper from "./formcomponent/FromSectionWrapper";
import { useForm } from "react-hook-form";
import HeadingTag from "./HeadingTag";
import InputBox, { TextArea } from "./InputBox";
import ErrorText from "./formcomponent/ErrorText";
import ButtonComponent from "./ButtonComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogObject, UpdateBlog } from "../formsobject";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import DataBase from "../appwrite/dbconfig";
import { useNavigate } from "react-router-dom";
import fileUpload from "../appwrite/uploadfile";
import { ImageFilePreviewSrc } from "./formcomponent/FetchingData";

const AddBlog = ({ data }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      content: data?.content || "",
    },
    resolver: zodResolver(data ? UpdateBlog : AddBlogObject),
  });

  const handleAddBlog = async (blogdata) => {
    if (data) {
      const { title, content } = blogdata;
      if (title !== data?.title || content !== data?.content) {
        try {
          const updateBlog = await DataBase.updatePost({
            title,
            content,
            id: data?.$id,
          });
          if (updateBlog) {
            toast.success("blog Updated");
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
      toast.success("No Changes");
      navigate("/");
    } else {
      const imagefile =
        blogdata?.images && (await fileUpload.UploadFile(blogdata?.images[0]));

      try {
        const postData = await DataBase.CreatePost({
          ...blogdata,
          images: imagefile.$id,
          status: "active",
          userid: userData.$id,
          author: userData.name,
        });
        if (postData) {
          toast.success("Blog Added");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
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
        <HeadingTag>{data ? "Edit" : "Add"} Blog</HeadingTag>
        {data?.images ? (
          <>
            <h2>Image Preview</h2>
            <div className="aspect-video overflow-hidden">
              <img
                className="aspect-video object-contain"
                src={ImageFilePreviewSrc(data?.images)}
                alt=""
              />
            </div>
          </>
        ) : null}
        <div>
          <InputBox
            title="Title"
            register={register("title")}
            type="text"
            placeholder="Type your Title"
          />
          {errors?.title && <ErrorText>{errors?.title?.message}</ErrorText>}
        </div>
        {data?.images ? null : (
          <div>
            <InputBox
              title="Image"
              type="file"
              register={register("images")}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100 file:cursor-pointer"
            />
            {errors?.images && <ErrorText>{errors?.images?.message}</ErrorText>}
          </div>
        )}
        <div>
          <TextArea
            title="Blog Content"
            register={register("content")}
            placeholder="Type Your Content..."
          />
          {errors?.content && <ErrorText>{errors?.content?.message}</ErrorText>}
        </div>
        <ButtonComponent type="submit" disabled={isSubmitting}>
          {isSubmitting ? "loading" : data ? "Update Blog" : "Add Blog"}
        </ButtonComponent>
      </form>
    </FromSectionWrapper>
  );
};

export default AddBlog;
