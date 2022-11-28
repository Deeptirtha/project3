const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")
const {createBooks,getBookData}=require("../controllers/bookcontroller")

router.post("/register",creatUser)
router.get("/login",loginUser)
router.post("/books",createBooks)
router.get("/books",getBookData)
module.exports = router;