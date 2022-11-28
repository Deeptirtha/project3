const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")


router.post("/start",creatUser)
router.post("/get",loginUser)
module.exports = router;