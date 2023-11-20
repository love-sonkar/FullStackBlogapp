import { lazy } from "react";
import Header from "./Header";
import Footer from "./Footer";
import OutletWrapper from "./OutletWrapper";
import HeadingTag from "./HeadingTag";
import ButtonComponent from "./ButtonComponent";
import LinkComponent from "./LinkComponent";
import AuthorComponent from "./AuthorComponent";
import Spinner, { FullScreenSpinner } from "./Spinner";
import AuthLayout from "./formcomponent/AuthLayout";
import LogOutButton from "./LogOutButton";
import ThemeToggler from "./ThemeToggler";
import GuestLogin from "./GuestLogin";
import FormSectionWrapper from "./formcomponent/FormSectionWrapper";
import ErrorText from "./formcomponent/ErrorText";
import InputBox from "./InputBox";
import { TextArea } from "./InputBox";

const App = lazy(() => import("../App"));
const SignupForm = lazy(() => import("./formcomponent/SignupForm"));
const Login = lazy(() => import("./formcomponent/Login"));
const PostItem = lazy(() => import("./PostItem"));
const ReadSingleBlog = lazy(() => import("./ReadSingleBlog"));
const AddBlog = lazy(() => import("./AddBlog"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const OptionComponent = lazy(() => import("./OptionComponent"));
const EditBlog = lazy(() => "./EditBlog");

export {
  OutletWrapper,
  Header,
  Footer,
  HeadingTag,
  ButtonComponent,
  LinkComponent,
  AuthorComponent,
  Spinner,
  FullScreenSpinner,
  AuthLayout,
  LogOutButton,
  ThemeToggler,
  GuestLogin,
  FormSectionWrapper,
  ErrorText,
  InputBox,
  TextArea, 
  EditBlog,
  App,
  SignupForm,
  PostItem,
  ReadSingleBlog,
  AddBlog,
  ErrorPage,
  Login,
  OptionComponent,
};
