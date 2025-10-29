import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../components/App.jsx";
import Login from "../components/auth/Login.jsx";
import PostIndex from "../components/posts/PostIndex.jsx";
import AuthRouter from "./AuthRouter.jsx";
import IsNotLoginPass from "./isNotLoginPass.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <IsNotLoginPass />,
        children: [
          {
            path: '/',
            element: <Login />
          }
        ],
      },
      {
        // 로그인 필요 기능
        element: <AuthRouter />,
        children: [
          {
            path: '/posts',
            element: <PostIndex />
          },
        ],
      }
    ],
  }
]);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;