const fileLogic = require("../fileLogic");
const { isValid } = require('../fileLogic')

const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer();


// const middleware = (req, res, next) => {
//   console.log("path: " + req.query.path);
//   const upload = multer({ dest: `${req.query.path}` });
// const cpUpload = upload.fields([
//   { name: "file", maxCount: 3 },
// ]);
// }



//העלאת קובץ לתקייה ראשית
router.post('/root/', upload.single('fileName'), async (req, res) => {
  try {
    fileLogic.saveFile(req.file, req.body.name, req.body.type, req.body.size, req.body.dir)
    res.send("ok");
  } catch {
    res.status(400).json("error");
  }
})

//העלאת קובץ לתקייה משנית

//-בבדיקה העלאת קובץ לתקייה משנית
// router.post('/root', upload.single('fileName'), async (req, res) => {
//   try {
//     fileLogic.saveFile(req.file, req.body.folderPath)
//     res.send("ok");
//   } catch {
//     res.status(400).json("error");
//   }
// })

// router.post('/root/:folder', upload.single('fileName'), async (req, res) => {
//   try {
//     fileLogic.saveFile(req.file, req.params.folder)
//     res.send("ok");
//   } catch {
//     res.status(400).json("error");
//   }
// })

// מחיקת קובץ מתקיה ראשית
router.delete("/root", async (req, res) => {
  try {
    await fileLogic.deleteFile(req.body.fileName);
    res.send("file has been deleted");
  } catch (error) {
    res.send(error.message);
  }
});

//שינוי שם קובץ מתקיה ראשית
router.put("/root", isValid, async (req, res) => {
  try {
    await fileLogic.renameFile(req.body.fileNameOld, req.body.fileNameNew);
    res.send("file rename success!");
  } catch (error) {
    res.send(error.message);
  }
});

//הורדת קובץ-לא תקין
router.get("/files/down", async (req, res) => {
  try {
    await fileLogic.downFile(req.body.fileName);
    res.send("file download success!");
  } catch (error) {
    res.send(error.message);
  }
});

//הצגת קבצים ותקיות מתקיה. צריך לשלוח בבודי את הנתיב למשל רוט/טסט
router.get("/root", async (req, res) => {
  try {
    res.send(await fileLogic.showFiles(req.body.folderPath))
  } catch (error) {
    res.send(error.message);
  }
});





module.exports = router;
