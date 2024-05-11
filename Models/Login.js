const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Add_User = new Schema(
  {
    UserName: {
      type: String,
    },
   
    Password: {
      type: String,
    },
   
  },
  { timestamps: true }
);
const AddUserModel = mongoose.model("Adduser", Add_User);
module.exports = AddUserModel;
