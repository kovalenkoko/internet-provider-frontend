import React from "react";
import styles from "./Promotions.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";


const Promotions = () => {
    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}></div>
            <Footer/>
        </div>
    )
}
export default Promotions