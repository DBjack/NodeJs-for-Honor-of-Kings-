const express = require("express");

const app = express();

app.set("secret", "dfafdgadsfg");

app.use(express.json());
app.use(require("cors")());
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./router/admin/index")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});