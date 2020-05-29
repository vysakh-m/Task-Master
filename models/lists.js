const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  data:[
    {
      name:{
        type:String,
        required:true
      },
      label:{
        type:String,
        required:true
      },
      status:{
        type:String,
        required:true
      },
      priority:{
        type:String,
        required:true
      },
      date:{
        type:String,
        required:true
      },
      time:{
        type:String,
        required:true
      }
    }
  ]
})

module.exports= list=mongoose.model('lists',listSchema);