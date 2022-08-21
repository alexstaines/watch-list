const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

// @route POST API/Users
// @desc Test route
// @access Public
router.post(
  "/",
  [
    check("username", "Username is required.").not().isEmpty(),
    check("password", "Please enter password. (min 6 characters)").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    const { username, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ username });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        username,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get("jwtToken"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log(token);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET API/Users
// @desc All users with visibile lists
// @access Public
router.get("/", async (req, res) => {
  try {
    //leave off password in data
    const user = await User.find({visibility: true}).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
