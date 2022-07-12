import { useState, useEffect } from "react";
import axios from 'axios'




export default function UserAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpieresIn] = useState()

    //useEffect will run everytime [code] changes
    useEffect(() => {

        async function initialLogin() {
            axios.post('http://localhost:3001/login',{ code, })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpieresIn(res.data.expiresIn)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                window.location = "/"
            })
        }

        initialLogin();
    },[code])

    useEffect(() => {

        async function refresh(){
            if(!refreshToken || !expiresIn) return 
            const timeout = setInterval(() => {
                axios.post('http://localhost:3001/refresh',{ refreshToken, })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpieresIn(res.data.expiresIn)
                })
                .catch(err => {
                    console.log(err)
                    window.location = "/"
                })  
            }, (expiresIn - 60) * 1000)

            return () => clearInterval(timeout)    
        }

        refresh();
        
    },[refreshToken, expiresIn])

    return accessToken
}

export const AuthorizeUser = (code) => {

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpieresIn] = useState()

    return new Promise((resolve, reject) =>{

        console.log("Code: " + code)


        async function initialLogin() {
            axios.post('http://localhost:3001/login',{ code, })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpieresIn(res.data.expiresIn)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)                   
                //window.location = "/"
            })
        }
    
        initialLogin();

        async function refresh(){
            if(!refreshToken || !expiresIn) return 
            const timeout = setInterval(() => {
                axios.post('http://localhost:3001/refresh',{ refreshToken, })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpieresIn(res.data.expiresIn)
                })
                .catch(err => {
                    console.log(err)
                    //window.location = "/"
                })  
            }, (expiresIn - 60) * 1000)
    
            return () => clearInterval(timeout)    
        }
    
        refresh();
        
        if(!accessToken){
            reject("NO ACCESSTOKEN")
        } else {
            resolve(accessToken)
        }
    })
}
