import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";
import Boards from "./pages/boards/boards.tsx";
import SelectNumbers from "./pages/SelectNumbers/SelectNumbers";

export default function App() {
    return (
        <>
            <header><title>Gambling Site</title></header>

            <RouterProvider router={createBrowserRouter([
                {
                    path: "/",
                    element: <Outlet></Outlet>,
                    children:[
                        {
                            path: "/login",
                            element: <Login/>  // Forside = Login
                        },
                        {
                            path: "/",
                            element: <Home/>  // Forside = Home
                        },
                        {
                            path: "/boards", //path: "/user/:userID//boards",
                            element: <Boards/>
                        },
                        {
                            path: "/Select",
                            element: <SelectNumbers/>  // Forside = Home
                        }
                        // Flere routes kommer her senere (dashboard, games, osv.)
                    ]
                }
            ])}
            />
            <Toaster position="top-center" reverseOrder={false}/>
        </>
    )
}
