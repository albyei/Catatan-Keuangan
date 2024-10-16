import { profile } from "console";
import { NextFunction, Request, Response } from "express";
import { request } from "http";
import Joi, { required } from "joi";
import { it } from "node:test";
import { emit } from "process";

const addDataSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).alphanum().required(),
  gender: Joi.string().valid(`MAN`,`WOMAN`).required(),
  dateBirth: Joi.date().required(),
  phoneNumber: Joi.string().pattern(/^[0-9+]*$/).required(), // Diubah dari Joi.number() menjadi Joi.string() dengan pattern
  postalCode: Joi.string().required(),
  alamat: Joi.string().required(),
  profile_picture: Joi.allow().optional(),
  role: Joi.string().valid(`CUSTOMER`, `ADMIN`).required(),
});

const addEditSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(3).alphanum().optional(),
  gender: Joi.string().valid(`MAN`,`WOMAN`).optional(),
  dateBirth: Joi.date().optional(),
  phoneNumber: Joi.number().optional(),
  postalCode: Joi.string().optional(),
  alamat: Joi.string().optional(),
  profile_picture: Joi.allow().optional(),
  role: Joi.string().valid(`CUSTOMER`, `ADMIN`).optional(),
});

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).alphanum().required(),
});

export const verifyAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = authSchema.validate(request.body, { abortEarly: false });
  if (error) {
    return response.status(400).json({
      status: false,
      message: error.details.map((it) => it.message).join(),
    });
  }
  return next();
};

export const verifyAddUser = (
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

export const verifyEditUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addEditSchema.validate(request.body, {
    abortEarly: false,
  });
  if (error) {
    return response
      .status(400)  
      .json({
        status: false,
        message: error.details.map((it) => it.message).join(),
      })
      .status(400);
  }
  return next();
};
