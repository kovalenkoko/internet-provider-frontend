import React, {useState, useContext, useEffect} from "react";
import styles from "./EditProm.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate, useParams} from "react-router";
import {UserContext} from "../../user-context";



const EditProm = () => {
    const [name, setName] = useState("")
    const [discount, setDiscount] = useState("")
    const [duration, setDuration] = useState("")
    const [promotion, setPromotion] = useState([])
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)
    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2
    const params = useParams()
    const promId = params.id

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/promotion/getbyid/${promId}`,requestOptions);
            const dataFetch = await response.json();
            setPromotion(dataFetch);
        }
        data && fetchData().catch(console.error);
    }, [data])

    const onSavePromHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({id:promId, name, discount, duration})
        };
        fetch('http://localhost:8080/promotion/update', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate("/edit-promotions")
            });
    }

    return (
        <div className={styles.promotions_body}>
            <Header/>
            <div className={styles.content}>
                {isAdmin ? (<>
                    <h3>Edit promotion</h3>
                    <div>
                        <div>
                            <label>Name</label>
                            <input type={"text"} placeholder={promotion?.name} onChange={e => setName(e.target.value)} value={name}/>
                        </div>
                        <div>
                            <label>Discount</label>
                            <input  placeholder={promotion?.discount} onChange={e => setDiscount(e.target.value)}  value={discount}/>
                        </div>
                        <div>
                            <label>Duration</label>
                            <input placeholder={promotion?.duration} onChange={e => setDuration(e.target.value)}  value={duration}/>
                        </div>
                    </div>
                    <button onClick={onSavePromHandler}>Save</button>
                </>) : (<div>You have no rights</div>)}
            </div>
            <Footer/>
        </div>
    )
}
export default EditProm