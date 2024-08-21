import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import userRoute from "./routes/userroutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import companyRoute from "./routes/companyrouter.js"
import jobRoute from "./routes/jobroute.js"
import applicationRoute from "./routes/applicationroute.js"

// Setup environment variables
dotenv.config({});
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config.env") });



// Middleware
app.use(express.json()); // Corrected this line by adding parentheses
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',  // Corrected the URL scheme (added colon)
    credentials: true                 // Changed 'Credentials' to 'credentials'
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute)


app.get("/", (req, res) => {
    res.send("Node is running");
});

// Server Setup
app.listen(process.env.PORT, () => {
    connectdb();  // Assuming connectdb is a function that connects to your database
    console.log(`Node server is running on port ${process.env.PORT}`);
});
