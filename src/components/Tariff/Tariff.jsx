import React, {useEffect, useState, useContext}from "react";
import styles from "./Tariff.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";



const Tariff = () => {
    const [tariffs, setTariffs] = useState([])
    const {data, toggleData} = useContext(UserContext)

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
    return (
        <div className={styles.tariff_body}>
            <Header/>
            <div className={styles.content}>
                {tariffs.map((item) => (
                    <div>{JSON.stringify(item)}</div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}
export default Tariff