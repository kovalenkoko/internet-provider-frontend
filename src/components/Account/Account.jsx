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
    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailForm, setEmailForm] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [tariff, setTariff] = useState("")

    const dataFromStorage = JSON.parse(localStorage.getItem("data"))
    const isAdmin = dataFromStorage.user.roles.length === 2



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
    const onAdminPanelHandler = () =>{
        navigate("/admin-panel")
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
            const responseTariff = await fetch(`http://localhost:8080/tariffplan/getbyid/${dataFetch?.tariff_plan_id}`,requestOptions);
            const dataFetchTariff = await responseTariff.json();
            setTariff(dataFetchTariff)
        }
        data && fetchData().catch(console.error);
    }, [data])

    const onSaveHandler = () => {
        const first_name = firstName ? firstName : userInfo.first_name
        const last_name = lastName ? lastName : userInfo.last_name
        const email = emailForm ? emailForm : userInfo.email
        const phone = phoneNumber ? phoneNumber : userInfo.phone
        const formBody = {
            id: userInfo.id,
            username: userInfo.username,
            first_name,
            last_name,
            email,
            phone,
            status: userInfo.status
        }
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
            body: JSON.stringify(formBody)
        }

        fetch('http://localhost:8080/user/update', requestOptions)
            .then(response => response.json())
            .then(data => {
                setUserInfo(data)
                window.location.reload()
            });

       setEmailForm("")
       setPhoneNumber("")
       setFirstName("")
       setLastName("")
       setUserName("")
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
                    <div className={styles.tariff_div}>{tariff.name ? tariff.name : "Тариф не выбран"}</div>

                </div>
                <div className={styles.user_form_wrapper}>
                    <div className={styles.user_form}>
                        <div className={styles.info_wrapper}>
                            <label className={styles.user_info_label}>Username: </label>
                            <div className={styles.user_info_label} >{userInfo?.username}</div>
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
                            <input className={styles.user_info_input} placeholder={userInfo?.email} onChange={e => setEmailForm(e.target.value)}/>
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
                            {isAdmin ? <button className={styles.admin_panel_btn} onClick={onAdminPanelHandler} >Admin panel</button> : <></> }
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