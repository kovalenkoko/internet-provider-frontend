import React, {useState, useEffect} from "react"
import styles from "./UserList.module.css"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"

const UserList = () => {
    const [userList, serUserList] = useState([])

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/user/get/all`,requestOptions)
            const dataFetch = await response.json()
            serUserList(dataFetch)
        }

        dataFromStorage && fetchData().catch(console.error)
    }, [])

    const onBlockHandler = (event) => {
        const buttonsId =  event.currentTarget.id

        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        }

        fetch(`http://localhost:8080/user/block/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
    }

    const onUnBlockHandler = (event) => {
        const buttonsId =  event.currentTarget.id

        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        }

        fetch(`http://localhost:8080/user/unblock/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
    }

    const onDeleteHandler = (event) => {
        const buttonsId =  event.currentTarget.id

        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${dataFromStorage.token}`},
        }
        
        fetch(`http://localhost:8080/user/delete/${buttonsId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
    }

    return (
        <div className={styles.user_list_body}>
            <Header/>
            <div className={styles.user_list_data}>
                {isAdmin ? <>
                    <div className={styles.user_list_label}>User List</div>
                        {userList.map(item => (
                            <div className={styles.user_list_info} key={item.id}>
                                <div className={styles.user_list_info_wrap}>
                                    <div className={styles.user_info}>
                                        <label className={styles.user_username_label}>{item.username}</label>
                                        <label className={styles.user_status_label}>Status:</label>
                                        <label className={styles.user_status_value}>{item.status}</label>
                                        <label className={styles.user_role_label}>Role:</label>
                                        <label className={styles.user_role_value}>{item.roles.length === 1 ? "User" : "Admin"}</label>
                                    </div>
                                    <div className={styles.user_list_btns}>
                                        <button className={styles.user_list_btn} id={item.id} onClick={onBlockHandler}>Block</button>
                                        <button className={styles.user_list_btn} id={item.id} onClick={onUnBlockHandler}>Unblock</button>
                                        <button className={styles.user_list_btn} id={item.id} onClick={onDeleteHandler}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </> :
                    <div className={styles.no_rights_div}>You have no rights</div>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default UserList
