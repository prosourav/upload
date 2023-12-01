const { Router } = require("express");
const router = Router();
const upload = require("../services/uploader");
const { s3Uploader, getFileStream } = require("../services/s3bucket");


// const { s3Uploader, getFileStream } = require("../services/s3bucket");


router.post("/files", upload.single("avatar"), async (req, res, next) => {
  try {
    // console.log("Uploading", req.file);
    // res.send("File upload successful")
    const data = await s3Uploader(req.file.buffer, req.file.originalname);
    console.log(">>>>>", data);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

router.get("/files/:key", (req, res, next) => {
  try {
    const data = getFileStream(req.params.key.trim());
    data.pipe(res);
    // res.send("ok");
  } catch (err) {
    next(err)
  }
});

// router.post("/files", upload.array("avatar", 3), (req, res, next) => {
//   try {
//     console.log(req.file);

//     res.send("File uploaded successfully.");
//   } catch (err) {
//     next(err);
//   }
// });

// const fields=[
//   {
//     name:"avatar",
//     maxCount:1
//   },
//   {
//     name:"docs",
//     maxCount:3
//   }
// ]
// router.post("/files", upload.fields(fields), (req, res, next) => {
//   try {
//     console.log(req.files);

//     res.send("File uploaded successfully.");
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
