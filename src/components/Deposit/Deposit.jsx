import React, {useContext, useState} from "react";
import styles from "./Deposit.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";
import {useNavigate} from "react-router";


const Deposit = () => {
    const [deposit, setDeposit] = useState("")
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()

    const onDepositHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        fetch(`http://localhost:8080/user/putbalance?userId=${data?.user.id}&amount=${deposit}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/personal-account")
            });
        setDeposit("")
    }
    return (
        <div className={styles.deposit_body}>
            <Header/>
            <div className={styles.deposit_data}>
                <div className={styles.deposit_label}>Deposit</div>
                <div className={styles.deposit_form_wrapper}>
                    <div className={styles.money_form}>
                        <div>Amount for deposit</div>
                        <input placeholder={1000} onChange={e => setDeposit(e.target.value)}/>
                        <button onClick={onDepositHandler}>Deposit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Deposit