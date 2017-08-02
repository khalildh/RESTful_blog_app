const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
app = express()
server = 8000;


// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", function(req, res){
  console.log("Get on '/'");
  res.redirect("/blogs")
})
app.get("/blogs", function(req, res){
  console.log("Get on '/blogs'");
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", {"blogs": blogs})
    }
  });
});

app.listen(server, function() {
  console.log("Restful blog app serving on port " + server);
});
