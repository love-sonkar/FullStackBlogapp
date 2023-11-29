import React from "react";
import { FormSectionWrapper, ButtonComponent } from "./index.js";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userData = useSelector((state) => state.userData);

  return (
    <FormSectionWrapper className="flex-col">
   <img
      className="w-44 h-44 object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="avatar"
    />
 
      {userData?.name}
      
    </FormSectionWrapper>
  );
};

export default UserProfile;
