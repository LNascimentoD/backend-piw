const app = require("./config/express.js")();
const db = require("./config/database");

db("mongodb://localhost/piw_final");
app.listen(3333);
