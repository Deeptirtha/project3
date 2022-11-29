const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel.js");
const mongoose = require("mongoose");
const validator = require("../validation/valid")
const { isValidObjectId } = require("mongoose")


const createBooks = async function (req, res) {
    try {

        data = req.body;

        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted } = data;

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please Provide Details" })

        if (!title) return res.status(400).send({ status: false, message: "Please Provide Title" })
        if (!validator.validTitleBooks(title)) return res.status(400).send({ status: false, message: "provide a valid Book Title " })

        let duplicateTitle = await bookModel.findOne({ title })
        if (duplicateTitle) return res.status(400).send({ status: false, message: "title is already registered!" })

        if (!excerpt) return res.status(400).send({ status: false, message: "Please Provide Excerpt" })
        if (!validator.validName(excerpt)) return res.status(400).send({ status: false, message: "provide excerpt is string" })

        if (!userId) return res.status(400).send({ status: false, message: "Please Provide userId" })
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(403).send({ status: false, message: "Please Provide Valid userId" })

        if (!ISBN) return res.status(400).send({ status: false, message: "Please Provide ISBN" })
        if (!validator.ValidISBN(ISBN)) return res.status(400).send({ status: false, message: "Please Provide Valid ISBN like this [10 or 13 digits] and hyphens" })

        let duplicateISBN = await bookModel.findOne({ ISBN })
        if (duplicateISBN) return res.status(400).send({ status: false, message: "ISBN is already registered!" })

        if (!category) return res.status(400).send({ status: false, message: "Please Provide Category" })
        if (!validator.validcategory(category)) return res.status(400).send({ status: false, message: "please provide category string" })

        if (!subcategory) return res.status(400).send({ status: false, message: "Please Provide Subcategory" })
        if (!validator.validName(subcategory)) return res.status(400).send({ status: false, message: "please provide subcategory string" })

        if (!releasedAt) return res.status(400).send({ status: false, message: "Please Provide releasedAt" })
        if (!validator.validTime(releasedAt)) return res.status(400).send({ status: false, message: "Please enter releasedAt in the right format(YYYY-MM-DD)!" })

        if (isDeleted === true) data.deletedAt = new Date()

        const bookCreation = await bookModel.create(data)
        res.status(201).send({ status: true, message: "Book Created Successfully", data: bookCreation })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}
// *********************** Getbooks ************************
const getBookData = async function (req, res) {
    try {
      let data = req.query
      data.isDeleted = false
     
      let Id = req.query.userId
  
      if (!Id) {
        let result = await bookModel.find(data).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1,subcategory:1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
        if (result.length < 1) { res.status(404).send({ status: false, msg: "No book found" }) }
        else { res.status(200).send({ status: true, msg: result }) }
      }
      else {
      
        if (!isValidObjectId(Id)) { return res.status(400).send({ status: false, msg: "user id is not valid" }) }
        let result = await bookModel.find(data).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1,subcategory:1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
        if (result.length == 0) { res.status(404).send({ status: false, msg: "no book found" }) }
        else { res.status(200).send({ status: true, msg: result }) }
      }
    }
  
    catch (err) {
      res.status(500).send({ status: false, msg: err.message })
    }
  }
//===================================================================Get-Id====================================

let getBookById= async function(req,res){
  try{
    let bookId=req.params.bookId
    if(!isValidObjectId(bookId)){return res.status(400).send({status:false,msg:"please provide a valid book id"})}
    let book=await bookModel.findOne({_id:bookId,isDeleted:false})
    if(!book){return res.status(400).send({status:false,msg:"no book found or book already deleted"})}
    res.status(400).send({status:false,msg:book})

  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}
//==============================================================update===========================================================

const updatedocutment = async function (req, res) {
  try {

      const bodydata = req.body
      const bookId = req.params.bookId

      const { title, excerpt, releasedAt, ISBN, category, subcategory, reviews, isDeleted, userId } = bodydata;

      if (!validator.ValidObjectId(bookId)) return res.status(400).send({ status: false, message: "please provide valid bookId" })

      if (Object.keys(bodydata).length == 0) return res.status(400).send({ satus: false, message: "for updation data is required" })

      if (!validator.validTitleBooks(title)) return res.status(400).send({ status: false, message: "provide title in string" })

      if (!validator.validName(excerpt)) return res.status(400).send({ status: false, message: "provide excerpt is string" })

      if (!validator.validcategory(category)) return res.status(400).send({ status: false, message: "please provide category string" })

      if (!validator.validName(subcategory)) return res.status(400).send({ status: false, message: "please provide subcategory string" })

      if (!validator.ValidISBN(ISBN)) return res.status(400).send({ status: false, message: "please provide Valid ISBN" })


      let alert = await bookModel.findOne({ _id: bookId, isDeleted: true })
      if (alert) return res.status(400).send({ msg: "Blog already deleted" })

      if (isDeleted) return res.status(400).send({ satus: false, message: "you can't delete data" })

      if (userId) return res.status(400).send({ satus: false, message: "you can't change userId" })

      if (releasedAt) return res.status(400).send({ satus: false, message: "you can't change released date" })

      if (reviews) return res.status(400).send({ satus: false, message: "you can't change reviews" })

      let presetISBN = await bookModel.findOne({ _id:bookId,ISBN:ISBN })
      if (presetISBN) return res.status(400).send({ message: "This ISBN is present in database" })

      let presettittle = await bookModel.findOne({ title })
      if (presettittle) return res.status(400).send({ message: "title already present in database" })


      let Updatedbook = await bookModel.findOneAndUpdate({ _id: bookId },

          { title: title, excerpt: excerpt, category: category, subcategory: subcategory, reviews: reviews }, { new: true })



      return res.status(200).send({ status: true, message: "Book update is successful", data: Updatedbook })

  } catch (err) { return res.status(500).send({ status: false, message: "server error", Error: err.message }) }
}

//================================================================Delete-Id=====================================================
const deleteBookById = async function (req, res) {
  try {
      const bookId = req.params.bookId
      if(!isValidObjectId(bookId)){return res.status(400).send({status:false,msg:"please provide a valid book id"})}
      let book=await bookModel.findOne({_id:bookId,isDeleted:false})
      if(!book){return res.status(400).send({status:false,msg:"no book found or book already deleted"})}
      let DeleteBook=await bookModel.updateOne({ _id: bookId }, { isDeleted: true ,deletedAt: Date.now()});
   
    res.status(200).send({status: true, message: "Book deleted successfully"});
  }
  catch (err) {
      res.status(500).send({status: false, error: err.message })
  }
}

module.exports = {createBooks, getBookData, getBookById,deleteBookById,updatedocutment}