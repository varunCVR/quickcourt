import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("QuickCourt Backend API is running 🚀");
});

// Example route: get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Start server
const PORT = process.env['PORT'] || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
