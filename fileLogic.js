const fs = require("fs");
const http = require('http');
const path = require('path');
const fileController = require("./DL/controllers/fileController");



//העלאת קובץ
function saveFile(file, path) {
  if (fs.existsSync(`./${path}/${file.originalname}`)) throw { message: "file is already exist" };
  else {
    return (fs.writeFileSync(`./${path}/` + file.originalname, file.buffer))
  }
}



//מחיקת קובץ
const deleteFile = (fileName, path) => {
  if (!isExist(fileName, path)) throw { message: "File dosen't exist" };
  fs.unlinkSync(`${path}/${fileName}`);
};

//שינוי שם קובץ 
const renameFile = (fileNameOld, fileNameNew, path) => {
  if (!isExist(fileNameOld, path)) throw { message: "File dosen't exist" };
  if (fs.existsSync(`./${path}/${fileNameNew}`)) throw { message: "File  is already exist" };

  return (fs.renameSync(`${path}/${fileNameOld}`, `${path}/${fileNameNew}`))
};


// const showFiles = (folderPath) => {
//   const directoryPath = path.join(__dirname, `${folderPath}`);
//   // const directoryPath = path.join(__dirname, 'Documents');
//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       return console.log('Unable to scan directory: ' + err);
//     }
//     files.forEach(function (file) {
//       console.log(file);
//       return [file]
//     });
//   });
// }






// const readFile = async (fileName) => {
//   if (!isExist(fileName)) throw { message: "File dosen't exist" };
//   const data = await fs.readFileSync(`uploads/${fileName}`, {
//     encoding: "utf-8",
//   });
//   return data;
// };




function isExist(fileName, path) {
  return fs.existsSync(`./${path}/${fileName}`);
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
  deleteFile, saveFile, renameFile, isValid
};
