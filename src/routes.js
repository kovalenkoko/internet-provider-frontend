import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Promotions from "./components/Promotions/Promotions";
import Tariff from "./components/Tariff/Tariff";
import Account from "./components/Account/Account";

export const ROUTES = [
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
        element: <div>The route is coming soon</div>,
    },
    {
        path: '/user-list',
        element: <div>The route is coming soon</div>,
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
        element: <div>The route is coming soon</div>,
    },
    {
        path: '*',
        element: <div>No such route</div>,
    },
];