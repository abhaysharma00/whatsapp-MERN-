// imports
const Express = require("express");
const user = require("../models/user");
const {
  createchannel,
  createuser,
  searchuser,
  getchannellist,
  sendmessage,
} = require("../controller/index");
const {
  validateCreateUser,
  validateCreateChannel,
  validateGetChannelList,
  validateSearchUser,
  validateAddMessage,
} = require("../utility/validations");

// router
const router = Express.Router();
//
router.post("/create", validateCreateUser, createuser);
router.get("/search-user", validateSearchUser, searchuser);
router.post("/channel", validateCreateChannel, createchannel);

router.get("/channel-list", validateGetChannelList, getchannellist);

router.post("/message", validateAddMessage, sendmessage);

module.exports = router;
