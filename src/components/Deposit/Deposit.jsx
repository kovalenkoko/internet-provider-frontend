import React, {useContext, useState} from "react"
import styles from "./Deposit.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import visaImg from "../../static/visa.svg"
import maestroImg from "../../static/maestro.svg"
import mastercardImg from "../../static/mastercard.svg"
import {UserContext} from "../../user-context"
import {useNavigate} from "react-router"

const Deposit = () => {
    const [deposit, setDeposit] = useState("")
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()

    const onDepositHandler = () => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }
        fetch(`http://localhost:8080/user/putbalance?userId=${data?.user.id}&amount=${deposit}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/personal-account")
            })
        setDeposit("")
    }
    
    return (
        <div className={styles.deposit_body}>
            <Header/>
            <div className={styles.deposit_data}>
                <div className={styles.deposit_label}>Deposit</div>
                <div className={styles.deposit_form_wrap}>
                    <div className={styles.card_form}>
                        <div className={styles.card_back}>
                            <div className={styles.card_black_line}></div>
                            <div className={styles.card_cvv_form_wrap}>
                                <div className={styles.card_cvv_form}>
                                    <label className={styles.card_cvv_label}>CVV/CVC</label>
                                    <br/>
                                    <input className={styles.card_cvv_input} type={"number"} min={0} max={999} placeholder={214}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card_front}>
                            <div className={styles.card_front_wrap}>
                                <label className={styles.card_number_label}>Card number</label>
                                <br/>
                                <input className={styles.card_number_input} type={"number"} min={0} max={9999999999999999} placeholder={"1234 5678 1234 5678"}/>
                                <div className={styles.card_data_wrap}>
                                    <label className={styles.card_data_label}>Validity period</label>
                                    <div className={styles.card_month_year_wrap}>
                                        <input className={styles.card_month_year_input} type={"number"} min={0} max={99} placeholder={11}/>
                                        <br/>
                                        <label className={styles.card_month_label}>Month</label>
                                    </div>
                                    <label className={styles.card_slash_label}>/</label>
                                    <div className={styles.card_month_year_wrap}>
                                        <input className={styles.card_month_year_input} type={"number"} min={0} max={99} placeholder={22}/>
                                        <br/>
                                        <label className={styles.card_year_label}>Year</label>
                                    </div>
                                </div>
                                <div className={styles.card_images}>
                                    <img src={visaImg} alt={"Visa Img"} className={styles.visa_img}/>
                                    <img src={maestroImg} alt={"Maestro Img"} className={styles.maestro_img}/>
                                    <img src={mastercardImg} alt={"MasterCard Img"} className={styles.mastercard_img}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.money_form}>
                        <div className={styles.amount_label}>Amount for deposit ($)</div>
                        <input className={styles.deposit_amount_input} type={"number"} min={1} placeholder={1000} onChange={e => setDeposit(e.target.value)}/>
                        <div className={styles.deposit_btn} onClick={onDepositHandler}>Deposit</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Deposit
