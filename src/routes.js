import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import Promotions from "./components/Promotions/Promotions";
import Tariff from "./components/Tariff/Tariff";
import Account from "./components/Account/Account";
import Deposit from "./components/Deposit/Deposit";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserList from "./components/UserList/UserList";
import EditProms from "./components/EditProms/EditProms";
import AddProm from "./components/AddProm/AddProm";
import EditTariffs from "./components/EditTariffs/EditTariffs";
import AddTariff from "./components/AddTariff/AddTariff";
import Start from "./Start";
import EditProm from "./components/EditProm/EditProm";
import EditTariff from "./components/EditTariff/EditTariff";

export const ROUTES = [
    {
        path: '/',
        element: <Start/>,
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
        element: <EditProms/>,
    },
    {
        path: '/add-promotion',
        element: <AddProm/>,
    },
    {
        path: '/edit-tariff-plans',
        element: <EditTariffs/>,
    },
    {
        path: '/add-tariff',
        element: <AddTariff/>,
    },
    {
        path: '/deposit',
        element: <Deposit/>,
    },
    {
        path: `/edit-promotion/:id`,
        element: <EditProm/>,
    },
    {
        path: `/edit-tariff/:id`,
        element: <EditTariff/>,
    },
    {
        path: '*',
        element: <div>No such route</div>,
    },
];