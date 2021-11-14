var express = require("express");
var router = express.Router();
var RoomMeeting = require("../public/db/Schema/MeetingRoom_Schema")
router.post('/CreateMeetingRoom'  , async (req, res) => {
    let request = req.body;
    let newMeeting = new RoomMeeting({
        RoomName: request.RoomName,
        Owner : request.Owner,
    })
    await newMeeting.save((err, modal) => {
        if(err) {
            res.send({isSuccess: false})
        }
        else{
            res.send({isSuccess: true, roomId: modal.RoomName})
        }
    })
})

module.exports = router;