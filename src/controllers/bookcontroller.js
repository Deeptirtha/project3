const bookModel = require("../models/bookmodel");
const userModel = require("../models/usermodel.js");
let reviedModel=require("../models/reviedmodel")
const mongoose = require("mongoose");
const validator = require("../validation/valid")
const { isValidObjectId } = require("mongoose")
const  { uploadFile }=require("../aws")
//========================================================creating-book=======================================================
const createBooks = async function (req, res) {
  try {

      data = req.body;
      files=req.files

      const { title, excerpt, ISBN, category, subcategory, releasedAt,userId ,isDeleted } = data;
    
      if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please Provide Details" })
      
      if (!title) return res.status(400).send({ status: false, message: "Please Provide Title" })
      if (!validator.validTitleBooks(title.trim())) return res.status(400).send({ status: false, message: "provide a valid Book Title " })

      

      let duplicateTitle = await bookModel.findOne({ title })
      if (duplicateTitle) return res.status(400).send({ status: false, message: "title is already registered!" })

      if (!excerpt) return res.status(400).send({ status: false, message: "Please Provide Excerpt" })
      if (!validator.validName(excerpt.trim())) return res.status(400).send({ status: false, message: "provide excerpt is string" })

      if (!userId) return res.status(400).send({ status: false, message: "Please Provide userId" })
      data.userId=data.userId.trim()
      if (!mongoose.Types.ObjectId.isValid(data.userId)) return res.status(403).send({ status: false, message: "Please Provide Valid userId" })

      if (!ISBN) return res.status(400).send({ status: false, message: "Please Provide ISBN" })
      if (!validator.ValidISBN(ISBN.trim())) return res.status(400).send({ status: false, message: "Please Provide Valid ISBN like this [10 or 13 digits] and hyphens" })

      let duplicateISBN = await bookModel.findOne({ ISBN })
      if (duplicateISBN) return res.status(400).send({ status: false, message: "ISBN is already registered!" })

      if (!category) return res.status(400).send({ status: false, message: "Please Provide Category" })
      if (!validator.validcategory(category)) return res.status(400).send({ status: false, message: "please provide category in string" })

      if (!subcategory) return res.status(400).send({ status: false, message: "Please Provide Subcategory" })
      if (!validator.validName(subcategory.trim())) return res.status(400).send({ status: false, message: "please provide subcategory in string" })

      if (!releasedAt) return res.status(400).send({ status: false, message: "Please Provide releasedAt" })
      if (!validator.validTime(releasedAt.trim())) return res.status(400).send({ status: false, message: "Please enter releasedAt in the right format(YYYY-MM-DD)!" })

      if (isDeleted === true) data.deletedAt = Date.now()

      let user=await userModel.findById(data.userId)
      if(!user){return res.status(404).send({satus:false,msg:"user is not present in database"})}


      // let url = await uploadFile(files[0])
      // data.bookCover = url;


      const bookCreation = await bookModel.create(data)
      res.status(201).send({ status: true, message: "Book Created Successfully", data: bookCreation })

  } catch (error) {
      res.status(500).send({ status: false, error: error.message })
  }
}
// ================================================================= Getbooks =============================================================
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
        let result = await bookModel.find(data).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1,subcategory:1, reviews: 1, releasedAt: 1}).sort({ title: 1 })
        if (result.length == 0) { res.status(404).send({ status: false, msg: "no book found" }) }
        else { res.status(200).send({ status: true, msg: result }) }
      }
    }
  
    catch (err) {
      res.status(500).send({ status: false, msg: err.message })
    }
  }
//===================================================================Get-by-Id===================================================

