import './App.css';
const express = require('express');
const app = express();

const CLIENT_ID = "03f702dcb5104eabbde108532dec5f64";
const CLIENT_SECRET = "962a577a14514feeb6aa3efb322d8c8a";
const redirect_uri = "http://localhost:3000/";
var scope = 'user-read-private user-read-email';

app.get('/login', function (req, res) {

  res.redirect('https://accounts.spotify.com/authorize?response'+
    "response_type=code&" +
    `client_id=${CLIENT_ID}&` +
    `scope=${scope}&` +
    `redirect_uri=${redirect_uri}`
  );
});

function App() {
  return (
    <h1> 
      brit jot
    </h1>
  );
}

export default App;
