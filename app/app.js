import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", routes);
app.use(express.static(path.join(__dirname, "static")));

app.listen( process.env.PORT | 4000, () => {
    console.log("Backend server is running on port " + process.env.PORT);
});