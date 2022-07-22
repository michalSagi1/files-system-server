const fs = require("fs");
const { models } = require("mongoose");
const fileController = require("./DL/controllers/fileController");


//יצירת תקייה
const createFolder = async (folderName, type, dir) => {
    if (!isValidName(folderName)) throw { message: "error - name" }
    if (fs.existsSync(folderName)) throw { message: "folder is already exist" };
    const folder = { name: folderName, type, dir }
    await fileController.create(folder)

    return (fs.mkdirSync(`root/${folderName}`), folder)

};

//שינוי שם תקיה
const renameFolder = (folderNameOld, folderNameNew) => {
    if (!isExist(folderNameOld)) throw { message: "File dosen't exist" };
    fs.renameSync(`root/${folderNameOld}`, `root/${folderNameNew}`)
};

//מחיקת תקייה
const deleteFolder = (folderName) => {
    const files = fs.readdirSync(`root/${folderName}`)
    files.forEach(file => fs.unlinkSync(`root/${folderName}/${file}`))
    fs.rmdirSync(`root/${folderName}`)
}



//הצגת התקיות
const getDirectories = async source =>
    fs.readdir('./root/', { withFileTypes: true }, (error, files) => {
        if (error) throw error;
        const directoriesInDIrectory = files
            .filter((item) => item.isDirectory())
            .map((item) => item.name);

        console.log(directoriesInDIrectory);
        return (directoriesInDIrectory);
    });




function isExist(folderName) {
    return fs.existsSync(`./root/${folderName}`);
}


function isValidName(fileName = "") {
    return ["/", "\\", "+", ":", "|", "?", "<", ">", '"'].find((char) =>
        fileName.includes(char)
    )
        ? false
        : true;
}

const isValid = (req, res, next) => {
    const { folderName } = req.params;
    if (isValidName(folderName)) {
        next();
    } else {
        res.send("name is not valid");
    }
}

const isValidFolder = (req, res, next) => {
    const { folderNameNew } = req.body;
    if (isValidName(folderNameNew)) {
        next();
    } else {
        res.send("name is not valid");
    }
}



// const getFileByDir = async (dir) => {
//     const file = await fileController.read({ dir: dir });
//     if (file.length === 0) throw ({ code: 400, message: "no file in this dir" })
//     return file
// };

const getFileByDir = async () => {
    const file = await fileController.read({});
    if (file.length === 0) throw ({ code: 400, message: "no file in this dir" })
    return file
};
module.exports = { createFolder, isValid, isValidName, renameFolder, isValidFolder, deleteFolder, getDirectories, getFileByDir }

