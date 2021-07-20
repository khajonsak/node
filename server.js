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


app.post('/loginrichmenu', (req, res) => {
    
    const { username, password, userId } = req.body;
    console.log(req.body);
    if (username && password){
        connection.query('SELECT * FROM user1  WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
     if(results.length > 0){ 
         req.session.loggeedin = true;
         req.session.userId = userId;
         client.linkRichMenuToUser(userId, "richmenu-1753cf92786d4090d9590e8545094831");
     
         console.log('รหัสถูกต้อง')
         res.end();
     } else if (username && password) {
        connection.query('SELECT * FROM user2 WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if(results.length > 0){ 
                req.session.loggeedin = true;
                req.session.userId = userId;
                client.linkRichMenuToUser(userId, "richmenu-9819db4f8376aefb9a37f3da9e99bef2");
          
                console.log('รหัสถูกต้อง1')
                res.end();
                
            } else if (username && password) {
                connection.query('SELECT * FROM user3 WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
                    if(results.length > 0){ 
                        req.session.loggeedin = true;
                        req.session.userId = userId;
                        client.linkRichMenuToUser(userId, "richmenu-5eadfafc7f550d4ea14db1a2ec76f56d");
                  
                        console.log('รหัสถูกต้อง2')
                        res.end();
                    } else {
                      
                        res.send('page 3')
                        res.end();
                    }

                })
            }
        })
        
     } 
     
 });

 }
   
})



app.listen(PORT, ()=>{
    console.log(`Serer is running. ${PORT}`)
})