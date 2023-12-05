require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./router/router");
const dbconnect = require("./db/dbconnection");
const errorHandlerMiddleware = require("./middleware/errorHanderMiddleware");
const pageRouter = require("./router/pageRouter");
const app = express();
const PORT = process.env.PORT;

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", router);

app.use("/api/page", pageRouter);

app.use(errorHandlerMiddleware);

const server = async () => {
  const database = await dbconnect(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`your srver is started on PORT= ${PORT}`);
  });
};
server();
