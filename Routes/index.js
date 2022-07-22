const express = require("express")
const router = express.Router();

const folderRoute = require("./folderRouter");
const fileRoute = require("./fileRouter");



router.use("/folder", folderRoute);
router.use("/file", fileRoute);


module.exports = router;