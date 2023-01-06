import styles from "./App.css"
import Start from "./Start"
import Auth from "./components/Auth/Auth"
import Register from "./components/Auth/Register"
import Account from "./components/Account/Account"
import UserList from "./components/UserList/UserList"
import Deposit from "./components/Deposit/Deposit"
import Promotions from "./components/Promotions/Promotions"
import AddPromotion from "./components/AddPromotion/AddPromotion"
import EditPromotion from "./components/EditPromotion/EditPromotion"
import TariffPlans from "./components/TariffPlans/TariffPlans"
import AddTariffPlan from "./components/AddTariffPlan/AddTariffPlan"
import EditTariffPlan from "./components/EditTariffPlan/EditTariffPlan"

export const ROUTES = [
    {
        path: '',
        element: <Start/>,
    },
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
        path: '/personal-account',
        element: <Account/>,
    },
    {
        path: '/user-list',
        element: <UserList/>,
    },
    {
        path: '/deposit',
        element: <Deposit/>,
    },
    {
        path: '/promotions',
        element: <Promotions/>,
    },
    {
        path: '/add-promotion',
        element: <AddPromotion/>,
    },
    {
        path: `/edit-promotion/:id`,
        element: <EditPromotion/>,
    },
    {
        path: '/tariff-plans',
        element: <TariffPlans/>,
    },
    {
        path: '/add-tariff',
        element: <AddTariffPlan/>,
    },
    {
        path: `/edit-tariff/:id`,
        element: <EditTariffPlan/>,
    },
    {
        path: '*',
        element: <div className={styles.no_route_div}>No such route</div>,
    },
];
