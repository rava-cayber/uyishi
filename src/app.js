import { config } from "dotenv";
import express from "express";
import userRouter from "./routes/users.route.js";
config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});