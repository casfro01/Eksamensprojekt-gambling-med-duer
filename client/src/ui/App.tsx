import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/Login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";

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
