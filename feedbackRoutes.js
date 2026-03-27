const router = require("express").Router();
const Feedback = require("../models/Feedback");

// ADD FEEDBACK
router.post("/add", async (req, res) => {
  try {
    const { username, ratings, comment } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const exists = await Feedback.findOne({ username, date: today });
    if (exists) {
      return res.status(400).json({ message: "Already submitted" });
    }

    await Feedback.create({
      username,
      ratings,
      comment,
      date: today
    });

    res.json({ message: "Saved" });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// GET FEEDBACK BY DATE
router.get("/:date", async (req, res) => {
  try {
    const data = await Feedback.find({ date: req.params.date });
    res.json(data);
  } catch {
    res.json([]);
  }
});

module.exports = router;