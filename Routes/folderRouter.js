const folderLogic = require("../folderLogic");
const { isValid, isValidFolder } = require('../folderLogic')


const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer();

//יצירת תקייה
router.post("/creatfolder/:folderName/", isValid, async (req, res) => {
    try {
        await folderLogic.createFolder(req.params.folderName, req.body.path, req.body.type);
        res.send("folder has been created");
        console.log("folder has been created");

    } catch (error) {
        res.status(401).send(error.message);
        console.log(error.message);
    }
});

//שינוי שם תקיה
router.put("/root", isValidFolder, async (req, res) => {
    try {
        res.send(await folderLogic.renameFolder(req.body.folderNameOld, req.body.folderNameNew, req.body.path));
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

//מחיקת תקייה
router.delete("/root", async (req, res) => {
    try {
        res.send(await folderLogic.deleteFolder(req.body.folderName, req.body.path));
    } catch (error) {
        res.status(error.code || 400).send({ message: error.message });
    }
});

//הצגת התקיות

router.get("/root", async (req, res) => {
    try {
        // console.log("michal");
        const a = await folderLogic.getDirectories(req.query.path)
        console.log(req.query.path);
        res.send(folderLogic.getDirectories(req.query.path))
        console.log(req.query.path);

    } catch (error) {
        res.send(error.message);
    }
});


// router.get("/getFile", async (req, res) => {
//     try {
//         console.log(req.body);
//         res.send(await folderLogic.getFileByDir(req.body.dir))
//     }
//     catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: "something wrong :( ..." })
//     }
// });
router.get("/getFile", async (req, res) => {
    try {
        // console.log(req.body);
        res.send(await folderLogic.getFileByDir())
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "something wrong :( ..." })
    }
});



module.exports = router;
