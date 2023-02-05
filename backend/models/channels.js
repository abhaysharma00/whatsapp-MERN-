const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  channelUsers: {
    type: [
      {
        email: { type: String, default: "" },
        name: { type: String, default: "" },
        profilepic: { type: String, default: "" },
      },
    ],
    unique: true,
  },
  messages: [
    {
      senderemail: { type: String, default: "" },
      message: { type: String, default: "" },
      addedOn: { type: Number, default: Date.now() },
    },
  ],
  addedOn: { type: Number, default: Date.now() },
});

channelSchema.method({
  saveData: async function () {
    return this.save();
  },
});

channelSchema.static({
  findData: function (findobj) {
    return this.find(findobj);
  },

  findOneData: function (findobj) {
    return this.find(findobj);
  },

  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
});

module.exports = mongoose.model("channels", channelSchema);
