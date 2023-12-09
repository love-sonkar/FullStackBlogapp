import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';

const AuthorComponent = ({name="dummy",imgSrc,imgId}) => {
  const location = useLocation()
  const [isHover,setIsHover] = useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };  
  return (
    <div className="py-3 px-2 flex gap-2 items-center">
    <img
      className="w-10 object-cover h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="avatar"
    />
    <div className='flex flex-col relative select-none'>
    <h2 onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="capitalize text-xl leading-none dark:text-white cursor-pointer">{name}</h2>
    {location.pathname === "/" &&
    isHover &&
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='absolute right-0 top-0 z-20 left-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 px-3 py-2 w-max cursor-pointer'>
       <h2 className='text-base dark:text-white'>{name}</h2>
       <h2 className='dark:text-white text-sm mb-2'>@{name}</h2>
       <Link to={`/singleblog/${imgId}`}>
       <LazyLoadImage className='w-36 object-cover' src={imgSrc} placeholderSrc='blur' />
       </Link>
    </div>
    }
    <p className='text-xs dark:text-white'>@{name}</p>
    </div>
  </div>
  )
}

export default AuthorComponent
