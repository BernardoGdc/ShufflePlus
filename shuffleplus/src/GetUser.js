import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function GetUser(accessToken){
    const [user, setUser] = useState()

    useEffect(() => {
        if(!accessToken) return 
        axios.post('http://localhost:3001/getuser',{ accessToken, })
        .then(res => {
            setUser(res.data.id)
            return user
        })
        .catch(err => {
            console.log(err)
        })
    },[accessToken])

    return user
}
