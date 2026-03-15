import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import connectDatabase from "./src/db/connectDatabase.js";
import contactsRouter from "./src/routes/contactsRouter.js";
import authRouter from "./src/routes/authRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Public path:", join(__dirname, "public"));

const app = express();

app.use(express.static(join(__dirname, "public")));

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDatabase();

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
