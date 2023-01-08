import React, {useState, useContext, useEffect} from "react"
import styles from "./EditTariffPlan.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import {useNavigate, useParams} from "react-router"
import {UserContext} from "../../user-context"

const EditTariffPlan = () => {
    const [name, setName] = useState("")
    const [monthPrice, setMonthPrice] = useState("")
    const [bandwidth, setBandwidth] = useState("")
    const [bonus, setBonus] = useState("")
    const [tariff, setTariff] = useState([])

    const navigate = useNavigate()

    const {data, toggleData} = useContext(UserContext)

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2
    
    const params = useParams()
    const tariffId = params.id

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/tariff-plan/get-by-id/${tariffId}`, requestOptions)
            const dataFetch = await response.json()
            setTariff(dataFetch)
        }

        data && fetchData().catch(console.error)
    }, [data])

    const onSaveTariffHandler = () => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({ id:tariffId, name, monthPrice, bandwidth, bonus })
        }
        
        fetch('http://localhost:8080/tariff-plan/update', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/tariff-plans")
            })
    }

    return (
        <div className={styles.tariff_body}>
            <Header/>
            <div className={styles.content}>
                {isAdmin ? <>
                    <div className={styles.edit_tariff_label}>Edit Tariff Plan</div>
                    <div className={styles.tariff_form}>
                        <div className={styles.tariff_field_div}>
                            <label>Name:</label>
                            <input className={styles.tariff_field_input} type={"text"} placeholder={tariff?.name} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div className={styles.tariff_field_div}>
                            <label>Month price ($):</label>
                            <input className={styles.tariff_field_input} type={"number"} min={0} placeholder={tariff?.month_price} onChange={e => setMonthPrice(e.target.value)}  value={monthPrice}/>
                        </div>
                        <div className={styles.tariff_field_div}>
                            <label>Bandwidth:</label>
                            <input className={styles.tariff_field_input} type={"text"} placeholder={tariff?.bandwidth} onChange={e => setBandwidth(e.target.value)}  value={bandwidth}/>
                        </div>
                        <div className={styles.tariff_field_div}>
                            <label>Bonus:</label>
                            <input className={styles.tariff_field_input} type={"text"} placeholder={tariff?.bonus} onChange={e => setBonus(e.target.value)}  value={bonus}/>
                        </div>
                        <button className={styles.tariff_form_btn} onClick={onSaveTariffHandler}>Save</button>
                    </div>
                </> :
                    <div className={styles.no_rights_div}>You have no rights</div>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default EditTariffPlan
