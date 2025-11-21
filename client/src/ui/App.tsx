import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";
import SelectNumbers from "./pages/SelectNumbers/SelectNumbers";
import UserProfile from "./pages/UserProfile/UserProfile";
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
                            path: "/login",
                            element: <Login/>  // Forside = Login
                        },
                        {
                            path: "/",
                            element: <Home/>  // Forside = Home
                        },
                        {
                            path: "/Select",
                            element: <SelectNumbers/>  // Forside = Home
                        },
                        {
                            path: "/profile",
                            element: <UserProfile/>
                        },
                        {
                            path: "/admin",  
                            element: <Admin/>, 
                            children: [  
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
                        // Flere routes kommer her senere (dashboard, games, osv.)
                    ]
                }
            ])}
            />
            <Toaster position="top-center" reverseOrder={false}/>
        </>
    )
}
