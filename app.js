const express = require("express");

const app = express();

app.set("secret", "dfafdgadsfg");

app.use(express.json());
app.use(
    require("cors")({
        credentials: true,
        origin: "http://192.168.31.48:8080",
    })
);
app.use(require("cookie-parser")());

app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./routes/admin/index")(app);
require("./routes/web/index")(app);

app.listen(3000, () => {
    console.log("http://192.168.31.48:3000");
});