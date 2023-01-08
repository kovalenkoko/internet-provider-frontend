import React, {useEffect} from "react"
import {useNavigate} from "react-router";

const Start = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        {navigate("/auth")}
    }, [])

    return (
        <></>
    )
}
export default Start