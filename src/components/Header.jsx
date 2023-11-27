import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {ButtonComponent,LinkComponent,LogOutButton,ThemeToggler } from "./index"

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector((state) => state.status);
  const userData = useSelector(state=>state.userData)
  const [open, setOpen] = useState(false);
  const HeaderLink = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/addblog",
      name: "Add Blog",
    },
    {
      path:`/user`,
      name: "Profile",
    }
  ];
  const pathname = location.pathname;
  const CheckOpen = open ? "block" : "hidden";
  const checkPath = pathname === "/login" || pathname === "/signup";

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              LoveBlog
            </span>
          </Link>
          <div className="flex md:order-2">
            {status ? (
              <LogOutButton />
            ) : (
              <ButtonComponent onClick={() => navigate("/login")}>
                Login
              </ButtonComponent>
            )}
            {checkPath ?    <li className="list-none flex items-center justify-center ml-2"><ThemeToggler/></li>:
            <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setOpen((prev) => !prev)}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
                >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                  />
              </svg>
            </button>
                }
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${CheckOpen}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col gap-3 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {checkPath
                ? null
                : HeaderLink.map((item) => {
                    const Active = item.path === pathname;
                    return (
                      <li key={item.name} onClick={()=>setOpen(false)}>
                        <LinkComponent className={Active} link={item.path}>
                          {item.name}
                        </LinkComponent>
                      </li>
                    );
                  })}
              {checkPath ? null :
                <ThemeToggler />
              }
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
