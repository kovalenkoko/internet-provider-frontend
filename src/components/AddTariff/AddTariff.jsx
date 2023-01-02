import React, {useState, useContext} from "react";
import styles from "./AddTariff.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate} from "react-router";
import {UserContext} from "../../user-context";


const AddTariff = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [bandwidth, setBandwidth] = useState("")
    const [bonus, setBonus] = useState("")
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)
    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    const onSaveTariffHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({ name, price, bandwidth, bandwidthBonus:bonus })
        };
        fetch('http://localhost:8080/tariffplan/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/edit-tariff-plans")
            });
    }

    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                {isAdmin ? (<>
                    <h3>Add a new Promotion</h3>
                    <div>
                        <div>
                            <label>Name</label>
                            <input type={"text"} placeholder={"NAME"} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div>
                            <label>Price</label>
                            <input placeholder={"PRICE"} onChange={e => setPrice(e.target.value)}  value={price}/>
                        </div>
                        <div>
                            <label>Bandwidth</label>
                            <input placeholder={"BANDWIDTH"} onChange={e => setBandwidth(e.target.value)}  value={bandwidth}/>
                        </div>
                        <div>
                            <label>Bonus</label>
                            <input placeholder={"BONUS"} onChange={e => setBonus(e.target.value)}  value={bonus}/>
                        </div>
                    </div>
                    <button onClick={onSaveTariffHandler}>Save</button>
                </>) : (<div>You have no rights</div>)}
            </div>
            <Footer/>
        </div>
    )
}
export default AddTariff