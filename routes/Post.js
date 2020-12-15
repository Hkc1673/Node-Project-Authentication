const express = require("express");
const router = express.Router();
const verify = require("../middleware/authMiddleware");

router.get("/", verify,(req, res) => {
    res.json({
        posts: {
            title: "My first post",
            description: "I will send random data "
        }
    });
})

module.exports = router;