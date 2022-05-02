import { useState, useEffect } from "react";
import axios from 'axios'

export default function UserAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpieresIn] = useState()

    //useEffect will run everytime [code] changes
    useEffect(() => {
        axios.post('http://localhost:3001/login',{ code, })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpieresIn(res.data.expiresIn)
            console.log(res.data)
        })
        .catch(() => {
            window.location = "/"
        })
    },[code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return 
        const timeout = setInterval(() => {
            axios.post('http://localhost:3001/refresh',{ refreshToken, })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpieresIn(res.data.expiresIn)
            })
            .catch(() => {
                //window.location = "/"
            })  
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(timeout)
    },[refreshToken, expiresIn])

    return accessToken
}
