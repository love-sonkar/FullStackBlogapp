import React from "react";
import { ButtonComponent } from "./index";
import { Link, useNavigate } from "react-router-dom";
import fileUpload from "../appwrite/uploadfile";
import { useSelector } from "react-redux";

const PostItem = ({ data }) => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link link="/" >
        <img
          className="rounded-t-lg aspect-video object-cover"
          src={fileUpload.FilePreview(data.images)}
          alt=""
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.content}
        </p>
        <div className="flex gap-3">

        {userData && userData?.$id === data?.userid ? (
          <ButtonComponent onClick={()=>navigate(`/editblog/${data.$id}`)}>Edit</ButtonComponent>
          ) : null}
          <ButtonComponent onClick={()=>navigate(`/singleblog/${data.$id}`)}>Read more</ButtonComponent>
          </div>
      </div>
    </div>
  );
};

export default PostItem;
