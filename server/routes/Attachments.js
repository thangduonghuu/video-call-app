var express = require("express");
var router = express.Router();
const Attachments_Schema = require("../public/db/schema/Attachments_Schema");
const upload = require("../public/db/functionForDB/upload")
var PORT = process.env.PORT || "http://localhost:4000";
// });

/* GET home page. */
router.post("/", async (req, res) => {
  let request = req.body;
  let ListAttachment = await Attachments_Schema.find({
    projectowner: request.projectowner,
  });
  res.send(ListAttachment);
});

router.post("/save_a_file", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `${PORT}/photo/${req.file.filename}`;
  return res.send(imgUrl);
});

router.post("/save_a_file", (req, res) => {
  let findProject = req.body;
  let idJob = job.find({ projectowner: findProject.projectowner });
  res.send(idJob);
});

router.post("/delete_a_file", async (req, res) => {
  let request = req.body;
  let findProjectAndItem = await Attachments_Schema.find({
    projectowner: request.projectowner,
    _id: request.deleteItem,
  });
  console.log(findProjectAndItem);
  if (findProjectAndItem.length > 0) {
    await Attachments_Schema.findOneAndDelete(
      request.deleteItem,
      (err, deleteRecol) => {
        if (err) {
          return res.status(500).json({status: false});
        } else {
          res.status(200).json({status: true});
        }
      }
    );
  }
  else{
    return res.status(500).json("xoa that bai");
  }
});

module.exports = router;
