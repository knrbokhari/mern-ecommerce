const mongoose = require("mongoose");

exports.findAllLogServices = async () => {
    const Log = mongoose.model("log");
    const data = await Log.find();

    return data;
};