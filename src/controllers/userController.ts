import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, SECRET } from "../global";
import fs from "fs";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { request } from "http";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getAllUser = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const alluser = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    return response
      .json({
        status: true,
        data: alluser,
        message: `User Has Retrivied`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `User is an error. ${error}`,
      })
      .status(400);
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      dateBirth,
      phoneNumber,
      postalCode,
      alamat,
      profil_picture,
      role,
    } = request.body;
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        uuid,
        name,
        email,
        password: md5(password),
        gender,
        dateBirth,
        phoneNumber,
        postalCode,
        alamat,
        profil_picture,
        role,
      },
    });

    return response
      .json({
        status: true,
        data: newUser,
        message: `New User has Created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        messasge: `There is an error.${error}`,
      })
      .status(400);
  }
};

export const updatedUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const {
      name,
      email,
      password,
      gender,
      dateBirth,
      phoneNumber,
      postalCode,
      alamat,
      profil_picture,
      role,
    } = request.body;
    const updatedUser = await prisma.user.update({
      where: { idUser: Number(id) },
      data: {
        name,
        email,
        password,
        gender,
        dateBirth,
        phoneNumber,
        postalCode,
        alamat,
        profil_picture,
        role,
      },
    });

    return response
      .json({
        status: true,
        data: updatedUser,
        message: " User Has Update Successfully",
      })
      .status(200);
  } catch (error) {
    return response.json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

export const deleteAllUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deleteAllUser = await prisma.user.delete({
      where: { idUser: Number(id) },
    });
    return response
      .json({
        status: true,
        data: deleteAllUser,
        message: "User has deleted succesfully",
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const profileUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findUser = await prisma.user.findFirst({
      where: { idUser: Number(id) },
    });
    if (!findUser) {
      return response.json({ status: false, message: "User Not Found" });
    }

    let filename = findUser.profil_picture;

    if (request.file) {
      filename = request.file.filename;
      let path = `${BASE_URL}/public/profil_picture/${filename}`;
      let exists = fs.existsSync(path);
      if (exists && findUser.profil_picture !== ``) {
        fs.unlinkSync(path);
      }
    }

    const updateUser = await prisma.user.update({
      where: { idUser: Number(id) },
      data: {
        profil_picture: filename,
      },
    });

    return response
      .json({
        status: true,
        data: updateUser,
        message: "User has Retrivied Successfully",
      })
      .status(200);
  } catch (error) {
    return response.json({
      status: false,
      message: `There is an error. ${error}`,
    });
  }
};

export const authentication = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const findUser = await prisma.user.findFirst({
      where: { email, password: md5(password) },
    });

    if (!findUser)
      return response.status(200).json({
        status: false,
        logget: false,
        message: `Invalid Email or Password`,
      });

    let data = {
      id: findUser.idUser,
      name: findUser.name,
      email: findUser.email,
      gender: findUser.gender,
      dateBirth: findUser.dateBirth, // Diberikan sebagai integer
      phoneNumber: findUser.phoneNumber,
      postalCode: findUser.postalCode,
      alamat: findUser.alamat,
      role: findUser.role,
    };

    let payLoad = JSON.stringify(data);
    let token = sign(payLoad, SECRET || "token");

    return response
      .json({
        status: true,
        logged: true,
        message: `User has Logged in Successfully`,
        token,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};
