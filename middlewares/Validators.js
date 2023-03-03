const contactValidator =
  require("../models/secure/contsctValidation").contactValidator;
const Contact = require("../models/Contact");

let validatingContact = async (req, res, next) => {
  try {
    const { email } = req.body;
    const contact = await Contact.findOne({ email });
    if (!contact) {
      await contactValidator.validate(
        {
          fullname: req.body.fullname,
          phone: req.body.phone,
          email: req.body.email,
        },
        { abortEarly: false }
      );
      next();
    } else {
      const errorArr = [];
      errorArr.push({
        message:"ایمیل تکراری است"
      })
      res.render("addContact", {
        pageTitle: "ایجاد مخاطب جدید",
        path: "/dashboard/add-contact",
        layout: "./layouts/dashLayout",
        fullname: req.user.fullname,
        errors:errorArr
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { validatingContact };
