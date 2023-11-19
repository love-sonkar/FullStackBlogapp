import { lazy } from 'react';
import Header from './Header';
import Footer from './Footer';
import OutletWrapper from './OutletWrapper';
import HeadingTag from './HeadingTag';
import ButtonComponent from './ButtonComponent';
import LinkComponent from './LinkComponent';

const App = lazy(()=>import('../App'));
const SignupForm  = lazy(()=>import( "./formcomponent/SignupForm"));
const Login  = lazy(()=>import( "./formcomponent/Login"));
const PostItem = lazy(()=>import( './PostItem'));

export {Header,Login,OutletWrapper,Footer,HeadingTag,ButtonComponent,LinkComponent,App,SignupForm,PostItem} 