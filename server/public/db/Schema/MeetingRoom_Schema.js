const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meettingRoom = new Schema({
  // id_attachment: attachments.id_attachment,
  RoomName: { type: String, required: true },
  Owner: { type: Schema.Types.ObjectId, ref: "User" },
  Member: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("meettingRoom", meettingRoom);
