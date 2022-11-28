let validName = /[0-9]+/

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

module.exports = { validName,  validEmail,validMobile, validPass, validpincode,validTitle}