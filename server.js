const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080


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

app.post('/api/v1/change-richmenu', (req, res) => {
    
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