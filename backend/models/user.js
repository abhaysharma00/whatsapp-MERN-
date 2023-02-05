const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name cannot be blank"] },
  email: {
    type: String,
    required: [true, "name cannot be blank"],
    unique: true,
  },
  profilepic: { type: String, default: "" },
  addedOn: { type: Number, default: Date.now() },
});

userSchema.method({
  saveData: async function () {
    return this.save();
  },
});

userSchema.static({
  findData: function (findobj) {
    return this.find(findobj);
  },

  findOneData: function (findobj) {
    return this.find(findobj);
  },
  findOneAndUpdate: function (findobj, updateObj) {
    return this.findOneAndUpdate(findobj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  },
});

module.exports = mongoose.model("user", userSchema);
