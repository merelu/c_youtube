const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

router.get("/subscribeNumber/:userTo", (req, res) => {
  Subscriber.find({ userTo: req.params.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.get("/subscribed/:userTo/:userFrom", (req, res) => {
  Subscriber.find({
    userTo: req.params.userTo,
    userFrom: req.params.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).json({ success: false, err });
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subscribed: result });
  });
});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.delete("/unSubscribe/:userTo/:userFrom", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.params.userTo,
    userFrom: req.params.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
