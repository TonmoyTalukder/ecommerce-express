import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(
        Joi.object({
            type: Joi.string().required(),
            value: Joi.string().required(),
        })
    ),
    inventory: Joi.object({
        quantity: Joi.number().required(),
        inStock: Joi.boolean(),
    }).required(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(
        Joi.object({
            type: Joi.string().required(),
            value: Joi.string().required(),
        })
    ),
    inventory: Joi.object({
        quantity: Joi.number(),
        inStock: Joi.boolean(),
    }),
});
