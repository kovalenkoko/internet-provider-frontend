import React, {useContext, useEffect, useState} from "react"
import styles from "./Promotions.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import editImg from "../../static/edit.svg"
import deleteImg from "../../static/delete.svg"
import {UserContext} from "../../user-context"
import { useNavigate } from "react-router"

const Promotions = () => {
    const [promotions, setPromotions] = useState([])
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    const addPromHandler = () => {
        navigate("/add-promotion")
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/promotion/get/all', requestOptions)
            const data = await response.json()
            setPromotions(data)
        }
        data && fetchData().catch(console.error)
    }, [data])

    const onDeletePromHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }
        fetch(`http://localhost:8080/promotion/delete/${buttonsId}`, requestOptions)
            .then(response => {window.location.reload()})

    }
    const onEditPromHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        navigate(`/edit-promotion/${buttonsId}`)
    }

    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                <div className={styles.head}>
                    <label className={styles.head_name_label}>Name</label>
                    <label className={styles.head_discount_label}>Discount (%)</label>
                    <label className={styles.head_duration_label}>Duration</label>
                    {isAdmin ? <div className={styles.add_promotion_btn} onClick={addPromHandler}>New Promotion</div> : <></>}
                </div>
                {promotions.map(item => (
                    <div className={styles.promotions_info} key={item.id}>
                        <div className={styles.promotions_info_wrap} key={item.id}>
                            <label className={styles.promotion_name_label}>{item.name}</label>
                            <label className={styles.promotion_discount_label}>{item.discount_percent}</label>
                            <label className={styles.promotion_duration_label}>{item.duration}</label>
                            {isAdmin ?
                                <div className={styles.promotion_btns}>
                                    <div className={styles.promotion_btn}>
                                        <img className={styles.promotion_img} id={item.id} onClick={onEditPromHandler} src={editImg} alt={"Edit"}/>
                                    </div>
                                    <div className={styles.promotion_btn}>
                                        <img className={styles.promotion_img} id={item.id} onClick={onDeletePromHandler} src={deleteImg} alt={"Delete"}/>
                                    </div>
                                </div>
                            : <></>}
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default Promotions
