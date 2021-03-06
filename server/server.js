const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.listen(3001)

app.post('/playlists', (req, res) => {
    const accessToken = req.body.accessToken
    const user = req.body.user
    console.log("ACCESS TOKEN: ", accessToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/",
        clientId: "03f702dcb5104eabbde108532dec5f64",
        clientSecret: "a9e369b4b0304790b54e0c6dece146e6",
    })
    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getUserPlaylists(user).then((data) => {
        res.json({
            items: data.body.items
        })
        //console.log('Some information about this user', data.body.items);
    }).catch(err => {
        console.log(err)
        res.sendStatus(402)
    })
})

app.post('/getuser', (req, res) => {
    const accessToken = req.body.accessToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/",
        clientId: "03f702dcb5104eabbde108532dec5f64",
        clientSecret: "a9e369b4b0304790b54e0c6dece146e6",
    })
    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getMe().then((data) => {
        res.json({
            id: data.body.id
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(402)
    })
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/",
        clientId: "03f702dcb5104eabbde108532dec5f64",
        clientSecret: "a9e369b4b0304790b54e0c6dece146e6",
        refreshToken
    })

    spotifyApi.refreshAccessToken().then((data) => {
        res.json({
            accessToken:data.body.access_token,
            expiresIn: data.body.expiresIn
        })
    }).catch(() => {
        res.sendStatus(401)
    })
})

app.post('/login',(req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000/",
        clientId: "03f702dcb5104eabbde108532dec5f64",
        clientSecret: "a9e369b4b0304790b54e0c6dece146e6"
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})
