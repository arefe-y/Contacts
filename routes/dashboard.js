const { Router } = require("express");

const adminController = require("../controllers/adminController");
const { authenticated } = require("../middlewares/auth");
const { validatingContact } = require("../middlewares/Validators");

const router = new Router();

//GET /dashboard
router.get("/", authenticated, adminController.getDashboard);

// GET /dashboard/add-contact
router.get("/add-contact", authenticated, adminController.getAddContact);

//GET /dashboard/delete-contact/:id
router.get("/delete-contact/:id", adminController.deleteContact);

//GET /dashboard/edit-contact/:id
router.get("/edit-contact/:id", adminController.getEditContact);

//POST /dashboard/add-contact
router.post("/add-contact", validatingContact, adminController.createContact);

//POST /dashboard/edit-post
router.post("/edit-contact/:id", validatingContact, adminController.editContact);

//POST /dashboard/search
router.post("/search", authenticated, adminController.handleDashSearch);

module.exports = router;