import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getAllCatatan = async (request: Request, response: Response) => {
  try {
    const allcatatan = await prisma.catatan.findMany({});
    return response
      .json({
        status: true,
        data: allcatatan,
        message: `financial records has Retrieved`,
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

export const createCatatan = async (request: Request, response: Response) => {
  try {
    const { id, type, amount, description } = request.body;

    const newCatatan = await prisma.catatan.create({
      data: { id, type, amount: Number(amount), description },
    });

    return response
      .json({
        status: true,
        data: newCatatan,
        message: `New financial records has Created`,
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

export const updatedCatatanKuangan = async (request: Request, response: Response) => {
  try {
    const {id} = request.params;
    const {type, amount,description} = request.body

    const findCatatan = await prisma.catatan.findFirst({
      where: { id: Number(id) },
    });
    if (!findCatatan)
      return response
        .status(200)
        .json({ status: false, message: `Financial records is Not found` });

    const updatedCatatan = await prisma.catatan.update({
      data: {
        type: type|| findCatatan.type,
        amount: amount ? Number(amount) : findCatatan.amount,
        description: description || findCatatan.description,
      },
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: updatedCatatan,
        message: `New financial records has Created`,
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


export const deleteCatatan = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findCatatan = await prisma.catatan.findFirst({
      where: { id: Number(id) },
    });
    if (!findCatatan) {
      return response
        .status(200)
        .json({ status: false, message: `is not found` });
    }

    const deleteCatatan = await prisma.catatan.delete({
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: deleteCatatan,
        message: `financial records has Deleted`,
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

export const hitungTotalCatatan = async (request: Request, response: Response) => {
  try {
    const { type } = request.query;

    // Validasi tipe transaksi
    if (!type || (type !== 'INCOME' && type !== 'EXPENSE')) {
      return response.status(400).json({
        message: 'Jenis transaksi tidak valid, hanya "income" atau "expense" yang diperbolehkan.',
      });
    }

    // Hitung total berdasarkan tipe transaksi
    const totalAmount = await prisma.catatan.aggregate({
      _sum: {
        amount: true, // Agregasi total nilai `amount`
      },
      where: {
        type, // Filter transaksi berdasarkan tipe
      },
    });

    // Cek jika tidak ada transaksi ditemukan
    if (!totalAmount._sum.amount === null) {
      return response.status(404).json({
        message: 'Astagfirullah, Tidak ada transaksi yang ditemukan untuk tipe ini.',
      });
    }

    // Respon dengan hasil total
    return response.status(200).json({
      message: 'Alhamdulillah,Total Calculated Successfully.',
      data: {
        type,
        totalAmount: totalAmount._sum.amount, // Ambil nilai hasil total
      },
    });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({
      message: 'Astagfirullah,Terjadi kesalahan saat menghitung total: ${error}',
    });
  }
};


