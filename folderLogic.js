const fs = require("fs");
const { models } = require("mongoose");
const fileController = require("./DL/controllers/fileController");


//יצירת תקייה
const createFolder = async (folderName, path) => {
    if (!isValidName(folderName)) throw { message: "error - name" }
    if (fs.existsSync(`./${path}/${folderName}`)) throw { message: "folder is already exist" };
    // const folder = { name: folderName, type, dir }
    // await fileController.create(folder)

    return (fs.mkdirSync(`./${path}/${folderName}`))

};

//שינוי שם תקיה
const renameFolder = (folderNameOld, folderNameNew, path) => {
    if (fs.existsSync(`./${path}/${folderNameNew}`)) throw { message: "Folder  is already exist" };
    return (fs.renameSync(`${path}/${folderNameOld}`, `${path}/${folderNameNew}`))
    // return ("folder rename success!");


};

//מחיקת תקייה
const deleteFolder = (folderName, path) => {
    if (fs.readdirSync(`${path}/${folderName}`).length === 0) {

        // const files = fs.readdirSync(`${path}/${folderName}`)
        // files.forEach(file => fs.unlinkSync(`./${path}/${folderName}/${file}`))
        fs.rmdirSync(`./${path}/${folderName}`)
    }
    else {
        console.log("the folder not empty");
        throw { message: "Folder " + folderName + " is not empty" };
    }
    return ("folder has been deleted");

}


//הצגת התקיות
const getDirectories = (path) => {
    return (
        fs.readdirSync(`${path}`, { withFileTypes: true }, (error, files) => {
            if (error) throw { error };
            const directoriesInDIrectory = files
                .filter((item) => item.isDirectory())
            // .map((item) => item.name);
            console.log(directoriesInDIrectory);
            return (console.log("hii"), directoriesInDIrectory);
        }))
}




function isExist(folderName) {
    return fs.existsSync(`./root/${folderName}`);
}


function isValidName(fileName = "") {
    return ["/", "\\", "+", ":", "|", "?", "<", ">", '"', "."].find((char) =>
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
        res.status(error.code || 400).send({ message: "name is not valid" });
        throw { message: "name is not valid" }
    }
}

const isValidFolder = (req, res, next) => {
    const { folderNameNew } = req.body;
    if (isValidName(folderNameNew)) {
        next();
    } else {
        res.status(400).send({ message: "name is not valid" });
        throw { message: "name is not valid" }

    }
}



// const getFileByDir = async (dir) => {
//     const file = await fileController.read({ dir: dir });
//     if (file.length === 0) throw ({ code: 400, message: "no file in this dir" })
//     return file
// };

// const getFileByDir = async () => {
//     const file = await fileController.read({});
//     if (file.length === 0) throw ({ code: 400, message: "no file in this dir" })
//     return file
// };
module.exports = { createFolder, isValid, isValidName, renameFolder, isValidFolder, deleteFolder, getDirectories }

