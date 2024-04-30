import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors';
import connectDB from "./config/db.js";
import userAuthRoutes from './routes/userAuthRoute.js'
import weddingRoutes from './routes/weddingRoutes.js'
import agricultureRoutes from './routes/agricultureRoutes.js'
import User from './models/userModel.js';
import { requireSignIn } from "./middlewares/userAuthMiddleware.js";
import cloudinary from './config/cloudinaryConfig.js'; 

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
//middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded instead of bodyParser
app.use(morgan("dev"));

app.use('/api/v1/auth',userAuthRoutes);

app.use('/api/v1/wedding',weddingRoutes);

app.use('/api/v1/agriculture',agricultureRoutes);



//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Weddingbells  API service</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
