const mongoose = require("mongoose");

const rsvpSchema = mongoose.Schema({
  name: {
    type: "string",
    required: "true",
  },
  surname: {
    type: "string",
    required: "true",
  },
  cuisines: {
    type: [],
    required: "true",
  },
  time: {
    type: "number",
    required: "true",
  },
  attendance: {
    type: "boolean",
    required: "true",
  },
});
module.exports = mongoose.model("guestList", rsvpSchema);
