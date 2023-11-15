import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { OutletWrapper, Login } from "./components/index.js";
import { Provider } from "react-redux";
import Store from "./reduxstore/Store.js";
import SignupForm from "./components/formcomponent/SignupForm.jsx";
import AuthLayout from "./components/formcomponent/AuthLayout.jsx";
import App from "./App.jsx";
import AddBlog from "./components/AddBlog.jsx";
import ReadSingleBlog from "./components/ReadSingleBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <OutletWrapper />,
    children: [
      { path: "/", element: <AuthLayout authentication={true}><App/></AuthLayout> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupForm />
          </AuthLayout>
        ),
      },
      {
        path:"/addblog",
        element:(
          <AuthLayout authentication={true}>
            <AddBlog/>
          </AuthLayout>
        )
      },{
        path:"/singleblog/:id",
        element:(
          <AuthLayout authentication={true}>
            <ReadSingleBlog/>
          </AuthLayout>
        )
      },
      {
        path:"/editblog/:id",
        element:(
          <AuthLayout authentication={true}>
            <EditBlog/>
          </AuthLayout>
        )
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);
