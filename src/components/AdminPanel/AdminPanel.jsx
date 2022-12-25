import React from "react";
import styles from "./AdminPanel.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate} from "react-router";


const AdminPanel = () => {
    const navigate = useNavigate()

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    return (
        <div className={styles.admin_panel_body}>
            <Header/>
            <div className={styles.admin_panel_data}>
                {isAdmin ?
                    (<div>
                        <button >User List</button>
                        <button>Update Promotions</button>
                        <button>Update Tariff Data</button>
                    </div>) : (<div>You have no rights</div>)
                }
            </div>
            <Footer/>
        </div>
    )
}
export default AdminPanel