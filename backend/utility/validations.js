const yup = require("yup");

module.exports = {
  validateCreateUser: async (req, res, next) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required(),
      profilepic: yup.string(),
    });
    await validate(schema, req.body, res, next);
  },

  // validating creation of channel
  validateCreateChannel: async (req, res, next) => {
    const schema = yup.object().shape({
      channelUsers: yup
        .array()
        .of(
          yup.object().shape({
            email: yup.string().required(),
            name: yup.string(),
            profilepic: yup.string(),
          })
        )
        .length(2)
        .required(),
    });
    await validate(schema, req.body, res, next);
  },

  //
  validateGetChannelList: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    try {
      await validate(schema, req.query, res, next);
    } catch (e) {
      res.json(e);
    }
  },

  validateSearchUser: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    await validate(schema, req.query, res, next);
  },

  validateAddMessage: async (req, res, next) => {
    const schema = yup.object().shape({
      channelID: yup.string().required(),
      messages: yup.object().shape({
        senderemail: yup.string().required(),
        message: yup.string().required(),
      }),
    });
    await validate(schema, req.body, res, next);
  },
};
const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    res.json(errors);
  }
};
