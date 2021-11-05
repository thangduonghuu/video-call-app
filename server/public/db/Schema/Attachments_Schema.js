const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttachmentsSchema = new Schema(
  {
    task_id: { type: Schema.Types.ObjectId , ref: "task"},
    projectowner: { type: Schema.Types.ObjectId, ref: "Project" },
    location: {type: "string"},
    nameType: {type: "string"},
    
    uploaded_at : { type: Date, default: Date.now },
  },
  { collection: "attrachment" }
);

const messages = new Schema ({
  // id_attachment: attachments.id_attachment,
  text: {type: "string"},
  create_at:  { type: Date, default: Date.now },
  is_pin : {type: "boolean"},
})

module.exports = mongoose.model("messages" , messages)
module.exports = mongoose.model("attachment", AttachmentsSchema);
