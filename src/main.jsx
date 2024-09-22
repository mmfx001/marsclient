import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Shop from "./components/Shop";
import History from "./components/History";
import Upladeimg from "./components/Upload";
import News from "./components/News";
import BlogsPages from "./components/BlogsPages";
import Post from "./components/Posts";
import Learning from "./components/Learn";
import Task from "./components/Task";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/main",
    element: <App/>,
  },
  {
    path: '/shop',
    element: <Shop/>
  },
  {
    path: '/shop/history',
    element: <History/>
  },
  {
    path: "/uplade",
    element: <Upladeimg/>,
  },

  {
    path: "/news",
    element: <News/>,
  },

  {
    path: "/blogs",
    element: <BlogsPages/>,
  },
  {
    path: "/create",
    element: <Post/>,
  },
  {
    path: "/task",
    element: <Task/>,
  },
  {
    path: "/details",
    element: <Learning/>,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);