const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.get("/getComments/:videoId", (req, res) => {
  Comment.find({ videoId: req.params.videoId }).exec((err, comments) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, comments });
  });
});

module.exports = router;
