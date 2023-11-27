import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataBase from "../appwrite/dbconfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImageFilePreviewSrc, deleteFunction } from "./formcomponent/FetchingData";
import {  MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import {FullScreenSpinner,AuthorComponent,ButtonComponent} from "./index"


const ReadSingleBlog = () => {
  const [singlePost, setSinglePost] = useState(null);
  const param = useParams();
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    const FetchSingleBlog = async () => {
      try {
        const post = await DataBase.GetSinglePost(param.id);
        if (post) {
          setSinglePost(post);
        }
      } catch (error) {
        toast.error(error.response.message);
        console.log(error);
      }
    };
    FetchSingleBlog();
  }, []);


  return (
    <div className="p-4 flex items-center justify-center h-full">
      {singlePost === null ? (
        <FullScreenSpinner/> 
      ) : (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center">
          <AuthorComponent name={singlePost?.author}/>
          {userData?.$id ===singlePost?.userid? <MdDelete
                onClick={() => { deleteFunction(singlePost.images,singlePost.$id),navigate("/")}}
                className="text-2xl text-red-600 cursor-pointer mr-2"
                /> :null}
                </div>
          <Link link="/">
            <img
              className="rounded-t-lg mx-auto"
              src={ImageFilePreviewSrc(singlePost?.images)}
              alt={singlePost?.images}
            />
          </Link>
          <div className="p-5 border-t-2 dark:border-gray-500 mt-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {singlePost?.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {singlePost?.content}
            </p>
            <div className="flex gap-3">
              {userData && userData?.$id === singlePost?.userid ? (
                <ButtonComponent
                  onClick={() => navigate(`/editblog/${param.id}`)}
                >
                  Edit
                </ButtonComponent>
              ) : null}
              <ButtonComponent onClick={() => navigate("/")}>
                Back
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadSingleBlog;
