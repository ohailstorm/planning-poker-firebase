import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";
import api from "./routes/firebaseApi";

const app = express();

app.use(compression());
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

app.use("/api", api);
app.use("/", ssr);

const port = process.env.PORT || 8080;
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
