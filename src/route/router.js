const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcontroller")
const {addReview, updeteRewvied, deleteReviewById}= require("../controllers/reviewcontroller")
const  { authentication, authorization }=require("../middleware/auth")

//<---------------------------API : RegisterUser------------------------->//
router.post("/register",creatUser);
//<---------------------------API : LoginUser---------------------------->//
router.post("/login",loginUser) ;
//<---------------------------API : CreateBook--------------------------->//
router.post("/books", authentication, authorization,createBooks);
//<---------------------------API : GetAllBooks-------------------------->//
router.get("/books",authentication,getBookData);
//<---------------------------API : GetBookWithBookId-------------------->//
router.put("/books/:bookId",authentication,authorization,updatedocutment);
//<---------------------------API : UpdateBookWithBookId----------------->//
router.get("/books/:bookId",authentication,getBookById);
//<---------------------------API : DeleteBookWithBookId----------------->//
router.delete("/books/:bookId",authentication,deleteBookById);
//<---------------------------API : AddReviews--------------------------->//
router.post("/books/:bookId/review",addReview);
//<---------------------------API : UpdateReviewsWithBookId-------------->//
router.put('/books/:bookId/review/:reviewId',updeteRewvied)
//<---------------------------API : DeleteReviewsWithBookId-------------->//
router.delete('/books/:bookId/review/:reviewId',deleteReviewById)

module.exports = router;