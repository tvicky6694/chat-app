const mongoose = require("mongoose");
const database = process.env.MONGO_URL;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Mongo connected'))
.catch(err => console.log("Mongo connection Error",err));

module.exports = mongoose;