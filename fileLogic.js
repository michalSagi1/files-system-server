const fs = require("fs");




//העלאת קובץ
function saveFile(file, path) {
  if (fs.existsSync(`./${path}/${file.originalname}`)) throw { message: "file is already exists" };
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
  if (fs.existsSync(`./${path}/${fileNameNew}`)) throw { message: "File with this name already exists" };

  return (fs.renameSync(`${path}/${fileNameOld}`, `${path}/${fileNameNew}`))
};



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
  return [".pdf", ".txt", ".png", ".jpg", ".jpeg", ".js", ".html", ".css", ".jsx", ".ts", ".docx", ".zip", ".pptx", "xlsx"].find(
    (char) => ext == char
  )
    ? true
    : false;
}

const isValid = (req, res, next) => {
  const { fileNameNew } = req.body;
  if (isValidName(fileNameNew) && isValidExtantions(fileNameNew)) {
    next();
  } else if (!isValidExtantions(fileNameNew)) { res.status(400).send({ message: "Can't change name. Unsupported file type" }) }
  else {
    res.status(400).send({ message: "The file name can only contain letters and numbers" });
  }
}




module.exports = {
  deleteFile, saveFile, renameFile, isValid
};
