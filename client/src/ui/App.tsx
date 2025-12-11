import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Login from "./pages/login/login.tsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home/Home";
import SelectNumbers from "./pages/User/SelectNumbers/SelectNumbers";
import Admin from "./pages/Admin/AdminPanel/admin.tsx";
import CreateUser from "./pages/Admin/CreateUser/CreateUser.tsx";
import ViewPlayers from "./pages/Admin/ViewPlayers/ViewPlayers.tsx";
import ViewBoards from "./pages/Admin/ViewBoards/ViewBoards.tsx";
import EnterWinningNumbers from './pages/Admin/enterWinningNumbers/EnterWinningNumbers';
import GameHistory from './pages/Admin/GameHistory/GameHistory.tsx';
import {UserProfile} from "./pages/User/UserProfile/UserProfile";
import AddPayment from './pages/User/AddPayment/AddPayment';
import ApprovePayments from './pages/Admin/ApprovePayments/ApprovePayments.tsx';
import UserPanel from './pages/User/UserPanel/UserPanel';
import PaymentHistory from "./pages/Admin/PaymentHistory/PaymentHistory.tsx";
import UserBoards from "./pages/User/Boards/UserBoards";
import UserTransactions from './pages/User/Transactions/UserTransaction';
import ProtectedRoute from "./pages/Admin/ProtectedRoute.tsx";
import ShowWinningPeople from "./pages/Admin/WinningPeople/ShowWinningPeople";

export default function App() {
    return (
        <>
            <header><title>Døde Duer</title></header>

            <RouterProvider router={createBrowserRouter([
                {
                    path: "/",
                    element: <Outlet></Outlet>,
                    children:[
                        {
                            path: "/login",
                            element: <Login/>
                        },
                        {
                            path: "/",
                            element: <Home/>
                        },
                        {
                            path: "/Select",
                            element: <SelectNumbers/>
                        },
                        {
                            path: "/user",
                            element: <UserPanel/>,
                            children: [
                                {
                                    path: "profile",
                                    element: <UserProfile/>
                                },
                                {
                                    path: "deposit",
                                    element: <AddPayment/>
                                },
                                {
                                    path: "new-board",
                                    element: <SelectNumbers/>
                                },
                                {
                                    path: "boards",
                                    element: <UserBoards/>
                                },
                                {
                                    path: "transactions",
                                    element: <UserTransactions/>
                                }
                            ]
                        },
                        {
                            path: "/admin",
                            element:(<ProtectedRoute
                                requiredRole="Administrator">
                                    <Admin/>
                            </ProtectedRoute>
                                ),
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
                                    path: "show-winning-people",
                                    element: <ShowWinningPeople/>
                                },
                                {
                                    path: "history",
                                    element: <GameHistory/>
                                },
                                {
                                    path: "payments",
                                    element: <ApprovePayments/>
                                },
                                {
                                    path: "payment-history",
                                    element: <PaymentHistory/>
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
