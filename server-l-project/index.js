import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import EmplListRoutes from "./routes/api/EmplList.js";

const app = express();
dotenv.config();

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-
app.use("/api/EmplList", EmplListRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`App is running on http://localhost:${process.env.PORT}`)
);