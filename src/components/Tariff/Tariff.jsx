import React from "react";
import styles from "./Tariff.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";


const Tariff = () => {
    return (
        <div className={styles.tariff_body}>
            <Header/>
            <div className={styles.content}></div>
            <Footer/>
        </div>
    )
}
export default Tariff