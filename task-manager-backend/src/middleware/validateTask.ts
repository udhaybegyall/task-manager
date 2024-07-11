import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('To Do', 'In Progress', 'Done'),
  // user: Joi.string().required()
});

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    next();
}