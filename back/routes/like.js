const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId };
  } else {
    body = { commentId: req.body.commentId };
  }
  Like.find(body).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId };
  } else {
    body = { commentId: req.body.commentId };
  }
  Dislike.find(body).exec((err, dislikes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/uplike", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    body = { commentId: req.body.commentId, userId: req.body.userId };
  }
  const like = new Like(body);
  like.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });

    Dislike.findOneAndDelete(body).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unlike", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    body = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Like.findOneAndDelete(body).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    body = { commentId: req.body.commentId, userId: req.body.userId };
  }
  const dislike = new Dislike(body);
  dislike.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });

    Like.findOneAndDelete(body).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  let body = {};
  if (req.body.videoId) {
    body = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    body = { commentId: req.body.commentId, userId: req.body.userId };
  }
  Dislike.findOneAndDelete(body).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