let getBookById= async function(req,res){
  try{
    let bookId=req.params.bookId
    if(!isValidObjectId(bookId)){return res.status(400).send({status:false,msg:"please provide a valid book id"})}
    let book=await bookModel.findOne({_id:bookId,isDeleted:false}).populate("userId", {name:1}).lean()
    if(!book){return res.status(404).send({status:false,msg:"no book found or book already deleted"})}
    let reviews=await reviedModel.find({bookId:req.params.bookId ,isDeleted:false}).select({bookId:1, reviewedBy:1, reviewedAt:1, rating:1, review:1})
     book.reviewsData=reviews
    res.status(200).send({status:true,data:book})

  }
  catch (err) {
    res.status(500).send({ status:false, msg: err.message })
  }
}
//==============================================================update-by-Id===========================================================
const updatedocutment = async function (req, res) {
  try {

    const bodydata = req.body
    const bookId = req.params.bookId

    const { title, excerpt, releasedAt, ISBN, category, subcategory, reviews, isDeleted, userId } = bodydata;

    if (!validator.ValidObjectId(bookId)) return res.status(400).send({ status: false, message: "please provide valid bookId" })

    if (Object.keys(bodydata).length == 0) return res.status(400).send({ satus: false, message: "for updation data is required" })

    if (!validator.validTitleBooks(title)) return res.status(400).send({ status: false, message: "provide title in string" })

    //if (!validator.validName(excerpt)) return res.status(400).send({ status: false, message: "provide excerpt is string" })

    if (bodydata.hasOwnProperty("releasedAt")) {

      if (!validator.validTime(releasedAt.trim())) return res.status(400).send({ status: false, message: "Please enter reviewedAt in the right format(YYYY-MM-DD)!" })
    }

    if (!validator.validcategory(category)) return res.status(400).send({ status: false, message: "please provide category string" })

    if (!validator.validName(subcategory)) return res.status(400).send({ status: false, message: "please provide subcategory string" })

    if (bodydata.hasOwnProperty("ISBN")) {
    if (!validator.ValidISBN(ISBN.trim())) return res.status(400).send({ status: false, message: "please provide Valid ISBN" })
    }

    let alert = await bookModel.findOne({ _id: bookId, isDeleted: true })
    if (alert) return res.status(404).send({ msg: "Book not found or already deleted" })

    if (isDeleted) return res.status(400).send({ satus: false, message: "you can't delete data" })

    if (reviews) return res.status(400).send({ satus: false, message: "you can't change reviews" })

    let presetISBN = await bookModel.findOne({ ISBN: ISBN })
    if (presetISBN) return res.status(400).send({ message: "This ISBN is already present in database" })

    let presettittle = await bookModel.findOne({ title })
    if (presettittle) return res.status(400).send({ message: "title already present in database" })


    let Updatedbook = await bookModel.findOneAndUpdate({ _id: bookId },

      { title: title, excerpt: excerpt, releasedAt: releasedAt, category: category, subcategory: subcategory, reviews: reviews, ISBN: ISBN }, { new: true })



    return res.status(200).send({ status: true, message: "Book update is successful", data: Updatedbook })

  } catch (err) { return res.status(500).send({ status: false, message: "server error", Error: err.message }) }
}

//================================================================Delete-by-Id=====================================================
const deleteBookById = async function (req, res) {
  try {
      const bookId = req.params.bookId
      if(!isValidObjectId(bookId)){return res.status(400).send({status:false,msg:"please provide a valid book id"})}
      let book=await bookModel.findOne({_id:bookId,isDeleted:false})
      if(!book){return res.status(404).send({status:false,msg:"No book found or book already deleted"})}
      await bookModel.updateOne({ _id: bookId }, { isDeleted: true ,deletedAt: Date.now(),reviews:0});

     // await reviedModel.updateMany({bookId:bookId},{isDeleted :true, deletedAt : Date.now()})
    res.status(200).send({status: true, message: "Book deleted successfully"});
  }
  catch (err) {
      res.status(500).send({status: false, error: err.message })
  }
}

module.exports = {createBooks, getBookData, getBookById,deleteBookById,updatedocutment}