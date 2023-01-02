import React from "react";
import {useNavigate} from "react-router";

const Start = () => {
    const navigate = useNavigate()

    return (
        <>{navigate("/auth")}</>
    )
}
export default Start