const express = require("express");
const path = require("path")
const logger = require("./middleware/logger");

const app = express()

// to use these middlewares we need to call app.use
app.use(logger);
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static server
// if i want to make a static folder that serves html, css, images etc
app.use(express.static(path.join(__dirname, 'public')));
// Members Api Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))