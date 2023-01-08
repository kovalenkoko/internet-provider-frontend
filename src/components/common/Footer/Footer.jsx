import React from 'react'
import styles from "./Footer.module.css"
import googlePlayImg from "../../../static/google_play_btn.svg"
import appStoreImg from "../../../static/app_store_btn.svg"
import facebookImg from "../../../static/facebook.svg"
import instImg from "../../../static/inst.svg"
import twitterImg from "../../../static/twitter.svg"
import vkImg from "../../../static/vk.svg"
import { useNavigate } from 'react-router'

const Footer = () => {
    const navigate = useNavigate()

    const promotionsHandler = () => {
        navigate("/promotions")
    }

    return (
        <div className={styles.footer}>
            <div className={styles.logo_wrap}>
                <label onClick={promotionsHandler} className={styles.logo_title}>MarlborSoft</label>
                <div className={styles.download_btns_wrap}>
                    <label className={styles.soon_btn}>Coming Soon</label>
                    <a className={styles.download_btns_a} href={"#"}>
                        <img className={styles.download_btns} src={googlePlayImg} alt={"googlePlay"} />
                    </a>
                    <a href={"#"}>
                        <img className={styles.download_btns} src={appStoreImg} alt={"appStore"} />
                    </a>
                </div>
            </div>
            <div className={styles.links_wrap}>
                <label className={styles.rights} >© 2022-2023 MarlborSoft, Inc. All rights reserved</label>
                <div className={styles.social_wrap}>
                    <a className={styles.social_img} href={"#"}>
                        <img src={facebookImg} alt={"facebook"}/>
                    </a>
                    <a className={styles.social_img} href={"#"}>
                        <img src={instImg} alt={"inst"} />
                    </a>
                    <a className={styles.social_img} href={"#"}>
                        <img src={twitterImg} alt={"twitter"}/>
                    </a>
                    <a href={"#"}>
                        <img src={vkImg} alt={"vk"} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
