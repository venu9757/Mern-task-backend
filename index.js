const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// Middleware
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("Public"));

mongoose.set("strictQuery", false);
mongoose.set('bufferCommands', false);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is Connect "))
  .catch(() => console.log("DB is not Connected"));

// Routing Accoutt Register
const account = require("./Routes/Login");
app.use("/api/register", account);

// Routing Login Page
const LoginRouting = require("./Routes/Login");
app.use("/api/login", LoginRouting);

//  Get all Users

const allUsers = require("./Routes/Login");
app.use("/api/users", allUsers);

// Add Employee
const addEmployee = require("./Routes/AddEmployee");
app.use("/api/add", addEmployee);

// Get EmployeeDetails
const getEmployeeDetails = require("./Routes/AddEmployee");
app.use("/api/getemployee", getEmployeeDetails);

// Delete Employee
const deleteEmployeeDetails = require("./Routes/AddEmployee");
app.use("/api/del", deleteEmployeeDetails);

// Sort by 
const sortEmployee = require("./Routes/AddEmployee");
app.use("/api/getemployee",sortEmployee);

// Edit Employee
const editEmployee = require("./Routes/AddEmployee");
app.use("/api/getemployee",editEmployee);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on port => ${PORT}`);
});
