const express=require('express');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const app=express();

//Body-Parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//MongoDB Authentication
const uri = require('./config/keys').mongo;
mongoose.connect(uri, {
  dbName: 'stack-hack',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Importing Routes
app.use('/user',require('./routes/user'));


app.get('/',(req,res)=>{
  res.send('Hello')
});


app.listen(4000,()=>{
  console.log("Listening on port 4000")
})