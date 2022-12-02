const mongoose = require("mongoose");


//================================================================valid-name==================================================
const validName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}
//=========================================================user -validation ====================================================
let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let validMobile=/^[0]?[6789]\d{9}$/

let validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

let validpincode=/^[1-9]{1}[0-9]{5}$/

let validname = /[0-9]+/

//=========================================================Validations :  Title===================================================
const validTitle = (Title) => {
let correctTitle = ["Mr", "Mrs", "Miss"];
    if (correctTitle.includes(Title)) {
      return false
    } else {
      return true;
    }
  }


//=============================================Validations : Title Books=========================================================
const validTitleBooks=function(title){
  const regexTittle=/^[a-zA-Z ]{5,}|[a-zA-z0-9]+$/;
  return regexTittle.test(title)
}

//================================================Validations :  ISBN============================================================
const ValidISBN = function (ISBN) {
  const regexISBN =/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return regexISBN.test(ISBN);
};
  
//============================================Validations :  category ==========================================================
   const validcategory = function (category) {
    const regexcategory =/[a-zA-z]/;
      return regexcategory.test(category);
  };
    
   //=================================================Validations :  Time ======================================================
   const validTime = function (releasedAt) {
    const regexcategory =/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))+$/;
      return regexcategory.test(releasedAt)
  };
//=====================================================Validations :  ObjectId==================================================
const ValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
}
//============================================================Validations :  string=============================================
const validString = (String) => {
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(String)
}
//================================================================Number========================================================
function IsNumeric(input){
  var RE = /^-{0,1}\d*\.{0,1}\d+$/;
  return (RE.test(input));
}

module.exports = { validName,validname,validEmail,validMobile, validPass, validpincode,validTitle,ValidISBN,validcategory,validTime,validTitleBooks,ValidObjectId,validString,IsNumeric }