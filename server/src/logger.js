const winston = require("winston");
const expressWinston = require("express-winston");
require("winston-mongodb");
require("winston-daily-rotate-file");
const uri = process.env.MONGO_DB;

// Transport
const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };

  return JSON.stringify(obj);
};

// it need to on for mongo log
const mongoErrorTransport = () =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
    option: { useUnifiedTopology: true },
  });

exports.infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      //   new winston.transports.DailyRotateFile({
      //     filename: "log-info-%DATE%.log",
      //     datePattern: "yyyy-MM-DD-HH",
      //   }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: getMessage,
  });

exports.errorLogger = () =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      //   new winston.transports.DailyRotateFile({
      //     filename: "log-error-%DATE%.log",
      //     datePattern: "yyyy-MM-DD-HH",
      //   }),
      mongoErrorTransport(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    // msg: getMessage,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  });
