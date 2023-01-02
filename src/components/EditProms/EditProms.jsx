import React, {useContext, useEffect, useState} from "react";
import styles from "./EditProms.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";
import {useNavigate} from "react-router";


const EditProms = () => {
    const [promotions, setPromotions] = useState([])
    const {data, toggleData} = useContext(UserContext)
    const navigate = useNavigate()

    const addPromHandler = () => {
        navigate("/add-promotion")
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/promotion/get/all',requestOptions);
            const data = await response.json();
            setPromotions(data);
        }
        data && fetchData().catch(console.error);
    }, [data])
    const onDeletePromHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        fetch(`http://localhost:8080/promotion/delete/${buttonsId}`, requestOptions)
            .then(response => {window.location.reload()})

    }
    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                <button onClick={addPromHandler}>Add new promotion</button>
                <div className={styles.head}>
                    <label>Name</label>
                    <label>Discount</label>
                    <label>Duration</label>
                </div>
                {promotions.map((item) => (
                    <div className={styles.tariffs_info}>
                        <label>{item.name}</label>
                        <label>{item.discount}</label>
                        <label>{item.duration}</label>
                        <div>
                            <button>Edit</button>
                            <button id={item.id} onClick={onDeletePromHandler}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}
export default EditProms