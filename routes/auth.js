const express = require("express");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// @route      GET api/auth
// @desc       Get a user
// @access     Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route      POST api/auth
// @desc       Log in a user
// @access     Public

router.post(
  "/",
  [
    check("password", "Password is required").exists(),
    check("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400), json({ errors: errors.array() });
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(401).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

      const payload = { user: user._id };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (error) {
      console.error(error.message);
      return status(500).send("Server error");
    }
  }
);

module.exports = router;
