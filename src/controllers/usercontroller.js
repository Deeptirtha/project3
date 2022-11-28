const UserModel=require("../models/usermodel")
const jwt =require("jsonwebtoken")
let creatUser= async function (req,res){
    let body=req.body
    
    console.log(body)
    let user=await UserModel.create(body)
    res.send({status:true,msg:user})
}
const loginUser=async function(req,res){
    let data=req.body
    console.log(data)
    let user=await UserModel.findOne(data)
    if(!user){return res.send("no data found")}
    let token =jwt.sign({ID:user._id},"hello",{ expiresIn:"1h"})
    res.send(token)
}
module.exports={creatUser,loginUser}