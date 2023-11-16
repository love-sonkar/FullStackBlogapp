import React from "react";
import { ButtonComponent } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageFilePreviewSrc } from "./formcomponent/FetchingData";
import AuthorComponent from "./AuthorComponent";

const PostItem = ({ data }) => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData);
  const Concatinate =(paragraph,digit)=>{
    return paragraph.length >= digit ? paragraph.slice(0,digit) + "..." : paragraph;
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <AuthorComponent name={data?.author} />
      <Link link="/" >
        <img
          className="rounded-t-lg aspect-video object-contain"
          src={ImageFilePreviewSrc(data.images)}
          alt=""
        />
      </Link>
      <div className="p-5 border-t-2 dark:border-gray-500 mt-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {Concatinate(data.content,100)}
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
