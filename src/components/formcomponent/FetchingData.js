import toast from "react-hot-toast";
import DataBase from "../../appwrite/dbconfig";
import fileUpload from "../../appwrite/uploadfile";

export const FetchSinglePost = async (id) => {
  try {
    const getData = await DataBase.GetSinglePost(id);

    if (getData) {
      return getData;
    } else {
      toast.error("somthing went Wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

export const ImageFilePreviewSrc = (id) => fileUpload.FilePreview(id);

export const deleteFunction = async (imageid, id) => {
  try {
    const DeleteImg = await fileUpload.DeleteFile(imageid);
    if (DeleteImg) {
      const deleteBlog = await DataBase.deletePost(id);
      if (deleteBlog) {
        toast.success("successfully Deleted");
      }
    } else {
      toast.error("Somthing went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
