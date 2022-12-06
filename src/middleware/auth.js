const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose")
const bookModel = require('../models/bookmodel')
const userModel = require("../models/usermodel")

const authentication = (req, res, next) => {
  try {
    let token = req.headers['x-api-key']
  
    if (!token) return res.status(400).send({ status: false, message: "Token is missing" })

    let decodedToken = jwt.verify(token, "project3-group9");
    if (!decodedToken) return res.status(401).send({ status: false, message: "Token is not valid" })
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    if(err.message == "jwt expired") return res.status(401).send({ status: false, message: "JWT expired, login again" })
    if(err.message == "invalid signature") return res.status(401).send({ status: false, message: "Token is incorrect authentication failed" })
    res.status(500).send({ status: false, error: err.message })
  }
}

const authorization = async (req, res, next) => {
  try {
  let data=req.body
 
    let loggedInUser = req.decodedToken.ID
    let userLogging

    if (data.userId) {
      req.body.userId=req.body.userId.trim()
      if (!isValidObjectId(req.body.userId)) return res.status(400).send({ status: false, message: "Enter a valid user id" })
      let userData = await userModel.findById(req.body.userId)
      if (!userData) return res.status(400).send({ status: false, message: "Error! Please check user id and try again" })
      userLogging = userData._id.toString()
    }
    if (req.params.hasOwnProperty('bookId')) {
      if (!isValidObjectId(req.params.bookId)) return res.status(400).send({ status: false, message: "Enter a valid book id" })
      let bookData = await bookModel.findById(req.params.bookId);
      if (!bookData) return res.status(400).send({ status: false, message: "Error! Please check book id and try again" })
      userLogging = bookData.userId.toString();
    }

    if (!userLogging) return res.status(400).send({ status: false, message: "User Id is required" })

    if (loggedInUser !== userLogging) return res.status(403).send({ status: false, message: 'Error, authorization failed' })
    next()
  } catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}
module.exports = { authentication, authorization }