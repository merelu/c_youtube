const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.get("/getComments/:videoId", (req, res) => {
  Comment.find({ videoId: req.params.videoId })
    .populate("writer", "isAuth isAdmin name email lastname role image")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, comments });
    });
});

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate("writer", "isAuth isAdmin name email lastname role image")
      .exec((err, comment) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, comment });
      });
  });
});

module.exports = router;
