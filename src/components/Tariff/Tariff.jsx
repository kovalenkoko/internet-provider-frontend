import React, {useEffect, useState, useContext}from "react";
import styles from "./Tariff.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";
import {useNavigate} from "react-router";



const Tariff = () => {
    const [tariffs, setTariffs] = useState([])
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/tariffplan/get/all',requestOptions);
            const data = await response.json();
            setTariffs(data);
        }
        data && fetchData().catch(console.error);
    }, [])

    const onChooseHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        fetch(`http://localhost:8080/tariffplan/activate/${data?.user.id}/${buttonsId}`, requestOptions)
            .then(response => {
                navigate("/personal-account")
            })

    }

    return (
        <div className={styles.tariff_body}>
            <Header/>
            <div className={styles.content}>
                <div className={styles.head}>
                    <label>Name</label>
                    <label>Price</label>
                    <label>Bandwidth</label>
                    <label>Bonus</label>
                </div>
                {tariffs.map((item) => (
                    <div className={styles.tariffs_info}>
                        <label>{item.id}</label>
                        <label>{item.name}</label>
                        <label>{item.price}</label>
                        <label>{item.bandwidth}</label>
                        <label>{item.bandwidth_bonus}</label>
                        <button id={item.id} onClick={onChooseHandler}>сhoose</button>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}
export default Tariff