import React from "react";
import styles from "./Deposit.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";


const Deposit = () => {
    return (
        <div className={styles.deposit_body}>
            <Header/>
            <div className={styles.deposit_data}>
                <div className={styles.deposit_label}>Deposit</div>
                <div className={styles.deposit_form_wrapper}>
                    <div className={styles.card_form}>
                        <div className={styles.card_form_data}>
                            <div>Card number</div>
                            <input placeholder={"1234 5678 1234 5678"}/>
                            <div className={styles.validity_wrapper}>
                                <label>Validity period</label>
                                <input className={styles.month_input} type={"number"} placeholder={"11"}/>
                                <label>/</label>
                                <input className={styles.year_input} type={"number"} placeholder={"22"}/>
                                <input className={styles.cvv_input} type={"number"} placeholder={"231"}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.money_form}>
                        <div>Amount for deposit</div>
                        <input placeholder={1000}/>
                        <button>Deposit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Deposit