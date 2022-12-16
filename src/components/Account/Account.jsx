import React from "react";
import styles from "./Account.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import mobileImg from "../../static/mobile.svg"
import {useNavigate} from "react-router";


const Account = () => {
    const navigate = useNavigate()
    const changeTariffHandler = () => {
        navigate("/tariff-plans")
    }
    const depositHandler = () => {
        navigate("/deposit")
    }

    return (
        <div className={styles.account_body}>
            <Header/>
            <div className={styles.acc_data}>
                <div className={styles.acc_data_label}>Account data</div>
                <div className={styles.set_btns_wrapper}>
                    <div onClick={changeTariffHandler} className={styles.change_tariff_btn}>
                        <div className={styles.info_btns}>Change Tariff Plan</div>
                    </div>
                    <div onClick={depositHandler} className={styles.deposit_btn}>
                        <div className={styles.info_btns}>Deposit</div>
                    </div>
                </div>
                <div className={styles.current_plan_wrapper}>
                    <img src={mobileImg} alt={"Mobile img"} className={styles.mobile_img}/>
                    <label className={styles.curr_plan_label}>Current Tariff Plan:</label>
                    <div className={styles.tariff_div}>GigaParliam 500</div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Account