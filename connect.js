const mongoose = require("mongoose")

const connect = () => {
   const c = mongoose.connect(process.env.MONGO_URL);
    console.log("connecting to mongodb".blue.underline.bold)
}
mongoose.set('strictQuery', true)

module.exports = connect;
