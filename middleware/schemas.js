const Joi = require("joi");

const userValidation = (data) => {
  const usersSchema = Joi.object()
    .keys({
      first_name: Joi.string().min(3).required(),
      last_name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    .unknown();
  return usersSchema.validate(data);
};

const loginValidation = (data) => {
  const loginSchema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    .unknown();
  return loginSchema.validate(data);
};

const vaccineValidation = (data) => {
  const pattern = "^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$"
  const vaccineSchema = Joi.object()
    .keys({
      name: Joi.string().min(3).required(),
      expected_date: Joi.string()
        .regex(RegExp(pattern)),
      vaccinated: Joi.bool(),
      userid: Joi.number().required(),
    })
    .unknown();
  return vaccineSchema.validate(data);
};

module.exports = {
  userValidation,
  vaccineValidation,
  loginValidation,
};
