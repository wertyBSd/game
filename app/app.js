var express = require("express");
var fs = require("fs");

var app = express();
app.use(express.static(__dirname + "./../"));

app.get("/api/heroes", function (req, res) {
	var content = fs.readFileSync("./data/heroArray.json", "utf-8");
	var heroArray = JSON.parse(content);
	res.send(heroArray);
});

app.listen(3000, function () {
	console.log("Сервер ожидает подключения...");
});