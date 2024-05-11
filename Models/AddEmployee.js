const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Add_Employee = new Schema(
  {
    Name: {
      type: String,
    },
    MobileNo: {
      type: Number,
    },
    Email: {
      type: String,
    },
    Designation: {
      type: String,
    },
    Gender: {
      type: String,
    },
    Course:{
      type:String,
    }
    ,
    CreateDate:{
        type:Date,
    },
    Image :{
        type:String,
  },
  
 },
 { timestamps: true }
);
const AddEmployeeModel = mongoose.model("AddEmployee", Add_Employee);
module.exports = AddEmployeeModel;
