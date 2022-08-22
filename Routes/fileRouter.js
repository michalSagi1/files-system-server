const fileLogic = require("../fileLogic");
const { isValid } = require('../fileLogic')

const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer();



//העלאת קובץ
router.post('/root', upload.single('fileName'), async (req, res) => {
  try {
    await fileLogic.saveFile(req.file, req.query.path)
    res.send("ok");
  } catch (error) {
    res.status(401).send("error");
    console.log(error.message);

  }
})


// מחיקת קובץ 
router.delete("/root", async (req, res) => {
  try {
    await fileLogic.deleteFile(req.body.fileName, req.body.path);
    res.send("file has been deleted");
  } catch (error) {
    res.send(error.message);
  }
});

//שינוי שם קובץ 
router.put("/root", isValid, async (req, res) => {
  try {
    await fileLogic.renameFile(req.body.fileNameOld, req.body.fileNameNew, req.body.path);
    res.send("file rename success!");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});




//הורדת קובץ
router.post("/download", async (req, res) => {
  try {
    const { fileName, path } = req.body;
    res.download(`${path}/${fileName}`);
  } catch (error) {
    res.send(error.message);
  }
});





module.exports = router;
