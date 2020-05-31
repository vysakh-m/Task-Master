const express=require('express');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const app=express();
const passport = require('passport');
//Body-Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//MongoDB Authentication
const uri = require('./config/keys').mongo;
mongoose.connect(uri, {
  dbName: 'stack-hack',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Passport
app.use(passport.initialize());
require('./config/passport')(passport);


//Importing Routes
app.use('/user',require('./routes/user'));
app.use('/list',require('./routes/list'));


app.get('/',(req,res)=>{
  res.send('Hello')
});


app.listen(4000,()=>{
  console.log("Listening on port 4000")
})