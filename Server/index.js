import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerBooks from "./routes/BookRoute.js";
import session from "express-session";
import db from "./config/Database.js";
import Books from "./models/BookModel.js";
import bodyParser from "body-parser";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(routerBooks);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
