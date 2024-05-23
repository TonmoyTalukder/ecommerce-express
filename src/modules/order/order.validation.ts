import Joi, { SchemaMap } from 'joi';

export const createOrderSchema: Joi.ObjectSchema<SchemaMap> = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
