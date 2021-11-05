var express = require('express');
var router = express.Router();
const multer  = require('multer')
const Attachments_Schema = require('../public/db/schema/Attachments_Schema')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({storage}).array('file');
/* GET home page. */
router.get('/',  (req, res) => {
    let request = req.body;
    // let ListAttachment = Attachments_Schema.find({})
});

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.files)
    })
});

module.exports = router;