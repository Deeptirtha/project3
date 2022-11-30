const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcontroller")
const {addReview}= require("../controllers/reviewcontroller")
const  { authentication, authorization }=require("../middleware/auth")

//=====================================================User========================================================================
router.post("/register",creatUser)

router.post("/login",loginUser) 
//=====================================================Book========================================================================
//router.post("/books", authentication, authorization,createBooks)
router.post("/books",createBooks)

router.get("/books",authentication,getBookData)

router.put("/books/:bookId",authentication,authorization,updatedocutment)

router.get("/books/:bookId",authentication,getBookById)

router.delete("/books/:bookId",authentication,deleteBookById)

//=====================================================Book========================================================================
router.post("/books/:bookId/review",addReview)


module.exports = router;