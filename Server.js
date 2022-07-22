const express  = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
require('./db')
 
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(require('./router/auth'))

app.listen(port , ()=>{
    console.log("connect successfully");
})









// const middleware = ( req,res,next)=>{
//     console.log("now the middleware is called")
//     next();
// }

// app.get('/', (req ,res)=>{
//     res.send("this is home page");
// }
// )
// app.get('/about', middleware ,(req ,res)=>{
//     res.send("this is about page");
// }
// )
// app.get('/contact', (req ,res)=>{
//     res.send("this is contact page");
// }
// )