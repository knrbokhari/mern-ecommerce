const { findAllLogServices } = require("../Services/LogService");

//get all logs
exports.getLogs = async (req, res) => {
    try {
      const result = await findAllLogServices();
  
      res.status(200).json(result);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };