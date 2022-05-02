import React from "react";
import Button from 'react-bootstrap/Button';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=03f702dcb5104eabbde108532dec5f64&response_type=code&redirect_uri=http://localhost:3000/&scope=playlist-modify-private%20user-read-private%20playlist-read-private%20user-library-read%20user-read-currently-playing%20playlist-modify-public%20user-top-read%20streaming%20playlist-read-collaborative%20user-modify-playback-state"

export default function Login(){
    return(
        <div>
            <Button href = {AUTH_URL} variant = 'success'>Spotify Login</Button>
        </div>
    )
}
