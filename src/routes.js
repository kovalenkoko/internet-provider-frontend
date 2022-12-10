import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";

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
        element: <div>The route is coming soon</div>,
    },
    {
        path: '/tariff-plans',
        element: <div>The route is coming soon</div>,
    },
    {
        path: '/personal-account',
        element: <div>The route is coming soon</div>,
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