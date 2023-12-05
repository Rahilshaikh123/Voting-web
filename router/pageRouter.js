const express = require("express");
const {
  authenticateUser,
  autherizeUser,
} = require("../middleware/authMiddleware");
const { votingPage, adminPage } = require("../controller/votecontroller");
const pageRouter = express.Router();

pageRouter.post("/vote", authenticateUser, votingPage);
pageRouter.get("/admin", authenticateUser, autherizeUser("admin"), adminPage);
module.exports = pageRouter;
