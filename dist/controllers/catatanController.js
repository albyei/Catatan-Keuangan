"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hitungTotalCatatan = exports.deleteCatatan = exports.updatedCatatanKuangan = exports.createCatatan = exports.getAllCatatan = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ errorFormat: "pretty" });
const getAllCatatan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allcatatan = yield prisma.catatan.findMany({});
        return response
            .json({
            status: true,
            data: allcatatan,
            message: `financial records has Retrieved`,
        })
            .status(200);
    }
    catch (error) {
        return response
            .json({
            status: false,
            message: `there is an error. ${error}`,
        })
            .status(400);
    }
});
exports.getAllCatatan = getAllCatatan;
const createCatatan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, type, amount, description } = request.body;
        const newCatatan = yield prisma.catatan.create({
            data: { id, type, amount: Number(amount), description },
        });
        return response
            .json({
            status: true,
            data: newCatatan,
            message: `New financial records has Created`,
        })
            .status(200);
    }
    catch (error) {
        return response
            .json({
            status: false,
            message: `There is an error.${error}`,
        })
            .status(400);
    }
});
exports.createCatatan = createCatatan;
const updatedCatatanKuangan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { type, amount, description } = request.body;
        const findCatatan = yield prisma.catatan.findFirst({
            where: { id: Number(id) },
        });
        if (!findCatatan)
            return response
                .status(200)
                .json({ status: false, message: `Financial records is Not found` });
        const updatedCatatan = yield prisma.catatan.update({
            data: {
                type: type || findCatatan.type,
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
    }
    catch (error) {
        return response
            .json({
            status: false,
            message: `There is an error.${error}`,
        })
            .status(400);
    }
});
exports.updatedCatatanKuangan = updatedCatatanKuangan;
const deleteCatatan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const findCatatan = yield prisma.catatan.findFirst({
            where: { id: Number(id) },
        });
        if (!findCatatan) {
            return response
                .status(200)
                .json({ status: false, message: `is not found` });
        }
        const deleteCatatan = yield prisma.catatan.delete({
            where: { id: Number(id) },
        });
        return response
            .json({
            status: true,
            data: deleteCatatan,
            message: `financial records has Deleted`,
        })
            .status(200);
    }
    catch (error) {
        return response
            .json({
            status: false,
            message: `there is an error.${error}`,
        })
            .status(400);
    }
});
exports.deleteCatatan = deleteCatatan;
const hitungTotalCatatan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = request.query;
        // Validasi tipe transaksi
        if (!type || (type !== 'INCOME' && type !== 'EXPENSE')) {
            return response.status(400).json({
                message: 'Jenis transaksi tidak valid, hanya "income" atau "expense" yang diperbolehkan.',
            });
        }
        // Hitung total berdasarkan tipe transaksi
        const totalAmount = yield prisma.catatan.aggregate({
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
    }
    catch (error) {
        console.error('Error:', error);
        response.status(500).json({
            message: 'Astagfirullah,Terjadi kesalahan saat menghitung total: ${error}',
        });
    }
});
exports.hitungTotalCatatan = hitungTotalCatatan;
//# sourceMappingURL=catatanController.js.map