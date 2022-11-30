const mongoose = require("mongoose");

let validname = /[0-9]+/



let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let validMobile=/^[0]?[6789]\d{9}$/

let validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

let validpincode=/^(\d{4}|\d{6})$/

//<---------------------------Validations :  Name------------------------------->//

const validName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

//<---------------------------Validations :  Title------------------------------->//
const validTitle = (Title) => {
let correctTitle = ["Mr", "Mrs", "Miss"];
    if (correctTitle.includes(Title)) return false 
      else return true;
  }
  
//<--------------------------Validations : Title Books------------------------->//
const validTitleBooks=function(title){
  const regexTittle=/^[a-zA-Z ]{5,}[a-zA-z0-9]+$/;
  return regexTittle.test(title)
}

//<---------------------------Validations :  ISBN------------------------------->//
const ValidISBN = function (ISBN) {
  const regexISBN =/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return regexISBN.test(ISBN);
};
  
   //<---------------------------Validations :  category -------------------------->//
   const validcategory = function (category) {
    const regexcategory =/[a-zA-z]/;
      return regexcategory.test(category);
  };

  //<---------------------------Validations :  ObjectId------------------------------->//
  const validString = function (String) {
    const regexString =/\d/;
      return regexString.test(String);
  };
    
   //<---------------------------Validations :  Time -------------------------->//
   const validTime = function (releasedAt) {
    const regexcategory =/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))+$/;
      return regexcategory.test(releasedAt)
  };
//<---------------------------Validations :  ObjectId------------------------------->//
const ValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
}


module.exports = { validName,validname,validEmail,validMobile, validPass, validpincode,validTitle,ValidISBN,validcategory,validTime,validTitleBooks,ValidObjectId,validString }