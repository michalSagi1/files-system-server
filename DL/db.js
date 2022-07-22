const mongoose = require("mongoose")

const MONGO_URL = 'mongodb+srv://michalsagi:Ms6512864@cluster0.03bbe.mongodb.net/fileSystem?retryWrites=true&w=majority'

exports.connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true },
            (err) => {
                if (err) { console.log("error:", err); return false; }
                console.log("Connection Success, State:", mongoose.connection.readyState);
            })
    }
    catch (error) {
        console.log("error mongoos:", error);
    }
}
// connect()

// module.exports = connect;