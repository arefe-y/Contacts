const Yup = require("yup");

exports.contactValidator = Yup.object().shape({
  fullname: Yup.string()
    .required("نام و نام خانوادگی الزامی میباشد")
    .min(5, "نام و نام خانوادگی نباید کمتر از 5 کاراکتر باشد")
    .max(100, "نام و نام خانوادگی نباید بیشتر از 100 کاراکتر باشد"),
  phone: Yup.string()
    .required("شماره تلفن الزامی میباشد")
    .min(11, "شماره تماس نباید کمتر از 11 کاراکتر باشد")
    .max(20, "شماره تماس نباید بیشتر از 20 کاراکتر باشد"),
  email: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل را وارد کنید"),
});
