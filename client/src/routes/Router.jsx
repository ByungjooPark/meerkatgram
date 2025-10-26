import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../components/App.jsx";
import Login from "../components/auth/Login.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      }
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;