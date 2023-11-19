import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useDispatch } from "react-redux";
import authServcie from "../appwrite/auth";
import { logOut } from "../reduxstore/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const logOutFunction = async () => {
    setLoading(true)
    try {
      await authServcie.logout();
      dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false)

  };

  return <ButtonComponent disabled={loading} onClick={logOutFunction}>{loading ? <Spinner/>: "Logout"}</ButtonComponent>;
};

export default LogOutButton;
