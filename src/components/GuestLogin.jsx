import React,{useState} from "react";
import authServcie from "../appwrite/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reduxstore/authSlice";
import {ButtonComponent} from './index'

const GuestLogin = ({ title = "Login" }) => {
  const navigate = useNavigate();
  const dispath = useDispatch()
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      const user = await authServcie.login({email:"guestuser@gmail.com", password:"guestuser"});
      if (user) {
        toast.success("Login success");
        dispath(login(user))
        navigate("/");
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ButtonComponent type="button" disabled={loading} onClick={handleClick}>
      {title} As Guest
    </ButtonComponent>
  );
};
export default GuestLogin;
