import React, {useContext, useEffect, useState} from "react";
import styles from "./Promotions.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {UserContext} from "../../user-context";


const Promotions = () => {
    const [promotions, setPromotions] = useState([])
    const {data, toggleData} = useContext(UserContext)


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
    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                {promotions.map((item) => (
                    <div>{JSON.stringify(item)}</div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}
export default Promotions