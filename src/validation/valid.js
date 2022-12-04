const mongoose = require("mongoose");

//=========================== Validations : User =================================//
//<---------------------------Validations :  Title------------------------------->//
const validTitle = (Title) => {
  let correctTitle = ["Mr", "Mrs", "Miss"];
  if (correctTitle.includes(Title)) return false
  else return true;
}
//<---------------------------Validations :  Name-------------------------------->//
let validName = /[a-zA-Z ]/

//<---------------------------Validations :  Mobile------------------------------>//
let validMobile=/^[0]?[6789]\d{9}$/

//<---------------------------Validations :  EmailId----------------------------->//
let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//<---------------------------Validations :  Passworld--------------------------->//
let validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

//<---------------------------Validations :  PinCode----------------------------->//
let validpincode=/^[1-9]{1}[0-9]{5}$/ 



//=========================== Validations : Book ================================//
//<--------------------------Validations : Title Books-------------------------->//
const validTitleBooks=/^[a-zA-Z ]{5,}[a-zA-z0-9]+$/

//<--------------------------Validations : Title Books-------------------------->//
const valiTitleBooks=/^[a-zA-Z ]{5,}[a-zA-z0-9]+$/


//<---------------------------Validations :  ISBN------------------------------->//
const ValidISBN = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
  
   //<---------------------------Validations :  category -------------------------->//
   const validcategory = /[a-zA-z]/
    
   //<---------------------------Validations :  Time -------------------------->//
   const validTime = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))+$/
   
//<---------------------------Validations :  ObjectId------------------------------->//
const ValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
}
//============================================================Validations :  string======================================
const validString = (String) => {
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(String)
}
//================================================================Number========================================================
function IsNumeric(input){
  var RE = /^-{0,1}\d*\.{0,1}\d+$/;
  return (RE.test(input));
}


module.exports = { validTitle, validName, validMobile, validEmail, validPass, validpincode, 
  validName, ValidISBN,validcategory,validTime,validTitleBooks,ValidObjectId,validString,IsNumeric }