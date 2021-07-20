require('dotenv').config();

const express = require('express');
var session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const logger = require('morgan');
const line = require('@line/bot-sdk');
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.PORT || 8080

const connection = mysql.createConnection({
    host: 'mysql-khajonsak.alwaysdata.net',
    user: 'khajonsak',
    password: '08052543pok',
    database: 'khajonsak_01'

});
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};



const client = new line.Client(config);
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());


app.get("/", (req, res)=>{
    res.json({result: "ok", data:[1,2,3,4,5]})
})

app.get("/s", (req, res)=>{
    res.json({result: "ok", data:[1,2,3]})
})


//U2db00ef1712aa45bf9fcca64c3c82501
app.get('/api/v1/unlink-richmenu', (req, res) => {    
    client.unlinkRichMenuFromUser("U2db00ef1712aa45bf9fcca64c3c82501");
    res.json({
        data: req.body
    });
});




app.listen(PORT, ()=>{
    console.log(`Serer is running. ${PORT}`)
})