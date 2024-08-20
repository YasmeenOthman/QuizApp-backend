const Statistic = require("../models/stats");

const getAllStatistics = async (req, res) => {
  try {
    const stats = await Statistic.findOne(); // Assuming only one document for global stats
    res.send(stats);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const updateStatistics = async (req, res) => {
  try {
    const stats = await Statistic.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.send(stats);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = { getAllStatistics, updateStatistics };
