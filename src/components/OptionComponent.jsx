import React, { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import DataBase from "../appwrite/dbconfig";
import toast from "react-hot-toast";
import fileUpload from "../appwrite/uploadfile";

const OptionComponent = () => {
  const navigate = useNavigate();
  const { id, imageid } = useParams();
  const [isClick, setIsClick] = useState(false);

  const deleteFunction = async () => {
    setIsClick(true);
    try {
      const DeleteImg = await fileUpload.DeleteFile(imageid);
      if (DeleteImg) {
        const deleteBlog = await DataBase.deletePost(id);
        if (deleteBlog) {
          toast.success("successfully Deleted");
          navigate("/");
        }
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }

    setIsClick(false);
  };

  return (
    <>
      <div className="h-auto bottom-0 fixed w-full z-20 left-0 top-0 flex items-center justify-center dark:bg-gray-600  bg-gray-100">
        <div
          onClick={() => navigate("/")}
          className="h-screen w-full absolute z-30 "
        ></div>
        <div className="relative p-4 w-full max-w-md max-h-full z-40 bg-white rounded">
          <div className="flex items-center justify-between mb-4 p-2 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
              Select Option
            </h3>
            <div className="p-2 dark:text-white hover:dark:bg-gray-700 cursor-pointer hover:bg-gray-400 hover:text-white rounded-full">
              <MdClose
                onClick={() => navigate("/")}
                className="text-2xl text-black hover:text-white"
              />
            </div>
          </div>
          <div className="relative bg-white rounded-lg shadow">
            <ul className="flex flex-col gap-3">
              <LabelContent
                label="Delete"
                icon={<MdDelete />}
                isClick={isClick}
                onClick={deleteFunction}
              />
              <LabelContent
                label="Edit"
                icon={<FaEdit />}
                onClick={() => navigate(`/editblog/${id}`)}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionComponent;

export const LabelContent = ({ onClick = () => {}, label, icon, isClick }) => {
  return (
    <button
      disabled={isClick}
      onClick={onClick}
      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-500"
    >
      <div className="block">
        <div className="w-full text-lg font-semibold flex gap-2 items-center ">
          <div className="text-2xl dark:text-white">{icon}</div>
          {label}
        </div>
      </div>
    </button>
  );
};
