const { json } = require("express");
const Voting = require("../model/voteModal");
const votingPage = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const vote = req.body.name;
    if (!vote) {
      throw new Error("Please select candidate");
    }
    const votedUser = await Voting.findOne({ uservote: user.id });
    console.log(votedUser);
    if (votedUser) {
      throw new Error("user already voted");
    }
    const createvote = await Voting.create({
      candidateName: vote,
      uservote: user.id,
    });
    res.json({ user: createvote });
  } catch (error) {
    next(error);
  }
};
const adminPage = async (req, res, next) => {
  try {
    const voteCounts = await Voting.aggregate([
      { $group: { _id: "$candidateName", votes: { $sum: 1 } } },
    ]);
    res.json(voteCounts);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  votingPage,
  adminPage,
};
