import React, {useState, useContext, useEffect} from "react";
import styles from "./EditTariff.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate, useParams} from "react-router";
import {UserContext} from "../../user-context";


const EditTariff = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [bandwidth, setBandwidth] = useState("")
    const [bonus, setBonus] = useState("")
    const [tariff, setTariff] = useState( [])
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)
    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2
    const params = useParams()
    const tariffId = params.id

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/tariffplan/getbyid/${tariffId}`,requestOptions);
            const dataFetch = await response.json();
            setTariff(dataFetch);
        }
        data && fetchData().catch(console.error);
    }, [data])

    const onSaveTariffHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({ id:tariffId, name, price, bandwidth, bandwidthBonus:bonus })
        };
        fetch('http://localhost:8080/tariffplan/update', requestOptions)
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
                    <h3>Edit tariff plan</h3>
                    <div>
                        <div>
                            <label>Name</label>
                            <input type={"text"} placeholder={tariff?.name} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div>
                            <label>Price</label>
                            <input placeholder={tariff?.price} onChange={e => setPrice(e.target.value)}  value={price}/>
                        </div>
                        <div>
                            <label>Bandwidth</label>
                            <input placeholder={tariff?.bandwidth} onChange={e => setBandwidth(e.target.value)}  value={bandwidth}/>
                        </div>
                        <div>
                            <label>Bonus</label>
                            <input placeholder={tariff?.bandwidth_bonus} onChange={e => setBonus(e.target.value)}  value={bonus}/>
                        </div>
                    </div>
                    <button onClick={onSaveTariffHandler}>Save</button>
                </>) : (<div>You have no rights</div>)}
            </div>
            <Footer/>
        </div>
    )
}
export default EditTariff