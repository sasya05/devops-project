const router = require("express").Router();
const Menu = require("../models/Menu");

// ADD OR UPDATE MENU
router.post("/add", async (req, res) => {
  try {
    const { items } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const menu = await Menu.findOneAndUpdate(
      { date: today },
      { items },
      { new: true, upsert: true }
    );

    res.json({ message: "Menu saved", menu });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET TODAY MENU
router.get("/today", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const menu = await Menu.findOne({ date: today });

  res.json(menu || { items: [] });
});

module.exports = router;