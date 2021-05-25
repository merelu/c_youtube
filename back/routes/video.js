const express = require("express");
const { Video } = require("../models/Video");
const multer = require("multer");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");

const router = express.Router();

try {
  fs.readdirSync("back/uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("back/uploads");
}

try {
  fs.readdirSync("back/uploads/thumbnails");
} catch (error) {
  console.error("uploads/thumbnails 폴더가 없어 폴더를 생성합니다.");
  fs.mkdirSync("back/uploads/thumbnails");
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "back/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});
const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  //비디오를 서버에 저장한다.
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임도 가져오기
  let filePath = [];
  let fileDuration = "";

  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata); //all metadata
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  // 썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filenames.map((item, index) =>
        filePath.push("back/uploads/thumbnails/" + filenames[index])
      );
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      //Will take screenshots at 20%, 40%, 60%, and 80% of the video
      count: 3,
      folder: "back/uploads/thumbnails",
      size: "320x240",
      //'%b' : input basename (filename w/o extension)
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
