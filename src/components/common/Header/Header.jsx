import React, {useContext} from 'react'
import styles from "./Header.module.css"
import personalAccImg from "../../../static/personal_acc.svg"
import {useNavigate} from "react-router";
import {UserContext} from "../../../user-context";

const Header = () => {
    const navigate = useNavigate()
    const isPromotions = window.location.pathname.split('/')[1] === 'promotions';
    const isTariff = window.location.pathname.split('/')[1] === 'tariff-plans';
    const {data, toggleData} = useContext(UserContext)

    const promotionsHandler = () => {
        navigate("/promotions")
    }
    const tariffHandler = () => {
        navigate("/tariff-plans")
    }
    const accountHandler = () => {
        navigate("/personal-account")
    }
    return (
        <div className={styles.header}>
            <label className={styles.logo_title}>MarlborSoft</label>
            <div className={styles.navbar}>
                <div className={styles.label_wrapper}>
                    {isPromotions ? <label onClick={promotionsHandler} className={styles.promotions_label_active}>Promotions</label> :
                        <label onClick={promotionsHandler} className={styles.promotions_label}>Promotions</label>}
                    {isTariff ? <label onClick={tariffHandler} className={styles.tariff_label_active}>Tariff plans</label> :
                        <label onClick={tariffHandler} className={styles.tariff_label}>Tariff plans</label>}
                </div>
            </div>
            <div className={styles.user_info}>
                <div className={styles.user_info_wrapper}>
                    <img onClick={accountHandler} src={personalAccImg} alt={"User img"} className={styles.user_image}/>
                    <label className={styles.username}>{data?.user.username}</label>
                </div>
            </div>
        </div>
    )
}
export default Header