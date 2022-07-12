import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAuth from "./userAuth";
import Playlists from "./Playlists"
import GetUser from "./GetUser"
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react'


export default function HomePage({ code }){

    const accessToken =  UserAuth(code)
    const user = GetUser(accessToken)
    const playlistData = Playlists(accessToken, user)

    console.log(accessToken)
    console.log((playlistData.items))
    console.log(user)

    const playlists = []

    function handleData(e){
        e.preventDefault()
        console.log(playlists)

    }

    function addPlaylist(id){
        playlists.push(id)
    }

        return(
            <div>
                <h1>
                    Select playlists to shuffle
                </h1>
                <form id="playlistForm" onSubmit = {handleData}>
                {playlistData.items?.map((playlist) => (
                    <div key = {playlist.name + "1"}>
                    <div className="custom-control custom-checkbox checkbox-lg" key = {playlist.name}>
                        <input className="form-check-input" type="checkbox" value={playlist.id} id="flexCheckDefault" onChange={(e)=>addPlaylist(playlist.id)}></input>
                        <img src={playlist.images[0].url} width="100" height="100"></img>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {playlist.name}
                        </label>

                    </div>
                    <br></br>
                    </div>
                ))}
                    <Button variant = 'success' type = "submit"> SHUFFLE </Button>
                </form>
            </div>
        )  
}