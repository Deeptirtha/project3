const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../controllers/usercontroller")
const {createBooks,getBookData, getBookById, deleteBookById,updatedocutment}=require("../controllers/bookcontroller")
const {addReview, updeteRewvied, deleteReviewById}= require("../controllers/reviewcontroller")
const  { authentication, authorization }=require("../middleware/auth")
const aws= require("aws-sdk")


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




aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
        secretAccessKey: "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",
        region: "ap-south-1"
    })
    
    let uploadFile= async ( file) =>{
        return new Promise( function(resolve, reject) {
            // this function will upload file to aws and return the link
            let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws
            
            var uploadParams= {
                ACL: "public-read",
                Bucket: "classroom-training-bucket",  //HERE
                Key: "abc/" + file.originalname, //HERE 
                Body: file.buffer
            }
            
            
            s3.upload( uploadParams, function (err, data ){
                if(err) {
                    return reject({"error": err})
                }
                console.log(data)
                console.log("file uploaded succesfully")
                return resolve(data.Location)
            })
            
            // let data= await s3.upload( uploadParams)
            // if( data) return data.Location
        // else return "there is an error"
        
    })
}

router.post("/write-file-aws", async function(req, res){
    
    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})

router.all("/*", function (req, res) {
    res.status(404).send({status: false,msg: "Wrong api please try different"})})

module.exports = router;