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
    let Newupdate=await bookModel.updateOne({_id: bookId},{$inc: {reviews: 1}}).lean()
    Newupdate.review=reviewData

    res.status(201).send({ status: true, message: "Revied Updated Successfully", data: Newupdate })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

module.exports={addReview}