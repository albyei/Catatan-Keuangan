import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
// import {BASE_
import { request } from "http";
import { number } from "joi";
import { create } from "domain";
import { BASE_URL } from "../global";
import  fs  from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getAllProduk = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allproduk = await prisma.produk.findMany({
      where: { namaProduk: { contains: search?.toString() || "" } },
    });
    return response
      .json({
        status: true,
        data: allproduk,
        message: `Menus has Retrieved`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `there is an error. ${error}`,
      })
      .status(400);
  }
};

export const createProduk = async (request: Request, response: Response) => {
  try {
    const { namaProduk, Keterangan, tarif } = request.body;
    const uuid = uuidv4();

    const newProduk = await prisma.produk.create({
      data: { uuid, namaProduk, Keterangan, tarif: Number(tarif) },
    });

    return response
      .json({
        status: true,
        data: newProduk,
        message: `New Produk has Created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error.${error}`,
      })
      .status(400);
  }
};

export const updatedProduk = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { namaProduk, Keterangan, tarif } = request.body;

    const findProduk = await prisma.produk.findFirst({
      where: { id: Number(id) },
    });
    if (!findProduk)
      return response
        .status(200)
        .json({ status: false, message: `Produk is Not found` });

    const updatedProduk = await prisma.produk.update({
      data: {
        namaProduk: namaProduk || findProduk.namaProduk,
        tarif: tarif ? Number(tarif) : findProduk.tarif,
        Keterangan: Keterangan || findProduk.Keterangan,
      },
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: updatedProduk,
        message: `New Produk has Update`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `there is an error.${error}`,
      })
      .status(400);
  }
};

export const changePicture = async (request: Request, response: Response) => {
  try {
    //get id of menus id that sent in parameter of URl
    const { id } = request.params;
    //make sure that data is exits in database

    const findMenu = await prisma.produk.findFirst({ where: { id: Number(id) } });
    if (!findMenu)
      return response
        .status(200)
        .json({ status: false, message: `menu is not found` });

    let filename = findMenu.picture;
    if (request.file) {
      filename = request.file.filename;
      let path = `${BASE_URL}/../public/produk_picture/${findMenu.picture}`;
      let exists = fs.existsSync(path);
      //delete the old exists picture if //existsync untuk mencari tahu file
      if (exists && findMenu.picture !== ``) fs.unlinkSync(path); //untuk menghapus
    }
    /** process to update picture in database */
    const updatedPicture =  await prisma.produk.update ({
      data: {picture: filename},
      where: {id: Number(id)}
    })

    return response.json({
      status: true,
      data: updatedPicture,
      message: `Picture Has Updated`,
    }).status(200)

  } catch (error) {
    return response.json({
        status: false,
        message: `There is Error. ${error}`,
      }).status(400)
  }
};

export const deleteProduk = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findProduk = await prisma.produk.findFirst({
      where: { id: Number(id) },
    });
    if (!findProduk)
      return response
        .status(200)
        .json({ status: false, message: `is not found` });

    const deleteProduk = await prisma.produk.delete({
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: deleteProduk,
        message: `Produk has Deleted`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `there is an error.${error}`,
      })
      .status(400);
  }
};
