let validname = /[0-9]+/

const validName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let validMobile=/^[0]?[6789]\d{9}$/

let validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

let validpincode=/^(\d{4}|\d{6})$/

const validTitle = (Title) => {
    let correctTitle = ["Mr", "Mrs", "Miss"];
    if (correctTitle.includes(Title)) {
      return false
    } else {
      return true;
    }
  }

//<---------------------------Validations :  ISBN------------------------------->//
const ValidISBN = function (ISBN) {
    const regexISBN =/^[0-9-]+$/;
      return regexISBN.test(ISBN);
  };
  
   //<---------------------------Validations :  category -------------------------->//
   const validcategory = function (category) {
    const regexcategory =/[a-zA-z]/;
      return regexcategory.test(category);
  };
    
   //<---------------------------Validations :  Time -------------------------->//
   const validTime = function (releasedAt) {
    const regexcategory =/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))+$/;
      return regexcategory.test(releasedAt);
  };


module.exports = { validName,validname,validEmail,validMobile, validPass, validpincode,validTitle,ValidISBN,validcategory,validTime}