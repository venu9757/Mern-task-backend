const { Message } = require("@material-ui/icons");
const AddEmployeeModel = require("../Models/AddEmployee");
const bcrypt = require("bcryptjs");

class addingEmployee {
  async add(req, res) {
    let {
      Name,
      MobileNo,
      Email,
      password,
      Designation,
      isActive,
      Gender,
      Course,
      CreateDate,
    } = req.body;

    let file1 = req.files[0]?.filename;

    try {
      const isUserPresent = await AddEmployeeModel.findOne({ Email: Email });
      if (isUserPresent) {
        return res.status(400).json({ error: "Email is Already Exists....!" });
      }

      const isUserMobilePresent = await AddEmployeeModel.findOne({
        MobileNo: MobileNo,
      });
      if (isUserMobilePresent) {
        return res
          .status(400)
          .json({ error: "Mobile Number is Already Exists..!" });
      }
      const AddUser = new AddEmployeeModel({
        Name,
        MobileNo,
        Email,
        password,
        Designation,
        isActive,
        Gender,
        Course,
        CreateDate,
        Image: file1,
      });
      AddUser.save().then((data) => {
        return res.status(200).json({ success: "Added User Successfully" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getalluser(req, res) {
    try {
      const employeelist = await AddEmployeeModel.find({});
      if (employeelist) {
        return res.status(200).json({ employeelist: employeelist });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteEmployee(req, res) {
    try {
      const id = req.params.id;
      const deleted = await AddEmployeeModel.deleteOne({ _id: id });
      if (deleted?.deletedCount > 0) {
        return res.status(200).json({ success: "Successfully deleted" });
      }
      return res
        .status(400)
        .json({ error: "Content not deleted!!! Something went wrong!!!" });
    } catch (error) {
      console.log(error);
    }
  }

  async sortBy(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const sortField = req.query.sort || "Name";
      const sortOrder = req.query.order || "asc";
  
      let query = {};
  
      // Search query
      if (search) {
        query = {
          $or: [
            { Name: { $regex: search, $options: "i" } },
            { Email: { $regex: search, $options: "i" } },
            { MobileNo: { $regex: search, $options: "i" } },
            { Course: { $regex: search, $options: "i" } },
            { Gender: { $regex: search, $options: "i" } },
            { Designation: { $regex: search, $options: "i" } },
          ],
        };
      }
  
      // Sorting
      let sortOption = {};
      sortOption[sortField] = sortOrder === "asc" ? 1 : -1;
  
      // Pagination
      const skip = (page - 1) * limit;
  
      const employees = await AddEmployeeModel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
      
      const totalEmployees = await AddEmployeeModel.countDocuments(query);
  
      return res.status(200).json({
        success: true,
        employees: employees,
        totalEmployees: totalEmployees,
        currentPage: page,
        totalPages: Math.ceil(totalEmployees / limit),
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  }

  async editEmployee(req, res) {
    try {
      const id = req.params.id;
      const { Name, Email, MobileNo, Designation, Gender, Course, Image } = req.body;

      // Validate inputs
      if (!Name || !Email || !MobileNo || !Designation || !Gender || !Course) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }

      // Validate mobile number format
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(MobileNo)) {
        return res.status(400).json({ error: "Invalid mobile number format." });
      }

      // Find employee by ID and update details
      const employee = await AddEmployeeModel.findByIdAndUpdate(id, {
        Name,
        Email,
        MobileNo,
        Designation,
        Gender,
        Course,
        Image
      }, { new: true });

      if (!employee) {
        return res.status(404).json({ error: "Employee not found." });
      }

      res.status(200).json({ success: "Employee details updated successfully.", employee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}


  


const AddEmployeeController = new addingEmployee();
module.exports = AddEmployeeController;
