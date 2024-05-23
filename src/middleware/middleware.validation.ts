import { Request, Response, NextFunction } from 'express';
import Joi, { SchemaMap } from 'joi';

const validate = (schema: Joi.ObjectSchema<SchemaMap>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

export default validate;
