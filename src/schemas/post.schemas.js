import Joi from 'joi';

export const schema = Joi.object({
  userid: Joi.number().required(),
  photo: Joi.string().required(),
  description: Joi.string().required()
});
