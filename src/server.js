import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";
import api from "./routes/firebaseApi";

const app = express();

app.use(compression());
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

app.use(function(req, res, next) {
  if (req.protocol === "http") {
    if (req.hostname !== "localhost") {
      res.redirect("https://" + req.headers.host + req.url);
    }
  }
  next();
});

app.use("/api", api);
app.use("/", ssr);

const port = process.env.PORT || 8080;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
