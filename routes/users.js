const express = require("express");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/User");
const router = express.Router();

// @route      GET api/users
// @desc       GET all users
// @access     Private
router.get("/", (req, res) => {});

// @route      POST api/users
// @desc       Create a user
// @access     Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password of 3 or more characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: user._id };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route      GET api/users/:id
// @desc       Get a single user
// @access     Private
router.get("/me", auth, async (req, res) => {
  console.log(req.user);
  const userId = req.user;
  try {
    user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (req.user !== userId)
      return res.status(401).json({ msg: "Unauthorized" });

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route      UPDATE api/users/:id
// @desc       Update a  user
// @access     Private
router.put("/:id", auth, async (req, res) => {
  const { name, password } = req.body;
  const userFields = {};
  if (name) userFields.name = name;
  if (password) userFields.password = password;

  const userId = req.params.id;
  try {
    user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (req.user !== userId)
      return res.status(401).json({ msg: "Unauthorized" });

    user = await User.findByIdAndUpdate(
      userId,
      { $set: userFields },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route      DELETE api/users/:id
// @desc       delete a  user
// @access     Private
router.delete("/:id", (req, res) => {
  res.send("user deleted!");
});

module.exports = router;
