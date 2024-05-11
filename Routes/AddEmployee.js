const express = require("express");
const router = express.Router();
const AddEmployeeController = require("../Controllers/AddEmployee");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/adduser");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/adduser", upload.any(), AddEmployeeController.add);
router.get("/getallusers", AddEmployeeController.getalluser);
router.delete("/employees/:id", AddEmployeeController?.DeleteEmployee);
// Route to handle sorting and pagination
router.get('/sortBy', AddEmployeeController.sortBy);
router.put('/edit/:id',upload.any(), AddEmployeeController.editEmployee);
module.exports = router;
