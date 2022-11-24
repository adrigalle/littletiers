// add http server
// -----------------------
const express = require('express');
const app = express(); // app is convention

// in larger examples might use const instead
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
// YOUR CODE

// init the data store
db.defaults({ posts: []}).write();

// list posts
app.get('/data', function(req, res){     

    res.send(db.get('posts').value()); // this is simply to see all the posts, will show up on localhost:3000/data, this is basically a read

});

// ----------------------------------------------------
// This is basically ping=title 1=id published=false
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
    //             URL           route title id  published
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function(req, res){

    // this makes the :published thingy an actual boolean
    const isPublished = req.params.published;
    const isPublishedBoolean = isPublished === 'true' ? true : false;

    const id = parseInt(req.params.id);

    // this is an object for a post
    var post = {
        'id': id, // adding the parse makes it a number
        'title': req.params.title,
        'published': isPublishedBoolean,
    }
    // get a handle on our posts, 
    // and then push a single post
    // and then write/save it
    db.get('posts').push(post).write();
    // print out to console log (just read)
    console.log(db.get('posts').value());

    // respond to client and send it back as well to make sure that it is also working there
    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------

app.get('/published/:boolean', function(req, res){

    // this makes the :boolean thingy an actual boolean
    const isPublished = req.params.boolean;
    const isPublishedBoolean = isPublished === 'true' ? true : false;

    // still have some issues because some are not 100% boolean but close enough
    const posts = db.get('posts').value();
    console.log(posts);
    // filter out any objects with the same published value
    const published = posts.filter(post => post.published === isPublishedBoolean);
    // print out on console
    console.log(published);
    // respond to client
    res.send(published);

});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function(req, res){

    // this makes the :boolean thingy an actual boolean
    const isPublished = req.params.boolean;
    const isPublishedBoolean = isPublished === 'true' ? true : false;

    const id = parseInt(req.params.id);
    const posts = db.get('posts').value();
    const index = posts.findIndex(post => post.id == id);

    // make a new little one with the object at posts index
    const temp = posts[index];
    // change the boolean thing
    temp.published = isPublishedBoolean;
    console.log(temp);
    // splice the original and put in temp with new boolean value
    db.get('posts').splice(index, 1, temp).write();

    console.log(db.get('posts').value());
    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/delete/:id/', function(req, res){

    const id = parseInt(req.params.id);
    const posts = db.get('posts').value();

    console.log(id);
    // this finds the index of the post using the id from req
    const index = posts.findIndex(post => post.id == id);
    // if not there, it just deletes the last entry
    console.log(index);
    db.get('posts').splice(index, 1).write();


    console.log(db.get('posts').value());
    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// delete All entries - test using:
//      curl http://localhost:3001/deleteAll
// ----------------------------------------------------
app.get("/deleteAll", function (req, res) {
    // YOUR CODE
    db.get("posts").remove().write();
    // 204 Success No Content
    res.status(204).send();
  });

// start server
// -----------------------
app.listen(3000, function(){
    console.log('Running on port 3000!');
})
