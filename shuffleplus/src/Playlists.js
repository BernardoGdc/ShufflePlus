import React from "react";
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function Playlists(accessToken, user){
    const [playlists, setPlaylists] = useState({})

    useEffect(() => {
        if(!accessToken) return 
        axios.post('http://localhost:3001/playlists',{ accessToken, user})
        .then(res => {
            setPlaylists(res.data)
            return playlists
        })
        .catch(err => {
            console.log(err)
        })
    },[user])

    return playlists
}
