const reviedModel = require('../models/reviedmodel');
const bookModel = require('../models/bookmodel');
const {validString,ValidObjectId,validTime} = require('../validation/valid');

const addReview = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    
    if(!ValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Enter a valid book id" });

    let checkBookId = await bookModel.findOne({_id:bookId,isDeleted:false});
    if(!checkBookId) return res.status(404).send({ status: false, message: "Book not found or already been deleted" });

    let data = req.body;

  data.reviewedAt= data.reviewedAt.trim()
    
    if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Details required to add review to the book" })

    if (!validTime(data.reviewedAt)) return res.status(400).send({ status: false, message: "Please enter reviewedAt in the right format(YYYY-MM-DD)!" })
   
    if(!data.rating) return res.status(400).send({ status: false, message: "Rating is required and should not be 0" });
    
  
    if (validString(data.reviewedBy) || validString(data.review)) {
      return res.status(400).send({ status: false, message: "Enter valid data in review and reviewedBy" })
    }

    if((data.rating > 6 ) && (data.rating < 1)) return res.status(400).send({ status: false, message: "Rating should be between 1 - 5 numbers" });

    data.bookId = bookId;

 
    let reviewData = await reviedModel.create(data) ;
    await bookModel.updateOne(
      {_id: bookId},
      {$inc: {reviews: 1}}
    )

    res.status(201).send({ status: true, message: "Revied Updated Successfully", data: reviewData })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

module.exports={addReview}