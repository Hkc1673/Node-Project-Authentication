const express = require("express");
const router = express.Router();
const verify = require("../middleware/authMiddleware");
const ListController = require("../controllers/ListController");

router.get("/", verify,(req, res) => {
    res.json({
        posts: {
            title: "My first post",
            description: "I will send random data "
        }
    });
});

router.post("/list", verify, ListController.createPost);
router.post("/update/:id", verify, ListController.createDate)
router.get("/list/:id", verify, ListController.getList);
router.get("/singleList/:id", verify, ListController.getSingleList)
router.patch("/singleList/:id", verify, ListController.updateList);
router.delete("/singleList/:id", verify, ListController.deleteList)

module.exports = router;