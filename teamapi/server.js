const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const app = express();

const runningPort = 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressValidator());

app.get("/", (req, res) => {
    res.json({ message: "Hello from the api! "});
});

require("./app/routes/person.routes.js")(app);
require("./app/routes/team.routes.js")(app);

app.listen(runningPort, () => {
    console.log(`Server is running on port ${runningPort}`);
})