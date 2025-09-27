// import { test, expect, beforeAll, afterAll } from "bun:test";
// import supertest from "supertest";
// import express from "express";
// import { PrismaClient } from "@prisma/client";

// // Import app Anda atau buat instance test
// const app = express();
// app.use(express.json());

// const prisma = new PrismaClient();

// // Setup routes untuk test (atau import dari file utama app Anda, misalnya index.ts)
// app.get("/catatans", async (req, res) => {
//   const catatans = await prisma.catatan.findMany();
//   res.json(catatans);
// });

// beforeAll(async () => {
//   // Seed data test
//   await prisma.catatan.create({
//     data: {
//       type: "EXPENSE", // Gunakan enum dari schema
//       amount: 100.5,
//       description: "Test Expense",
//     },
//   });
// });

// afterAll(async () => {
//   // Cleanup: Hapus semua data test (atau spesifik jika butuh)
//   await prisma.catatan.deleteMany({});
//   await prisma.$disconnect(); // Tutup connection
// });

// describe("E2E Tests for Catatan API", () => {
//   test("GET /catatans should return list of catatans", async () => {
//     const response = await supertest(app).get("/catatans");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(1); // Asumsi satu data seeded
//     expect(response.body[0].description).toBe("Test Expense");
//     expect(response.body[0].amount).toBe(100.5);
//     expect(response.body[0].type).toBe("EXPENSE");
//   });
// });
