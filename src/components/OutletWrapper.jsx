import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "./index";
import { useDispatch } from "react-redux";
import { logOut, login } from "../reduxstore/authSlice";
import authServcie from "../appwrite/auth";
import toast, { Toaster } from "react-hot-toast";
import { FullScreenSpinner } from "./Spinner";

const OutletWrapper = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function GetCurrentUser() {
      try {
        const getuser = await authServcie.getUser();
        if (getuser) {
          dispatch(login({...getuser}));
          navigate("/");
        } else {
          await authServcie.logout();
          dispatch(logOut());
          navigate("/login");
        }
      } catch (error) {
        toast.error("somthing went wrong")
        console.log(error);
      }
    }
    GetCurrentUser();
    setLoading(false);
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] flex flex-col dark:bg-gray-600 w-full">
      <Toaster />
      <Header />
      {loading ? <FullScreenSpinner />  : <Outlet />}
      <Footer />
    </div>
  );
};

export default OutletWrapper;
