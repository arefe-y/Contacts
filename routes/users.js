const { Router } = require("express");

const userController = require("../controllers/userController");
const router = new Router();

// GET users/register
router.get("/register", userController.register);

//GET users/login
router.get("/login", userController.login);

router.get("/logout",userController.logout)

//POST users/register
router.post("/register", userController.createUser);

//POST users/login
router.post("/login", userController.handleLogin, userController.rememberMe);



module.exports = router;
