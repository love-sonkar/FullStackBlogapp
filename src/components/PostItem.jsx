import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageFilePreviewSrc } from "./formcomponent/FetchingData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import DummyImg from "/src/public/img/dummy.jpg";
import { ButtonComponent, AuthorComponent } from "./index";

const PostItem = ({ data }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const Concatinate = (paragraph, digit) => {
    return paragraph.length >= digit
      ? paragraph.slice(0, digit) + "..."
      : paragraph;
  };
  const imgSrc = ImageFilePreviewSrc(data.images);

  return (
    <div className="w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      <div className="flex justify-between items-center  border-b-2 dark:border-gray-500 mb-2 px-3">
        <AuthorComponent name={data?.author} imgSrc={imgSrc} imgId={data?.$id}/>
        {userData?.$id === data?.userid ? (
          <div className="p-2 dark:text-white hover:dark:bg-gray-700 cursor-pointer hover:bg-gray-400 hover:text-white rounded-full">
            <BsThreeDotsVertical
              onClick={() => navigate(`/options/${data?.$id}/${data?.images}`)}
            />
          </div>
        ) : null}
      </div>
      <Link to={`/singleblog/${data.$id}`} className="image-href">
        <LazyLoadImage
          className="rounded-t-lg aspect-video object-contain mx-auto"
          src={imgSrc}
          alt="BlogImages"
          placeholderSrc={DummyImg}
        />
      </Link>
      <div className="p-5 border-t-2 dark:border-gray-500 mt-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {Concatinate(data.content, 100)}
        </p>
        <div className="flex gap-3">
          <ButtonComponent onClick={() => navigate(`/singleblog/${data.$id}`)}>
            Read more
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
