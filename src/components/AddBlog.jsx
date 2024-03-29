import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddBlogObject, UpdateBlog } from "../formsobject";
import { useSelector } from "react-redux";
import DataBase from "../appwrite/dbconfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fileUpload from "../appwrite/uploadfile";
import { ImageFilePreviewSrc } from "./formcomponent/FetchingData";
import {
  FormSectionWrapper,
  ButtonComponent,
  ErrorText,
  InputBox,
  TextArea,
  HeadingTag,
} from "./index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DummyImg from '/src/public/img/dummy.jpg'

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
      } else {
        toast.success("No Changes");
        navigate("/");
      }
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
    <FormSectionWrapper>
      <form
        noValidate
        onSubmit={handleSubmit(handleAddBlog)}
        className="flex flex-col gap-4 w-96 border rounded-md p-4  dark:bg-gray-900 border-gray-200 dark:border-gray-600"
      >
        <HeadingTag>{data ? "Edit" : "Add"} Blog</HeadingTag>
        {data?.images ? (
          <>
            <h2 className="dark:text-white">Image Preview</h2>
            <div className="aspect-video overflow-hidden image-href">
              <LazyLoadImage
                className="object-contain mx-auto"
                src={ImageFilePreviewSrc(data?.images)}
                placeholderSrc={DummyImg}
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
          {data ? "Update Blog" : "Add Blog"}
        </ButtonComponent>
      </form>
    </FormSectionWrapper>
  );
};

export default AddBlog;
