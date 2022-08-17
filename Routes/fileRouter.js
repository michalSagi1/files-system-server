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



//העלאת קובץ
router.post('/root', upload.single('fileName'), async (req, res) => {
  try {
    fileLogic.saveFile(req.file, req.query.path)
    // console.log(req.file.buffer);
    res.send("ok");
  } catch {
    res.status(400).json("error");
    // console.log(error.message);

  }
})




// router.post('/root/', upload.single('fileName'), async (req, res) => {
//   try {
//     fileLogic.saveFile(req.file, req.body.name, req.body.type, req.body.size, req.body.dir)
//     console.log(req.file);
//     res.send("ok");
//   } catch {
//     res.status(400).json("error");
//   }
// })

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
    res.send(error.message);
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
