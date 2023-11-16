import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import toast from "react-hot-toast";
import DataBase from "../appwrite/dbconfig";
import { ImageFilePreviewSrc } from "./formcomponent/FetchingData";
import { useSelector } from "react-redux";
import AuthorComponent from "./AuthorComponent";

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
        <h2>Loading...</h2>
      ) : (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <AuthorComponent name={singlePost?.author}/>
          <Link link="/">
            <img
              className="rounded-t-lg"
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
