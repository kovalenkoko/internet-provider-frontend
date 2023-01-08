import React, {useEffect, useState, useContext} from "react"
import styles from "./TariffPlans.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import selectImg from "../../static/select.svg"
import unselectImg from "../../static/unselect.svg"
import editImg from "../../static/edit.svg"
import deleteImg from "../../static/delete.svg"
import {UserContext} from "../../user-context"
import {useNavigate} from "react-router"

const TariffPlans = () => {
    const [userInfo, setUserInfo] = useState([])
    const [tariffs, setTariffs] = useState([])
    
    const {data, toggleData} = useContext(UserContext)

    const navigate = useNavigate()

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
    }

    const addTariffHandler = () => {
        navigate("/add-tariff")
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/tariff-plan/get/all', requestOptions)
            const data = await response.json()
            setTariffs(data)
        }

        data && fetchData().catch(console.error)
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/user/get-by-id/${data?.user.id}`, requestOptions)
            const dataFetch = await response.json()
            setUserInfo(dataFetch)
        }

        data && fetchData().catch(console.error)
    }, [data])

    const onSelectHandler = (event) => {
        const buttonsId =  event.currentTarget.id

        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        fetch(`http://localhost:8080/tariff-plan/activate/${data?.user.id}/${buttonsId}`, requestOptions)
            .then(response => {
                navigate("/personal-account")
            })
    }

    const onUnselectHandler = (event) => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        fetch(`http://localhost:8080/tariff-plan/deactivate/${data?.user.id}`, requestOptions)
            .then(response => {
                navigate("/personal-account")
            })

    }

    const onDeleteTariffHandler = (event) => {
        const buttonsId =  event.currentTarget.id

        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        fetch(`http://localhost:8080/tariff-plan/delete/${buttonsId}`, requestOptions)
            .then(response => {window.location.reload()})
    }

    const onEditTariffHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        navigate(`/edit-tariff/${buttonsId}`)
    }

    return (
        <div className={styles.tariff_body}>
            <Header/>
            <div className={styles.content}>
                <div className={isAdmin ? styles.head_admin : styles.head_user}>
                    <label>Name</label>
                    <label>Month price ($)</label>
                    <label>Bandwidth</label>
                    <label>Bonus</label>
                    {isAdmin ? <div className={styles.add_tariff_btn} onClick={addTariffHandler}>New Tariff Plan</div> : <></>}
                </div>
                {tariffs.map((item) => (
                    <div className={styles.tariffs_info} key={item.id}>
                        <div className={styles.tariffs_info_wrap}>
                            <label>{item.name}</label>
                            <label>{item.month_price}</label>
                            <label>{item.bandwidth}</label>
                            <label>{item.bonus}</label>
                            <div className={styles.tariff_btns}>
                                <div className={styles.tariff_btn}>
                                    {userInfo.tariff_plan_id == item.id ?
                                        <img className={styles.tariff_img} id={item.id} onClick={onUnselectHandler} src={unselectImg} alt={"Unselect"}/>
                                    :
                                        <img className={styles.tariff_img} id={item.id} onClick={onSelectHandler} src={selectImg} alt={"Select"}/>
                                    }
                                </div>
                                {isAdmin ?
                                    <div className={styles.tariff_btn}>
                                        <img className={styles.tariff_img} id={item.id} onClick={onEditTariffHandler} src={editImg} alt={"Edit"}/>
                                    </div>
                                : <></>}
                                {isAdmin ?
                                    <div className={styles.tariff_btn}>
                                        <img className={styles.tariff_img} id={item.id} onClick={onDeleteTariffHandler} src={deleteImg} alt={"Delete"}/>
                                    </div>
                                : <></>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default TariffPlans
