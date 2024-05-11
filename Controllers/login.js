const LoginModel = require("../Models/Login");
const bcrypt = require("bcrypt");
class Login {
  async AccountRegister(req, res) {
    let { UserName, Password } = req.body;
    try {
      if (!UserName || !Password) {
        return res.status(400).json({ error: "Both fields are mandatory...!" });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      const Adminuser = new LoginModel({
        UserName,
        Password: hashedPassword,
      });
      Adminuser.save().then((data) => {
        return res
          .status(200)
          .json({ success: "Account Registered Successfully...!" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async accountLogin(req, res) {
    let { UserName, Password } = req.body;
    try {
      if (!UserName || !Password) {
        return res.status(400).json({ error: "Both fields are mandatory...!" });
      }
      const isUserPresent = await LoginModel.findOne({
        UserName: UserName,
      });
      console.log(isUserPresent.Password);
      if (!isUserPresent) {
        return res
          .status(400)
          .json({ error: "Your UserName  is not register for Login...!" });
      }

      // Compare password
      const isCorrectPassword = bcrypt.compare(
        Password,
        isUserPresent.Password
      );

      console.log(Password);
      console.log(isCorrectPassword);
      if (!isCorrectPassword) {
        return res.status(400).json({
          error: "Authondation Failed...! Your password is not correct",
        });
      }

      return res
        .status(200)
        .json({ success: "Login Successfully..", details: isUserPresent });
    } catch (error) {
      return res.status(400).json({ error: "server Error" });
    }
  }

  async getalluser(req, res) {
    try {
      const users = await LoginModel.find({});
      if (users) {
        return res.status(200).json({ users: users });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const LoginController = new Login();
module.exports = LoginController;
