import React from "react";
import { Link } from "react-router-dom";

const LinkComponent = ({ children, link,className }) => {
    const ActiveClass= className ? "text-blue-700 dark:text-blue-700" : "text-gray-900 dark:text-white";
  return (
    <Link
      to={link ?? "/"}
      className={`py-2 px-1 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:text-blue-500 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 ${ActiveClass}`}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
