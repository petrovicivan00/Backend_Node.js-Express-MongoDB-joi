import express from "express";
import cors from "cors";
import history from "connect-history-api-fallback";
import routes from "./routes/routes.js";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ADMIN APP
app.use("/", routes);
app.use(express.static(path.join(__dirname, "static")));

//CLIENT APP
/*
const client = express.static(path.join(__dirname, 'dist'));
app.use(history({ index: '/index.html' }));
app.use(client);
*/
app.listen( process.env.PORT | 4000, () => {
    console.log("Backend server is running on port " + process.env.PORT);
});