const reviedModel = require('../models/reviedmodel');
const bookModel = require('../models/bookmodel');
const {validString,ValidObjectId,validTime,IsNumeric} = require('../validation/valid');


//===================================================================creat-review===================================================
const addReview = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    
    if(!ValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Enter a valid book id" });

    let checkBookId = await bookModel.findOne({_id:bookId,isDeleted:false});
    if(!checkBookId) return res.status(404).send({ status: false, message: "Book not found or already been deleted" });

    let data = req.body;

    console.log(data,bookId)
  let {rating,reviewedAt}=data

  if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Details required to add review for the book" })
   

    if(data.hasOwnProperty("reviewedAt")){
      let visitDate = new Date().toISOString().split('T')[0]
      if(reviewedAt.trim()!=visitDate){
     return  res.status(400).send({ status: false, message: `Dont try to be omnipotent put correct date which is ${visitDate} ` })}
  }
    if(data.hasOwnProperty("reviewedBy")){
      data.reviewedBy=data.reviewedBy.trim()
      if(!validString(data.reviewedBy)) return res.status(400).send({ status: false, message: "Enter valid data in reviewedBy" })
    }
    if(!rating) return res.status(400).send({ status: false, message: "Rating is required and should not be 0" })

    if(data.hasOwnProperty("review")){
    data.review=data.review.trim()
    if (!(data.review)) {
      return res.status(400).send({ status: false, message: "Enter valid data in review" })
    }}
    if((rating > 5 ) || (rating < 1)) return res.status(400).send({ status: false, message: "Rating should be between 1 - 5 numbers" });

    if(!IsNumeric(rating)){return res.status(400).send({ status: false, message: "Please enter ratings in Number" })}
  

    data.bookId = bookId;

 
    let reviewData = await reviedModel.create(data) ;
   await bookModel.updateOne({_id: bookId},{$inc: {reviews: 1}})
   let Newupdate = await bookModel.findById(bookId).lean()
    Newupdate.review=reviewData

    res.status(201).send({ status: true, message: "Review created Successfully", data: Newupdate })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}
//===================================================================update-review===================================================

const updeteRewvied = async function(req,res){
  try{
  let reviewId = req.params.reviewId

  let bookId = req.params.bookId

  if(!ValidObjectId(reviewId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the Review"})}

   if(!ValidObjectId(bookId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the book"})}

   let book=await bookModel.findOne({_id :bookId, isDeleted : false})
     if(!book){return res.status(404).send({status:false,msg:"Book not found or already deleted"})}

   let review = await reviedModel.findOne({_id :reviewId,bookId:bookId, isDeleted : false})
   if(!review){return res.status(404).send({status : false, Msg :"Review Not found or already deleted"})}

   let data=req.body
   if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Details required to update review" })
  for(i in data){
    if(i=='rating'){continue}
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

// if(data.hasOwnProperty("rating")){
// if((data.rating > 5 ) || (data.rating < 1)) return res.status(400).send({ status: false, message: "Rating should be between 1 - 5 numbers" })}

// if(!IsNumeric(data.rating)){return res.status(400).send({ status: false, message: "Please enter ratings in Number" })}

let updatedReview=await reviedModel.findOneAndUpdate({_id : reviewId,bookId:bookId},data, {new:true})

   res.status(200).send({status:true,msg:"review updated successfully",data:updatedReview})        

}
catch(err){
  res.status(500).send({status: false, error: err.message }) 
}}

//===================================================================Delete-review=====================================================
const deleteReviewById = async function (req,res){
  try{
      let reviewId = req.params.reviewId

      let bookId = req.params.bookId

      console.log(reviewId, bookId )

      if(!ValidObjectId(reviewId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the Review"})}

       if(!ValidObjectId(bookId)){return res.status(400).send({status : false, Msg : "Enter Valid ObjectId for the book"})}

       let book=await bookModel.findOne({_id :bookId, isDeleted : false})
         if(!book){return res.status(404).send({status:false,msg:"Book not found or already deleted"})}

       let review = await reviedModel.findOne({_id :reviewId,bookId:bookId, isDeleted : false})
       if(!review){return res.status(404).send({status : false, Msg :"Review Not found or already deleted"})}

      await reviedModel.updateOne({_id : reviewId,bookId:bookId},{isDeleted :true, deletedAt : Date.now()})
      await bookModel.updateOne({_id: bookId},{$inc: {reviews: -1}})
       res.status(200).send({status: true, message: "Review deleted successfully"});
}
catch (err){
res.status(500).send({status: false, error: err.message })    
  }
}
module.exports={addReview,deleteReviewById,updeteRewvied}