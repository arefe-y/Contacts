const passport = require("passport");

const User = require("../models/User");

exports.register = (req, res) => {
  res.render("register", {
    pageTitle: "ثبت نام کاربر جدید",
    path: "/register",
  });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, password, email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      errors.push({ message: "کاربری با این ایمیل موجود است" });
      return res.render("register", {
        pageTitle: "ثبت نام کاربر",
        path: "/register",
        errors,
      });
    }

    await User.create({ fullname, email, password });
    req.flash("success_msg", "ثبت نام موفقیت آمیز بود");
    res.redirect("/users/login");
  } catch (err) {
    err.errors.forEach((e) => {
      errors.push({
        name: e.path,
        message: e,
      });
    });

    return res.render("register", {
      pageTitle: "ثبت نام کاربر",
      path: "/register",
      errors,
    });
  }
};

exports.login = (req, res) => {
  res.render("login", {
    pageTitle: "ورود",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.expire = null;
  }

  res.redirect("/dashboard");
};

exports.logout = (req, res,next) => {
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err)
      }else{
        return res.redirect("/users/login")
      }
    })
  }
};
