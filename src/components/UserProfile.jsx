import React from "react";
import { FormSectionWrapper } from "./index.js";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const userData = useSelector((state) => state.userData);

  const profileData = [
    {title:"Name",content:userData?.name},
    {title:"Email",content:userData?.email},

  ]

  return (
    <FormSectionWrapper className="flex-col md:flex-row gap-4">
      <img
        className="w-44 h-44 object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="avatar"
      />
  <div className="">
    {profileData.map((itme)=>(
      <div key={itme.title}>
        <h2 className="text-black dark:text-white">{itme.title}</h2>
        <h2 className="text-black dark:text-white">{itme.content}</h2>
      </div>
    ))}
  </div>
    </FormSectionWrapper>
  );
};

export default UserProfile;
