const reviedModel = require('../models/reviedmodel');
const bookModel = require('../models/bookmodel');
const {validString,ValidObjectId,validTime,IsNumeric} = require('../validation/valid');

const addReview = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    
    if(!ValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Enter a valid book id" });

    let checkBookId = await bookModel.findOne({_id:bookId,isDeleted:false});
    if(!checkBookId) return res.status(404).send({ status: false, message: "Book not found or already been deleted" });

    let data = req.body;
  let {rating,review}=data

  if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Details required to add review to the book" })

    if(data.hasOwnProperty("reviewedAt")){
      data.reviewedAt= data.reviewedAt.trim()
      if (!validTime(data.reviewedAt)) return res.status(400).send({ status: false, message: "Please enter reviewedAt in the right format(YYYY-MM-DD)!" })
    }
    if(data.hasOwnProperty("reviewedBy")){
      data.reviewedBy=data.reviewedBy.trim()
      if(!validString(data.reviewedBy)) return res.status(400).send({ status: false, message: "Enter valid data in reviewedBy" })
    }
    if(!rating) return res.status(400).send({ status: false, message: "Rating is required and should not be 0" })

    if(!review)return res.status(400).send({ status: false, message: "review is required" })
    data.review= data.review.trim()
    if (!validString(data.review)) {
      return res.status(400).send({ status: false, message: "Enter valid data in review" })
    }
    if((rating > 5 ) || (rating < 1)) return res.status(400).send({ status: false, message: "Rating should be between 1 - 5 numbers" });

    if(!IsNumeric(rating)){return res.status(400).send({ status: false, message: "Please enter ratings in Number" })}
  

    data.bookId = bookId;

 
    let reviewData = await reviedModel.create(data) ;
   await bookModel.updateOne({_id: bookId},{$inc: {reviews: 1}})
   let Newupdate = await bookModel.findById(bookId).lean()
    Newupdate.review=reviewData

    res.status(201).send({ status: true, message: "Revied Updated Successfully", data: Newupdate })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}
//===================================================================review-update===================================================

const updeteRewvied = async function(req,res){
  try{
  let reviewId = req.params.reviewId

  let bookId = req.params.bookId

  if(!ValidObjectId(reviewId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the Review"})}

   if(!ValidObjectId(bookId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the book"})}

   let book=await bookModel.findOne({_id :bookId, isDeleted : false})
     if(!book){return res.status(400).send({status:false,msg:"Book not found or already deleted"})}

   let review = await reviedModel.findOne({_id :reviewId,bookId:bookId, isDeleted : false})
   if(!review){return res.status(400).send({status : false, Msg :"Review Not found or already deleted"})}

   let data=req.body

  for(i in data){
       data[i]=data[i].trim()
       if(!data[i]){return res.status(400).send({status:false,msg:`${i} can't be empty`})}
  }

if(data.hasOwnProperty("reviewedAt") || data.hasOwnProperty("bookId") || data.hasOwnProperty("isDeleted")){return res.status(400).send({status:false,msg:"You cant't change restricted field which are isDeleted,reviewedAt,bookId "})}

 if(data.hasOwnProperty("reviewedBy")){
  if(!validString(data.reviewedBy)) return res.status(400).send({ status: false, message: "Enter valid data in reviewedBy" })
 }

 if(data.hasOwnProperty("review")){
 if (!validString(data.review)) {
  return res.status(400).send({ status: false, message: "Enter valid data in review" })
}}

if(data.hasOwnProperty("rating")){
if((data.rating > 5 ) || (data.rating < 1)) return res.status(400).send({ status: false, message: "Rating should be between 1 - 5 numbers" })}

if(!IsNumeric(data.rating)){return res.status(400).send({ status: false, message: "Please enter ratings in Number" })}

 await reviedModel.updateOne({_id : reviewId,bookId:bookId},data)
 let updatedReview= await reviedModel.findOne({_id :reviewId,bookId:bookId})


   res.status(200).send({status:true,msg:"review updated successfully",data:updatedReview})        

}
catch(err){
  res.status(500).send({status: false, error: err.message }) 
}}



const deleteReviewById = async function (req,res){
  try{
      let reviewId = req.params.reviewId

      let bookId = req.params.bookId

      if(!ValidObjectId(reviewId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the Review"})}

       if(!ValidObjectId(bookId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the book"})}

       let book=await bookModel.findOne({_id :bookId, isDeleted : false})
         if(!book){return res.status(400).send({status:false,msg:"Book not found or already deleted"})}

       let review = await reviedModel.findOne({_id :reviewId,bookId:bookId, isDeleted : false})
       if(!review){return res.status(400).send({status : false, Msg :"Review Not found or already deleted"})}

      await reviedModel.updateOne({_id : reviewId,bookId:bookId},{isDeleted :true, deletedAt : Date.now()})
      await bookModel.updateOne({_id: bookId},{$inc: {reviews: -1}})
       res.status(200).send({status: true, message: "Review deleted successfully"});
}
catch (err){
res.status(500).send({status: false, error: err.message })    
  }
}
module.exports={addReview,deleteReviewById,updeteRewvied}