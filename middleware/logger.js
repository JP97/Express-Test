const moment = require("moment");


// this is a middleware function
const logger = (req, res, next) => {
    console.log("logging a logable log: ");
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;