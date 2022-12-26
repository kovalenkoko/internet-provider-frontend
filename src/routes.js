import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Promotions from "./components/Promotions/Promotions";
import Tariff from "./components/Tariff/Tariff";
import Account from "./components/Account/Account";
import Deposit from "./components/Deposit/Deposit";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserList from "./components/UserList/UserList";

export const ROUTES = [
    {
        path: '/',
        element: <div>Start page</div>,
    },
    {
        path: '/auth',
        element: <Auth/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/promotions',
        element: <Promotions/>,
    },
    {
        path: '/tariff-plans',
        element: <Tariff/>,
    },
    {
        path: '/personal-account',
        element: <Account/>,
    },
    {
        path: '/admin-panel',
        element: <AdminPanel/>,
    },
    {
        path: '/user-list',
        element: <UserList/>,
    },
    {
        path: '/edit-promotions',
        element: <div>The route is coming soon</div>,
    },
    {
        path: '/edit-tariff-plans',
        element: <div>The route is coming soon</div>,
    },
    {
        path: '/deposit',
        element: <Deposit/>,
    },
    {
        path: '*',
        element: <div>No such route</div>,
    },
];