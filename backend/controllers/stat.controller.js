const Statistic = require("../models/stats");

const getAllStatistics = async (req, res) => {
  try {
    const stats = await Statistic.findOne(); // Assuming only one document for global stats
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStatistics = async (req, res) => {
  try {
    const stats = await Statistic.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { getAllStatistics, updateStatistics };
