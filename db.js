const mongoose = require('mongoose')
const dotenv = require('dotenv')

const url = process.env.URL
mongoose.connect(url,{
    usenewurlparser: true,
    // useFindAndModify:false,
    useunifiedtopology: true,
  }).then( () =>{
    console.log("successfully connect with mongodb");
}).catch( (err) =>{
    console.log(err);
})