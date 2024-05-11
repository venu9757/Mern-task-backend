const express = require("express");
const router = express.Router();
const AddUserController = require("../Controllers/login");

router.post("/userlogin", AddUserController.accountLogin);
router.post("/Adminreg", AddUserController.AccountRegister);
router.post("/allusers", AddUserController.getalluser);
module.exports = router;
