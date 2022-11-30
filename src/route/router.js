const express=require("express");
const router=express.Router();
const {createUser,loginUser}=require("../controllers/usercontroller");
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcontroller");
const {addReview}= require("../controllers/reviewcontroller");
const  { authentication, authorization }=require("../middleware/auth");

//<---------------------------API : RegisterUser------------------------->//
router.post("/register",createUser);
//<---------------------------API : Login-------------------------------->//
router.post("/login",loginUser) ;
//<---------------------------API : GetBook------------------------------>//
router.get("/books",authentication,getBookData);
//<---------------------------API : UpdateBook--------------------------->//
router.put("/books/:bookId",authentication,authorization,updatedocutment);
//<---------------------------API : GetBookWithBookId-------------------->//
router.get("/books/:bookId",authentication,getBookById);
//<---------------------------API : DeleteBookWithBookId----------------->//
router.delete("/books/:bookId",authentication,deleteBookById);
//<---------------------------API : UpdateReviewWithBookId--------------->//
router.post("/books/:bookId/review",addReview);


module.exports = router;