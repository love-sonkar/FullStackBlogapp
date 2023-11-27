import React from 'react'
import {FormSectionWrapper,ButtonComponent} from './index.js'
import { useSelector } from 'react-redux'



const UserProfile = () => {

    const userData = useSelector(state=>state.userData)
 
  return (
    <FormSectionWrapper>
        {userData?.name}
        <ButtonComponent>Click</ButtonComponent>
    </FormSectionWrapper>
  )
}

export default UserProfile