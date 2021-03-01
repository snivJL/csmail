const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator");

// @route      GET api/messages
// @desc       GET all messages
// @access     Private
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ from: req.user }, { to: req.user }],
    })
      .populate("from")
      .populate("to");
    res.json({ messages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "SErver error" });
  }
});

// @route      POST api/messages
// @desc       Create a message
// @access     Private
router.post(
  "/",
  auth,
  [
    check("content", "Must have a content").exists(),
    check("title", "Must have a title").exists(),
    check("from", "Must have a from").exists(),
    check("to", "Must have a to").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { title, content, from, to } = req.body;

      let sender = await User.findById(from);
      let receiver = await User.findOne({ email: to });
      if (!sender || !receiver)
        return res.status("404").json("User not defined");

      const message = await Message.create({
        from,
        to: receiver._id,
        title,
        content,
      });
      res.json({ message });
    } catch (error) {
      console.error(error.message);
      console.log(req.body);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route      GET api/messages/:id
// @desc       Get a single message
// @access     Private
router.get("/:id", auth, async (req, res) => {
  const msgId = req.params.id;
  try {
    let message = await Message.findById(msgId).populate("from").populate("to");
    if (!message) return res.status(400).json({ msg: "Message not found" });
    message = await Message.findByIdAndUpdate(
      msgId,
      { $set: { status: "seen" } },
      { new: true }
    )
      .populate("from")
      .populate("to");
    res.json({ message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route      UPDATE api/messages/:id
// @desc       Update a  user
// @access     Public
router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;
  const messageFields = {};

  if (title) messageFields.title = title;
  if (content) messageFields.content = content;

  const msgId = req.params.id;
  try {
    let message = await Message.findById(msgId);
    if (!message) res.status(400).json({ msg: "Message not found" });

    //Check if user owns the message
    if (message.from.toString() !== req.user)
      return res.status(401).json({ msg: "Unauthorized" });

    message = await Message.findByIdAndUpdate(
      msgId,
      { $set: messageFields },
      { new: true }
    );
    res.json({ message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

// @route      DELETE api/messages/:id
// @desc       Delete a  message
// @access     Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);
    if (!message) res.status(400).json({ msg: "Message not found" });

    //Check if user can delete message
    if (message.from.toString() !== req.user)
      return res
        .status(401)
        .json({ msg: "Not authorized", req: req.user, message });

    await Message.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },
      { new: true }
    );
    res.json({ message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
