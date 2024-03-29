import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddBlog ,FullScreenSpinner} from "./index";
import { FetchSinglePost } from "./formcomponent/FetchingData";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogdata, setBlogData] = useState(null);
  useEffect(() => {
    FetchSinglePost(id)
      .then((data) => setBlogData(data))
      .catch((e) => console.log(e));
  }, [navigate, id]);
  return (
    <>{blogdata == null ? <FullScreenSpinner/> : <AddBlog data={blogdata} />}</>
  );
};

export default EditBlog;
