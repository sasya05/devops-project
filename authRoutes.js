const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    // create normal user if not exists
    if (!user) {
      user = new User({
        username,
        password,
        role: "user"
      });
      await user.save();
    }

    // check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 🔥 SEND ROLE ALSO
    res.json({
      message: "Login success",
      user: {
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;