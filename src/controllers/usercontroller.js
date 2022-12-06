const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const { validName, validEmail, validMobile, validPass, validpincode, validTitle } = require("../validation/valid.js");


//<---------------------------API : RegisterUser------------------------->//
let creatUser = async function (req, res) {

  try {
    let data = req.body;
    const { name, phone, email, password, address } = data;
    
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Body is empty can't craeate data" })
    
    const { street, city, pincode } = address;
    data.title = data.title.trim()

    if (!name || !validName.test(name.trim())) { return res.status(400).send({ status: false, message: "enter a valid name" }) }

    if (validTitle(data.title)) { return res.status(400).send({ status: false, message: "enter a valid title" }) }

    if (!phone || !validMobile.test(phone.trim())) { return res.status(400).send({ status: false, message: "enter a valid phone No" }) }

    if (!email || !validEmail.test(email.trim())) { return res.status(400).send({ status: false, message: "enter a valid email" }) }

    if (!password || !validPass.test(password)) { return res.status(400).send({ status: false, message: "Password should be in-between 8-15 characters and must contain one of 0-9,A-Z,a-z and special character" }) }

    if (address) {
      if (Object.keys(address).length == 0) { return res.status(400).send({ status: true, msg: "address can't be empty" }) }

      if (!street) { return res.status(400).send({ status: false, message: "street key is mandatory in your address " }) }

      if (!city) { return res.status(400).send({ status: false, message: "city key is mandatory in your address " }) }

      if (!pincode || !validpincode.test(address.pincode.trim())) { return res.status(400).send({ status: false, message: "please input valid pincode " }) }
    }

    let oldUser = await UserModel.findOne({ $or: [{ phone: data.phone }, { email: data.email }] })
    if (oldUser) { return res.status(400).send({ status: false, message: "User already exist with this phone no or email Id" }) }
    let user = await UserModel.create(data);
    res.status(201).send({ status: true, msg: user })
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//<---------------------------API : LoginUser---------------------------->//
const loginUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Body is empty can't find data" }) }
    if (!data.hasOwnProperty("email")) {
      if (!data.hasOwnProperty("phone")) { return res.status(400).send({ status: false, message: "please enter mobile no or email id to login" }) }
    }
    if (!data.hasOwnProperty("password")) { return res.status(400).send({ status: false, message: "please enter password to login" }) }
    let user = await UserModel.findOne({ $or: [{ email: data.email, password: data.password }, { phone: data.phone, password: data.password }] });

    if (!user) { return res.status(404).send({ status: false, msg: "no user found" }) }

    let token = jwt.sign(
      {
        ID: user._id.toString(),
        batch: "lithium",
        project: "BookManagement"
      },
      "project3-group9", { expiresIn: '1h' }
    )


    res.status(200).send({ status: true, message: token })
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
};
module.exports = { creatUser, loginUser };
