const express=require("express")
const router=express.Router()
const {createUser,loginUser}=require("../controllers/userController")
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcController")
const  { authentication, authorization }=require("../middleware/auth")


//<---------------------------API : RegisterUser------------------------->//
router.post("/register", createUser);
//<---------------------------API : LogIn------------------------------->//
router.post("/login",loginUser) 
//<---------------------------API : CreateBooks------------------------->//
router.post("/books", authentication, authorization,createBooks)
//<---------------------------API : Get Books--------------------------->//
router.get("/books",authentication,getBookData)
//<---------------------------API : Get Books By BookId----------------->//
router.get("/books/:bookId",authentication,getBookById)
//<---------------------------API : Update Books By BookId-------------->//
router.put("/books/:bookId",authentication,authorization,updatedocutment)
//<---------------------------API : Delete Books By BookId-------------->//
router.delete("/books/:bookId",authentication,deleteBookById)

module.exports = router;