import React,{useState} from "react";
import authServcie from "../appwrite/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reduxstore/authSlice";
import {ButtonComponent} from './index'

const GuestLogin = ({ title = "Login" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const data = {
      email:"guestuser@gmail.com",
      password:"guestuser",
    }
    try {
      const UserLogin = await authServcie.login({ ...data });
      if (UserLogin) {
        const getUserData = await authServcie.getUser();
        if (getUserData) {
          dispatch(login(getUserData));
          toast.success("User Login");
          navigate("/");
        }
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
