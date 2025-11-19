import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";
import SelectNumbers from "./pages/SelectNumbers/SelectNumbers";
import Admin from "./pages/Admin/admin";  
import CreateUser from "./pages/admin/CreateUser";
import ViewPlayers from "./pages/admin/ViewPlayers";  
import ViewBoards from "./pages/admin/ViewBoards";

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
                            path: "/",
                            element: <Home/>
                        },
                        {
                            path: "/login",
                            element: <Login/>
                        },
                        {
                            path: "/selectnumbers",  // <-- Ret til lowercase
                            element: <SelectNumbers/>
                        },
                        {
                            path: "/admin",  // <-- Ret til lowercase
                            element: <Admin/>,  // <-- Ret til Admin med stort A
                            children: [  // <-- Tilføj children routes
                                {
                                    path: "create-user",
                                    element: <CreateUser/>
                                },
                                {
                                    path: "players",
                                    element: <ViewPlayers/>
                                },
                                {
                                    path: "boards",
                                    element: <ViewBoards/>
                                }
                                // Tilføj flere admin routes senere
                            ]
                        }
                    ]
                }
            ])}
            />
            <Toaster position="top-center" reverseOrder={false}/>
        </>
    )
}