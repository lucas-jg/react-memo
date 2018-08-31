import express from "express"
import path from "path"
import morgan from "morgan" // HTTP REQUEST LOGGER
import bodyParser from "body-parser" // PARSE HTML BODY

import mongoose from "mongoose"
import session from "express-session"
import api from "./routes"

const app = express()
const port = 3000

/* mongodb connection */
const db = mongoose.connection
db.on("error", console.error)
db.once("open", () => {
  console.log("Connected to mongodb server")
})
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect("mongodb://readyq.tv:27017/database=admin")

/* use session */
app.use(
  session({
    secret: "CodeLab1$1$234",
    resave: false,
    saveUninitialized: true
  })
)

app.use(morgan("dev"))
app.use(bodyParser.json())

app.use("/", express.static(path.join(__dirname, "./../public")))
app.use("/api", api)

app.get("/hello", (req, res) => {
  return res.send("Hello CodeLab")
})

app.listen(port, () => {
  console.log("Express is listening on port", port)
})
