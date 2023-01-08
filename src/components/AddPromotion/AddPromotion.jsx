import React, {useState, useContext} from "react"
import styles from "./AddPromotion.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import {useNavigate, useParams} from "react-router"
import {UserContext} from "../../user-context"

const AddPromotion = () => {
    const [name, setName] = useState("")
    const [discountPercent, setDiscountPercent] = useState("")
    const [duration, setDuration] = useState("")

    const navigate = useNavigate()

    const {data, toggleData} = useContext(UserContext)

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    const onSavePromHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({ name, discountPercent, duration})
        }
        
        fetch('http://localhost:8080/promotion/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/promotions")
            })
    }

    return (
        <div className={styles.promotion_body}>
            <Header/>
            <div className={styles.content}>
                {isAdmin ? (<>
                    <div className={styles.add_promotion_label}>Add a new Promotion</div>
                    <div className={styles.promotion_form}>
                        <div className={styles.promotion_field_div}>
                            <label>Name:</label>
                            <input className={styles.promotion_field_input} type={"text"} placeholder={"New Promotion"} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div className={styles.promotion_field_div}>
                            <label>Discount (%):</label>
                            <input className={styles.promotion_field_input} type={"number"} min={0} placeholder={15} onChange={e => setDiscountPercent(e.target.value)}  value={discountPercent}/>
                        </div>
                        <div className={styles.promotion_field_div}>
                            <label>Duration:</label>
                            <input className={styles.promotion_field_input} type={"text"} placeholder={"08.12.2022 - 12.01.2023"} onChange={e => setDuration(e.target.value)}  value={duration}/>
                        </div>
                        <button className={styles.promotion_form_btn} onClick={onSavePromHandler}>Save</button>
                    </div>
                </>) :
                    (<div className={styles.no_rights_div}>You have no rights</div>)}
            </div>
            <Footer/>
        </div>
    )
}

export default AddPromotion
