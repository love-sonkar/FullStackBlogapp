import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import toast from "react-hot-toast";
import DataBase from "../appwrite/dbconfig";
import fileUpload from "../appwrite/uploadfile";

const ReadSingleBlog = () => {
  const [singlePost, setSinglePost] = useState(null);
  const param = useParams();
  useEffect(() => {
    const FetchSingleBlog = async ()=>{
        try {
            DataBase.GetSinglePost(param.id).then((singleitem)=>setSinglePost(singleitem)).catch(e=>toast.error(e.response.message))
        } catch (error) {
            toast.error(error.response.message)
            console.log(error)
        }
    }
    FetchSingleBlog()
  }, []);

  return (
    <>
      {singlePost === null ? (
        <h2>Loading..</h2>
      ) : (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link link="/">
            <img
              className="rounded-t-lg"
              src={fileUpload.FilePreview(singlePost.images)}
              alt=""
            />
          </Link>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {singlePost?.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {singlePost?.content}
            </p>
            <div className="flex gap-3">
              {/* {userData && userData?.$id === data?.userid ? (
          <ButtonComponent>Edit</ButtonComponent>
        ) : null} */}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadSingleBlog;
