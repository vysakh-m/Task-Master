const express=require('express');
const router = express();
const passport=require('passport')


const User=require('../models/user');
const List=require('../models/lists');

router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const newData={
    name:req.body.name,
    label:req.body.label,
    status:req.body.status,
    priority:req.body.priority,
    date:req.body.date,
    time:req.body.time
  }

  List.findOne({email:req.user.email})
  .then(list=>{
    if(list){
      list.data.unshift(newData)
      List.updateOne({email:req.user.email},{data:list.data},(err,result)=>{
        if(err){
          console.log(err)
        }
      })
      return res.json(list.data)
    }else{
      const newValue= new List({
        email:req.user.email,
        data:[newData]
      })
      newValue.save()
      .then(data=>res.json(data))
      .catch(err=>console.log(err))
    }
  })
})


router.post('/edit',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const newData={
    name:req.body.name,
    label:req.body.label,
    status:req.body.status,
    priority:req.body.priority,
    date:req.body.date,
    time:req.body.time,
  }

  List.findOne({email:req.user.email})
  .then(list=>{
    if(list){
      for(var i=0;i<list.data.length;i++){
        if(list.data[i]._id==req.body.id){
          newData._id=req.body.id;
          list.data[i]=newData
        }
      }
      List.updateOne({email:req.user.email},{data:list.data},(err,result)=>{
        if(err){
          console.log(err)
        }
      })
      return res.json(list.data)
    }else{
      return res.json({
        status:"User not found"
      })
    }
  })
})

router.post('/archive',passport.authenticate('jwt',{session:false}),(req,res)=>{
  List.findOne({email:req.user.email})
  .then(list=>{
    if(list){
      for(var i=0;i<list.data.length;i++){
        if(list.data[i]._id==req.body.id){
          list.data[i].status="Completed";
        }
      }
      List.updateOne({email:req.user.email},{data:list.data},(err,result)=>{
        if(err){
          console.log(err)
        }
      })
      return res.json(list.data)
    }else{
      return res.json({
        status:"User not found"
      })
    }
  })
})


router.delete('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
  List.findOne({email:req.user.email})
  .then(list=>{
    if(list){
      var index;
      for(var i=0;i<list.data.length;i++){
        if(list.data[i]._id==req.body.id){
          index=i;
        }
      }
      list.data.splice(index,1);
      List.updateOne({email:req.user.email},{data:list.data},(err,result)=>{
        if(err){
          console.log(err)
        }
      })
      return res.json(list.data)
    }else{
      return res.json({
        status:"User not found"
      })
    }
  })
})


module.exports=router;