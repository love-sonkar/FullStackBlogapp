import React from 'react'
import InputBox from '../InputBox'
import ErrorText from './ErrorText'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SingupObject } from '../../formsobject'
import { Link,useNavigate } from 'react-router-dom'
import FromSectionWrapper from './FromSectionWrapper'
import authServcie from '../../appwrite/auth'
import {HeadingTag} from '../index'
import { useDispatch } from 'react-redux'
import { login } from '../../reduxstore/authSlice'
import ButtonComponent from '../ButtonComponent'
import toast from 'react-hot-toast'
import GuestLogin from '../GuestLogin'

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
    const {handleSubmit,register,reset,formState:{errors,isSubmitting}} = useForm({resolver:zodResolver(SingupObject)})
    const singupFormFun=async(data)=>{
        try {
          const added= await authServcie.createAccount({...data});
         if (added) {
           const userData = await authServcie.getUser()
           if(userData){
            dispatch(login(userData))
            toast.success("Successfully Account Created")
            navigate("/")
           }
          }
        } catch (error) {
          toast.error(error.response.message)
          console.log(error)
        }
        reset()
    }
  return (
    <FromSectionWrapper>
    <form noValidate onSubmit={handleSubmit(singupFormFun)} className="flex flex-col gap-4 w-96 border rounded-md p-4  dark:bg-gray-900 border-gray-200 dark:border-gray-600">
      <HeadingTag>Signup Page</HeadingTag>
    <div >
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
         Name
        </label>
        <InputBox id="name" register={register("name")} type="email" placeholder="Type your name" />
        {errors?.name && <ErrorText >{errors?.name?.message }</ErrorText>}
      </div>
      <div >
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <InputBox id="email" register={register("email")} type="email" placeholder="Type your email" />
        {errors?.email && <ErrorText >{errors?.email?.message }</ErrorText>}
      </div>
      <div >
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <InputBox id="password" register={register("password")}  type="password" placeholder="Type your password" />
        {errors?.password && <ErrorText >{errors?.password?.message }</ErrorText>}

      </div>

      <ButtonComponent type="submit" disabled={isSubmitting}>Singup</ButtonComponent>
      <GuestLogin title='Singup'/>
      <p className='text-center text-black dark:text-white'>Have a account <Link to="/login" className='decoration-solid text-blue-400'>Login</Link></p>
    </form>
  </FromSectionWrapper>
  )
}

export default SignupForm