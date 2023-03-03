const Contact = require("../models/Contact");
const { formatDate } = require("../utils/jalali");
const { get500 } = require("../controllers/errorControllers");

exports.getDashboard = async (req, res) => {
  let num = 0;
  try {
    const numberOfContacts = await Contact.find({
      user: req.user._id,
    }).countDocuments();

    const contacts = await Contact.find({ user: req.user._id }).sort({
      fullname: "asc",
    });

    res.render("contacts", {
      pageTitle: "داشبورد",
      path: "/dashboard",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      contacts,
      formatDate,
      numberOfContacts,
    });
  } catch (error) {
    console.log(error);
    get500(req, res);
  }
};

exports.getAddContact = (req, res) => {
  res.render("addContact", {
    pageTitle: "ایجاد مخاطب جدید",
    path: "/dashboard/add-contact",
    layout: "./layouts/dashLayout",
    fullname: req.user.fullname,
  });
};

exports.createContact = async (req, res) => {
  try {
    await Contact.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (err) {
    get500(req, res);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.id);
    console.log(result);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
};

exports.getEditContact = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id });

  if (!contact) {
    return res.redirect("/404");
  }

  if (contact.user.toString() != req.user._id) {
    return res.redirect("/dashboard");
  } else {
    res.render("editContact", {
      pageTitle: "ویرایش پست",
      path: "/dashboard/edit-contact",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      contact,
    });
  }
};

exports.editContact = async (req, res) => {
  const errorArr = [];

  const contact = await Contact.findOne({ _id: req.params.id });
  try {
    if (!contact) {
      return res.redirect("errors/404");
    }
    if (contact.user.toString() !== req.user.id) {
      return res.redirect("/dashboard");
    } else {
      const { fullname, phone, email } = req.body;
      contact.fullname = fullname;
      contact.phone = phone;
      contact.email = email;

      await contact.save();
      res.redirect("/dashboard");
    }
  } catch (err) {
    get500(req, res);
  }
};

exports.handleDashSearch = async (req, res, next) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
      $text: { $search: req.body.search },
    });

    res.render("contacts", {
      pageTitle: "داشبورد",
      path: "/dashboard",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      contacts,
      formatDate,
    });
  } catch (err) {
    console.log(err);
    get500(req, res);
  }
  next();
};
