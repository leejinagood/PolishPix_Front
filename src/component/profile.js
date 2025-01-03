import React, { useState, useEffect } from "react";
import { Cookies } from 'react-cookie';
import { useLocation, useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();
    const cookies = new Cookies(); // Cookies 객체 생성
    useEffect(() => {
        const Token = cookies.get('LoginToken');
        if (Token == null){
          return navigate('/login');
        }
    }, );

    return(
        <p>profile</p>
    )
}

export default Profile;