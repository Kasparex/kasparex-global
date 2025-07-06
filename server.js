import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Kasparex AI backend running on port ${PORT}`);
});
