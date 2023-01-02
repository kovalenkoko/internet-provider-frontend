import React, {useState, useContext} from "react";
import styles from "./AddProm.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate} from "react-router";
import {UserContext} from "../../user-context";


const AddProm = () => {
    const [name, setName] = useState("")
    const [discount, setDiscount] = useState("")
    const [duration, setDuration] = useState("")
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)

    const onSavePromHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({ name, discount, duration})
        };
        fetch('http://localhost:8080/promotion/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/edit-promotions")
            });
    }

    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                <h3>Add a new Promotion</h3>
                <div>
                    <div>
                        <label>Name</label>
                        <input type={"text"} placeholder={"NAME"} onChange={e => setName(e.target.value)} value={name}/>
                    </div>
                    <div>
                        <label>Discount</label>
                        <input  placeholder={"DISCOUNT"} onChange={e => setDiscount(e.target.value)}  value={discount}/>
                    </div>
                    <div>
                        <label>Duration</label>
                        <input placeholder={"DURATION"} onChange={e => setDuration(e.target.value)}  value={duration}/>
                    </div>
                </div>
                <button onClick={onSavePromHandler}>Save</button>
            </div>
            <Footer/>
        </div>
    )
}
export default AddProm