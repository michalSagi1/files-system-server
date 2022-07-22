const fs = require("fs");
const http = require('http');
const path = require('path');
const fileController = require("./DL/controllers/fileController");



//העלאת קובץ לתקייה ראשית
const saveFile = async (file, name, size, type, dir) => {
  const files = { name, size, type, dir }
  await fileController.create(files)
  return (fs.writeFileSync(`./root/` + file.originalname, file.buffer), files
  )
}
//-בבדיקה העלאת קובץ לתקייה משנית
// function saveFile(file, folderPath) {
//   const directoryPath = path.join(__dirname, `${folderPath}`);

//   fs.writeFileSync(directoryPath + file.originalname, file.buffer);
// }

//מחיקת קובץ
const deleteFile = (fileName) => {
  if (!isExist(fileName)) throw { message: "File dosen't exist" };
  fs.unlinkSync(`root/${fileName}`);
};

//שינוי שם קובץ מתקיה ראשית
const renameFile = (fileNameOld, fileNameNew) => {
  if (!isExist(fileNameOld)) throw { message: "File dosen't exist" };
  fs.renameSync(`root/${fileNameOld}`, `root/${fileNameNew}`)
};

//הורדת קובץ-לא תקין
const downFile = (fileName) => {
  if (!isExist(fileName)) throw { message: "File dosen't exist" };

  const url = `http://localhost:3000/root/${fileName}`;

  http.get(url, (res) => {
    const path = "Downloads";
    const writeStream = fs.createWriteStream(path);

    res.pipe(writeStream);

    writeStream.on("finish", () => {
      writeStream.close();
      console.log("Download Completed!");
    })
  })
}
const showFiles = (folderPath) => {
  const directoryPath = path.join(__dirname, `${folderPath}`);
  // const directoryPath = path.join(__dirname, 'Documents');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      console.log(file);
      return [file]
    });
  });
}






// const readFile = async (fileName) => {
//   if (!isExist(fileName)) throw { message: "File dosen't exist" };
//   const data = await fs.readFileSync(`uploads/${fileName}`, {
//     encoding: "utf-8",
//   });
//   return data;
// };




function isExist(fileName) {
  return fs.existsSync(`./root/${fileName}`);
}

//בדיקת שם 
function isValidName(fileName = "") {
  return ["/", "\\", "+", ":", "|", "?", "<", ">", '"'].find((char) =>
    fileName.includes(char)
  )
    ? false
    : true;
}

function isValidExtantions(fileName = "") {
  let ext = fileName.slice(fileName.lastIndexOf("."));
  return [".pdf", ".txt", ".png", ".jpg", ".js", ".html", ".css", ".jsx", ".ts"].find(
    (char) => ext == char
  )
    ? true
    : false;
}

const isValid = (req, res, next) => {
  const { fileNameNew } = req.body;
  if (isValidName(fileNameNew) && isValidExtantions(fileNameNew)) {
    next();
  } else {
    res.send("name is not valid");
  }
}




module.exports = {
  deleteFile, saveFile, renameFile, isValid, downFile, showFiles
};
