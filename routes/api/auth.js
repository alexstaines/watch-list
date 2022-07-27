const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

// @route Get API/Auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    //leave off password in data
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route POST API/Auth
// @desc Authenticate user & get token
// @access Public
router.post(
    "/",
    [
      check("username", "Username is required.").not().isEmpty(),
      check("password", "Please enter password.").exists(),
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
  
        if (!user) {
          return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }
  
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

module.exports = router;
