const UserModel=require("../models/usermodel")
const jwt =require("jsonwebtoken")
const { validName,  validEmail,validMobile}=require("../validation/valid")
let creatUser= async function (req,res){
    let body=req.body
    if(Object.keys(body).length==0){return res.status(400).send({status:false,message:"Body is empty can't craeate data"})}
   if(!data.name || validName.test(data.name)){return res.status(400).send({status:false,message:"name is not valid"})}
   if(!data.title || data.title!=("Mr"|| "Mrs"|| "Miss")){return res.status(400).send({status:false,message:"title is not valid"})}
   if(!data.email || validName.test(data.name)){return res.status(400).send({status:false,message:"name is not valid"})}
    let user=await UserModel.create(body)
    res.send({status:true,msg:user})
}



{
    "title":"Mrs",
    "name":"Sipu",
    "phone":"1111222212",
    "email":"adsc@gmail.com", 
    "password":"125abc",
    "address": {
      "street":"a.k",
      "city":"Dgp",
      "pincode":"712254"}}








const loginUser=async function(req,res){
    let data=req.body
    console.log(data)
    let user=await UserModel.findOne(data)
    if(!user){return res.send("no data found")}
    let token =jwt.sign({ID:user._id},"hello",{ expiresIn:"1h"})
    res.send(token)
}
module.exports={creatUser,loginUser}