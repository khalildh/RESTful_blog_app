const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
app = express(),
server = 8000;


// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise;


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

// ROOT ROUTE
app.get("/", function(req, res){
  console.log("GET: '/'");
  res.redirect("/blogs")
})

// INDEX ROUTE
app.get("/blogs", function(req, res){
  console.log("GET: '/blogs'");
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", {"blogs": blogs})
    }
  });
});

// CREATE ROUTE
app.get("/blogs/new", function(req, res) {
  console.log("GET: 'blogs/new'");
  res.render("new");
});

app.post("/blogs", function(req, res) {
  console.log("POST: '/blogs'");
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      console.log(err);
    } else {
      console.log("New Blog Created");
      res.redirect("/blogs");
    }
  });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
      if (err) {
        res.redirect("/blogs");
      } else {
        res.render("show", {blog: foundBlog})
      }
  })
});

app.listen(server, function() {
  console.log("Restful blog app serving on port " + server);
});
