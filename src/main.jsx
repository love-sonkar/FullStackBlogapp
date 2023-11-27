import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./reduxstore/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  OutletWrapper,
  Login,
  App,
  SignupForm,
  OptionComponent,
  ErrorPage,
  EditBlog,
  ReadSingleBlog,
  AddBlog,
  AuthLayout,
  FullScreenSpinner,
  UserProfile,
} from "./components/index.js";
import "./index.css";

const route = createBrowserRouter([
  {
    path: "/",
    element: <OutletWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <App />
          </AuthLayout>
        ),
      },
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
        path: "/addblog",
        element: (
          <AuthLayout authentication={true}>
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/singleblog/:id",
        element: (
          <AuthLayout authentication={true}>
            <ReadSingleBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/editblog/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/options/:id/:imageid",
        element: (
          <AuthLayout authentication={true}>
            <OptionComponent />
          </AuthLayout>
        ),
      },
      {
        path:'/user',
        element:(
          <AuthLayout authentication={true}>
            <UserProfile />
          </AuthLayout>
        )
      }
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
