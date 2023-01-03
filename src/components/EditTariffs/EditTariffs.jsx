import React, {useContext, useEffect, useState} from "react";
import styles from "./EditTariffs.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";
import {useNavigate} from "react-router";


const EditTariffs = () => {
    const [tariffs, setTariffs] = useState([])
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()
    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    const addTariffHandler = () => {
        navigate("/add-tariff")
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/tariffplan/get/all',requestOptions);
            const data = await response.json();
            setTariffs(data);
        }
        data && fetchData().catch(console.error);
    }, [data])
    const onDeleteTariffHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        fetch(`http://localhost:8080/tariffplan/delete/${buttonsId}`, requestOptions)
            .then(response => {window.location.reload()})

    }
    const onEditTariffHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        navigate(`/edit-tariff/${buttonsId}`)
    }
    return (
        <div className={styles.tariffs_body}>
            <Header/>
            <div className={styles.content}>
                {isAdmin ? (<>
                    <button onClick={addTariffHandler}>Add new tariff</button>
                    <div className={styles.head}>
                        <label>Name</label>
                        <label>Price</label>
                        <label>Bandwidth</label>
                        <label>Bonus</label>
                    </div>
                    {tariffs.map((item) => (
                        <div className={styles.tariffs_info}>
                            <label>{item.name}</label>
                            <label>{item.price}</label>
                            <label>{item.bandwidth}</label>
                            <label>{item.bandwidth_bonus}</label>
                            <div>
                                <button id={item.id} onClick={onEditTariffHandler}>Edit</button>
                                <button id={item.id} onClick={onDeleteTariffHandler}>Delete</button>
                            </div>
                        </div>
                    ))}
                </>) : (<div>You have no rights</div>)}
            </div>
            <Footer/>
        </div>
    )
}
export default EditTariffs