const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

emailGroupSchema.virtual("event", {
  ref: "Event",
  localField: "_id", //Find in Model, where localField
  foreignField: "registeredUsers", // is equal to femailGroupSchema
});

emailGroupSchema.set("toObject", { virtuals: true });
emailGroupSchema.set("toJSON", { virtuals: true });

module.exports = new mongoose.model("User", userSchema);
