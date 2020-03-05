import express from "express";
import compression from "compression";
import ssr from "./routes/ssr";
import api from "./routes/firebaseApi";

const app = express();

app.use(compression());
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

//HTTPS redirect middleware
function ensureSecure(req, res, next) {
  if (
    req.get("X-Forwarded-Proto") === "https" ||
    req.hostname === "localhost"
  ) {
    next();
  } else if (
    req.get("X-Forwarded-Proto") !== "https" &&
    req.get("X-Forwarded-Port") !== "443"
  ) {
    //Redirect if not HTTP with original request URL
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.use("/api", api);
app.use("/", ssr);

const port = process.env.PORT || 8080;

app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});
