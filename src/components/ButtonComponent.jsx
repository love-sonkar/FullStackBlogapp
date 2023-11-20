import React from "react";
import {Spinner} from './index'

const ButtonComponent = ({
  children,
  onClick = () => {},
  type,
  disabled,
  ...props
}) => {
  const cursorDisableCss = disabled ? "cursor-not-allowed" : "";
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${cursorDisableCss} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer grid place-content-center`}
    >
      {disabled ? <Spinner /> : children}
    </button>
  );
};

export default ButtonComponent;
