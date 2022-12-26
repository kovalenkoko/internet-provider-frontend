import React, {useState, useEffect} from "react";
import styles from "./UserList.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import {useNavigate} from "react-router";


const UserList = () => {
    const [userList, serUserList] = useState([])
    const navigate = useNavigate()
    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        };
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/user/get/all`,requestOptions);
            const dataFetch = await response.json();
            serUserList(dataFetch);

        }
        dataFromStorage && fetchData().catch(console.error)
    }, [])

    const onBlockHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        };
        fetch(`http://localhost:8080/user/block/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            });
    }
    const onUnBlockHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        };
        fetch(`http://localhost:8080/user/unblock/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            });
    }
    const onDeleteHandler = (event) => {
        const buttonsId =  event.currentTarget.id
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        };
        fetch(`http://localhost:8080/user/delete/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            });
    }

    return (
        <div className={styles.user_list_body}>
            <Header/>
            <div className={styles.user_list_data}>
                {isAdmin ?
                    (
                        <div className={styles.user_list_wrapper}>
                            {userList.map((item) => (
                                <div className={styles.user_list_info}>
                                    <label>{item.username}</label>
                                    <label>{item.status}</label>
                                    <button id={item.id} onClick={onBlockHandler}>Block</button>
                                    <button id={item.id} onClick={onUnBlockHandler}>Unblock</button>
                                    <button id={item.id} onClick={onDeleteHandler}>Delete</button>
                                </div>
                            ))}
                        </div>
                    ) : (<div>You have no rights</div>)
                }
            </div>
            <Footer/>
        </div>
    )
}
export default UserList