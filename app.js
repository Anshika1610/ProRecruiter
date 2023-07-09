const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');

const logs = [];
const name = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home");
});


app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const log = {
        name: req.body.fname,
        email: req.body.email,
        //password: req.body.password
    };
    logs.push(log);
    name.push(log.name);
    console.log(name);
    if (req.body.fname === ""){
        res.redirect("login");
    } else {
        res.redirect("/logged");
    }
});

app.get("/logged", function(req, res){
    res.render("logged", {
        welname: name[name.length -1]
    });
});

app.get("/search", function(req, res){
    res.render("search", {
        welname: name[name.length -1]
    });
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.post("/signup", function(req, res){
    res.redirect("/login");
});

app.listen(3000 || process.env.PORT, function(){
    console.log("Server is live and ready on port 3000.");
});