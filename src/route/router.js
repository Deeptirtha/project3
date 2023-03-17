const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcontroller")
const {addReview,updeteRewvied,deleteReviewById}= require("../controllers/reviewcontroller")
const  { authentication, authorization }=require("../middleware/auth")

//=====================================================User========================================================================
router.post("/register",creatUser)

router.post("/login",loginUser) 
//=====================================================Book========================================================================
router.post("/books",authentication,authorization,createBooks)


router.get("/books",authentication,getBookData)

router.put("/books/:bookId",updatedocutment)

//router.get("/books/:bookId",authentication,getBookById)
router.get("/books/:bookId",getBookById)

//router.delete("/books/:bookId",authentication,authorization,deleteBookById)

router.delete("/books/:bookId",deleteBookById)

//=====================================================Book========================================================================
router.post("/books/:bookId/review",addReview)

router.put('/books/:bookId/review/:reviewId',updeteRewvied)

router.delete('/books/:bookId/review/:reviewId',deleteReviewById)



//=================================================================404==============================================================

router.all("/*", function (req, res) {
res.status(404).send({status: false,msg: "Galat api me ayela bhidu"})})
  


module.exports = router;