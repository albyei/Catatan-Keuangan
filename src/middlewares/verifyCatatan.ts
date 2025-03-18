import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { request } from "node:http";
import { describe } from "node:test";

/** create schema for detail of orderlist */

const addDataSchema = Joi.object({
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  amount: Joi.number().min(0).required(),
  description: Joi.string().required(),
});

const addEditSchema = Joi.object({
  type: Joi.string().valid("INCOME", "EXPENSE").optional(),
  amount: Joi.number().min(0).optional(),
  description: Joi.string().optional(),
});

export const verifyAddCatatan = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addDataSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

export const verifyEditCatatan = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addEditSchema.validate(request.body, { abortEarly: false });
  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};
