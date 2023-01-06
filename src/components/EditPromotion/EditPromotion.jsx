import React, {useState, useContext, useEffect} from "react"
import styles from "./EditPromotion.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import {useNavigate, useParams} from "react-router"
import {UserContext} from "../../user-context"

const EditProm = () => {
    const [name, setName] = useState("")
    const [discountPercent, setDiscountPercent] = useState("")
    const [duration, setDuration] = useState("")
    const [promotion, setPromotion] = useState([])

    const navigate = useNavigate()

    const {data, toggleData} = useContext(UserContext)

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2
    const params = useParams()
    const promId = params.id

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/promotion/getbyid/${promId}`, requestOptions)
            const dataFetch = await response.json()
            setPromotion(dataFetch)
        }
        data && fetchData().catch(console.error)
    }, [data])

    const onSavePromHandler = () => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({id:promId, name, discountPercent, duration})
        }
        fetch('http://localhost:8080/promotion/update', requestOptions)
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
                    <div className={styles.edit_promotion_label}>Edit Promotion</div>
                    <div className={styles.promotion_form}>
                        <div className={styles.promotion_field_div}>
                            <label>Name:</label>
                            <input className={styles.promotion_field_input} type={"text"} placeholder={promotion?.name} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div className={styles.promotion_field_div}>
                            <label>Discount (%):</label>
                            <input className={styles.promotion_field_input} type={"number"} min={0} placeholder={promotion?.discount_percent} onChange={e => setDiscountPercent(e.target.value)}  value={discountPercent}/>
                        </div>
                        <div className={styles.promotion_field_div}>
                            <label>Duration:</label>
                            <input className={styles.promotion_field_input} type={"text"} placeholder={promotion?.duration} onChange={e => setDuration(e.target.value)}  value={duration}/>
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

export default EditProm
