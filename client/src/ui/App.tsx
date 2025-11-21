import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";
import SelectNumbers from "./pages/SelectNumbers/SelectNumbers";
import UserProfile from "./pages/UserProfile/UserProfile";
import Admin from "./pages/Admin/admin";  
import CreateUser from "./pages/Admin/CreateUser";
import ViewPlayers from "./pages/Admin/ViewPlayers";  
import ViewBoards from "./pages/Admin/ViewBoards"; 
import EnterWinningNumbers from './pages/Admin/EnterWinningNumbers';
import GameHistory from './pages/Admin/GameHistory';
import AddPayment from '../ui/components/AddPayment';

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
                            path: "/add-payment",
                            element: <AddPayment/>
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
                                },
                                {
                                   path: "winning-numbers",
                                   element: <EnterWinningNumbers/> 
                                },
                                {
                                    path: "history",
                                    element: <GameHistory/>
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
