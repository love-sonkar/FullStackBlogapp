import React from "react";
import { useDispatch } from "react-redux";
import authServcie from "../../appwrite/auth";
import { login } from "../../reduxstore/authSlice";
import { useForm } from "react-hook-form";
import { loginObject } from "../../formsobject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  HeadingTag,
  GuestLogin,
  ButtonComponent,
  FormSectionWrapper,
  ErrorText,
  InputBox,
} from "../index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginObject) });

  const formSubmitBtn = async (data) => {
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
    reset();
  };

  return (
    <FormSectionWrapper>
      <form
        noValidate
        onSubmit={handleSubmit(formSubmitBtn)}
        className="flex flex-col gap-4 w-96 border rounded-md p-4  dark:bg-gray-900 border-gray-200 dark:border-gray-600"
      >
        <HeadingTag>Login Page</HeadingTag>
        <div>
          <label
            htmlFor="emaillogin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <InputBox
            id="emaillogin"
            register={register("email")}
            type="email"
            placeholder="Type your email"
          />
          {errors?.email && <ErrorText>{errors?.email?.message}</ErrorText>}
        </div>
        <div>
          <label
            htmlFor="passwordlogin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <InputBox
            register={register("password")}
            id="passwordlogin"
            type="password"
            placeholder="Type your password"
          />
          {errors?.password && (
            <ErrorText>{errors?.password?.message}</ErrorText>
          )}
        </div>
        <ButtonComponent type="submit" disabled={isSubmitting}>
          Login
        </ButtonComponent>
        <GuestLogin title="Login" />
        <p className="text-center py-3 text-black dark:text-white">
          Have a account{" "}
          <Link to="/signup" className="text-blue-400">
            Signup
          </Link>
        </p>
      </form>
    </FormSectionWrapper>
  );
};

export default Login;
