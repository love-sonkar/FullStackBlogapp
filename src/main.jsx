import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { OutletWrapper, Login,App,SignupForm } from "./components/index.js";
import { Provider } from "react-redux";
import Store from "./reduxstore/Store.js";
import AuthLayout from "./components/formcomponent/AuthLayout.jsx";
import AddBlog from "./components/AddBlog.jsx";
import ReadSingleBlog from "./components/ReadSingleBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import OptionComponent from "./components/OptionComponent.jsx";
import {FullScreenSpinner} from "./components/Spinner.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <OutletWrapper />,
    errorElement: <ErrorPage />,
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
      },
      {
        path:"/options/:id/:imageid",
        element:(
          <AuthLayout authentication={true}>
            <OptionComponent/>
          </AuthLayout>
        )
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Suspense fallback={<FullScreenSpinner />}>
      <RouterProvider router={route} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
