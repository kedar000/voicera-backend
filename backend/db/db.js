const mongoose = require('mongoose');

 async function connectDB(){
    const mongoURL = process.env.MONGO_URL || "";
    try {
        const connection = await mongoose.connect(mongoURL);
        console.log(mongoURL);
        console.log("connected to DB ...")
    } catch (error) {
        console.log("error in connnecting to database " , error)
    }
}

module.exports={
    connectDB
}