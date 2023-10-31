import { createBrowserRouter } from "react-router-dom";
import IndexView from "./views";
import SignupView from "./views/signup"
import SigninView from "./views/signin"


export const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexView />,
    },
    {
      path: "/signin",
      element: <SigninView />,
    },
    {
      path: "/signup",
      element: <SignupView />,
    }
  ])