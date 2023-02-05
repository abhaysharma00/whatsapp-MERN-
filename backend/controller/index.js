const user = require("../models/user");
const channels = require("../models/channels");

// create user
const createuser = async (req, res) => {
  const { email } = req.body;
  const response = await user.findOneData({
    email: email,
  });
  if (response.length) {
    res.json({ response, result: "user already exsit" });
  } else {
    const createduser = new user(req.body);
    try {
      await createduser.saveData();
      res.json(createduser);
    } catch (e) {
      res.json({ error: e });
    }
  }
};

// creating channel
// const createchannel = async (req, res) => {
//   const createdchannel = new channels(req.body);
//   await createdchannel.saveData();
//   res.json(createdchannel);
// };

const createchannel = async (req, res) => {
  const channelUsers = req.body.channelUsers;
  const firstUser = channelUsers[0];
  const secondUser = channelUsers[1];
  let isChannelAlreadyExist = false;
  let channelModel;

  const channelList = await channels.findData({
    "channelUsers.email": firstUser.email,
  });

  if (channelList && channelList.length) {
    channelList.forEach((channel) => {
      isChannelAlreadyExist = channel.channelUsers.find(
        (user) => user.email === secondUser.email
      );
      if (isChannelAlreadyExist) channelModel = channel;
    });
  }
  // console.log(isChannelAlreadyExist);

  if (isChannelAlreadyExist) return res.json(channelModel);

  channelModel = new channels(req.body);
  await channelModel.saveData();
  res.json(channelModel);
};

// getting channel-list
const getchannellist = async (req, res) => {
  const { email } = req.query;
  // console.log(email);
  try {
    const channellist = await channels.findData({
      "channelUsers.email": email,
    });
    res.json(channellist);
  } catch (e) {
    res.json(e);
  }
};

// search-user
const searchuser = async (req, res) => {
  const { email } = req.query;
  const result = await user.findOneData({
    email: email,
  });
  res.json(result);
};

// sending message
const sendmessage = async (req, res) => {
  const { channelID, messages } = req.body;
  // console.log(channelID);
  const response = await channels.findOneAndUpdateData(
    { _id: channelID },
    { $push: { messages: messages } }
  );
  res.json(response);
};

module.exports = {
  createchannel,
  createuser,
  searchuser,
  getchannellist,
  sendmessage,
};

// send-message
// const sendmessage = async (req, res) => {
//   const requestData = req.body;
//   console.log(requestData);
//   const response = await channels.findOneAndUpdate(
//     { _id: requestData.channelId },
//     {
//       $push: { messages: requestData.messages },
//     }
//   );
//   res.json(response);
// };
