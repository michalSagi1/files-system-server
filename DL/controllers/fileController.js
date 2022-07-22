// require('../db').connect();

const { fileModel } = require('../models/file')

async function create(data) {
    const res = await fileModel.create(data);
    return (res);

}

async function read(filter) {
    const res = await fileModel.find(filter)
    return (res);
}

async function readOne(filter) {
    const res = await fileModel.findOne(filter)
    return (res);
}

async function update(filter, newData) {
    const res = await fileModel.updateOne(filter, newData)
    return (res);
}
async function del(filter) {
    return await update(filter, { isActiv: false })

}

module.exports = { create, read, readOne, update, del }


