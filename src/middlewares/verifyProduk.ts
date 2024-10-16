import { NextFunction, Request, Response } from "express";
import { request } from "http";
import Joi, { string } from "joi";

const addDataSchema = Joi.object({
  namaProduk: Joi.string().required(),
  tarif: Joi.number().min(0).required(),
  Keterangan: Joi.string().optional(),
  user: Joi.optional()
});

const addEditSchema = Joi.object({
  namaProduk: Joi.string().optional(),
  tarif: Joi.number().min(0).optional(),
  Keterangan: Joi.string().optional(),
  user: Joi.optional()
});

export const verifyAddProduk = (
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

export const verifyEditProduk = (
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
