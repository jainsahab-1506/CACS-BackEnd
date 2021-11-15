const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
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
  attendedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

userSchema.virtual("event", {
  ref: "Event",
  localField: "registeredEvents", //Find in Model, where localField
  foreignField: "registeredUsers", // is equal to femailGroupSchema
});
userSchema.virtual("event", {
  ref: "Event",
  localField: "attendedEvents", //Find in Model, where localField
  foreignField: "attendedUsers", // is equal to femailGroupSchema
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = new mongoose.model("User", userSchema);
