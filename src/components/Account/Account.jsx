import React, {useContext, useEffect, useState} from "react";
import styles from "./Account.module.css"
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import mobileImg from "../../static/mobile.svg"
import {useNavigate} from "react-router";
import {UserContext} from "../../user-context";


const Account = () => {
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)
    const [userInfo, setUserInfo] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")



    const changeTariffHandler = () => {
        navigate("/tariff-plans")
    }
    const depositHandler = () => {
        navigate("/deposit")
    }

    const logOutHandler = () => {
        localStorage.removeItem('data')
        navigate("/auth")
    }
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        };
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/user/getbyid/${data?.user.id}`,requestOptions);
            const dataFetch = await response.json();
            setUserInfo(dataFetch);
        }
        data && fetchData().catch(console.error);
    }, [data])

    const onSaveHandler = () => {
        console.log(userInfo)
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify({id: userInfo.id, username: userInfo.username, email: userInfo.email, status: userInfo.status, first_name: firstName, last_name: lastName, phone: phoneNumber})
        };
        fetch('http://localhost:8080/user/update', requestOptions)
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
            });
        setFirstName("")
        setLastName("")
        setPhoneNumber("")
    }
    return (
        <div className={styles.account_body}>
            <Header/>
            <div className={styles.acc_data}>
                <div className={styles.acc_data_label}>Account data</div>
                <div className={styles.set_btns_wrapper}>
                    <div onClick={changeTariffHandler} className={styles.change_tariff_btn}>
                        <div className={styles.info_btns}>Change Tariff Plan</div>
                    </div>
                    <div onClick={depositHandler} className={styles.deposit_btn}>
                        <div className={styles.info_btns}>Deposit</div>
                    </div>
                </div>
                <div className={styles.current_plan_wrapper}>
                    <img src={mobileImg} alt={"Mobile img"} className={styles.mobile_img}/>
                    <label className={styles.curr_plan_label}>Current Tariff Plan:</label>
                    <div className={styles.tariff_div}>{"GigaParliam 500"}</div>

                </div>
                <div className={styles.user_form_wrapper}>
                    <div className={styles.user_form}>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Username</label>
                            <input className={styles.user_info_input} placeholder={userInfo?.username}/>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>First name</label>
                            <input className={styles.user_info_input} placeholder={userInfo?.first_name} onChange={e => setFirstName(e.target.value)}/>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Last name</label>
                            <input className={styles.user_info_input} placeholder={userInfo?.last_name} onChange={e => setLastName(e.target.value)}/>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Email</label>
                            <input className={styles.user_info_input} placeholder={userInfo?.email}/>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Phone number</label>
                            <input className={styles.user_info_input} placeholder={userInfo?.phone} onChange={e => setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Balance:</label>
                            <div className={styles.user_info_label} >{userInfo?.balance}$</div>
                        </div>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Status:</label>
                            <div className={styles.user_info_label}>{userInfo?.status}</div>
                        </div>
                        <div className={styles.btns_wrapper}>
                            <button className={styles.save_btn} onClick={onSaveHandler}>Save</button>
                            <button className={styles.log_out_btn} onClick={logOutHandler}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Account