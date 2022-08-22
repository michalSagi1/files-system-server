const fs = require("fs");


//יצירת תקייה
const createFolder = async (folderName, path, type) => {
    if (fs.existsSync(`./${path}/${folderName}`)) throw { message: "Folder with this name already exists" };
    return (fs.mkdirSync(`./${path}/${folderName}`))

};

//שינוי שם תקיה
const renameFolder = (folderNameOld, folderNameNew, path) => {
    if (fs.existsSync(`./${path}/${folderNameNew}`)) throw { message: "Folder  is already exists" };
    return (fs.renameSync(`${path}/${folderNameOld}`, `${path}/${folderNameNew}`))


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
            // console.log(directoriesInDIrectory);
            return (directoriesInDIrectory);
        }))
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
        res.status(400).send({ message: "The folder name can only contain letters and numbers" });
    }
}

const isValidFolder = (req, res, next) => {
    const { folderNameNew } = req.body;
    if (isValidName(folderNameNew)) {
        next();
    } else {
        res.status(400).send({ message: "Note, only letters and numbers must be entered" });

    }
}


module.exports = { createFolder, isValid, isValidName, renameFolder, isValidFolder, deleteFolder, getDirectories }

