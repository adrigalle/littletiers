// some boiler plate for the lowdb
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);


// set some defaults, this init the data store, this sets array of posts
db.defaults({ posts: [] })
    .write()

// add a post (This can probably be one line but I like like this)
// this pushes entry to posts
// db.get('posts') // comment out since already ran it, and it would add again
//     .push({ id: 1, title: 'lowdb is awesome', published: true })
//     .write()
// db.get('posts') 
//     .push({ id: 2, title: 'great', published: false })
//     .write()
// db.get('posts') 
//     .push({ id: 3, title: 'amazing', published: false })
//     .write()
// db.get('posts') 
//     .push({ id: 4, title: 'rando', published: true })
//     .write()

// found in the documentation, to print all the ones that were already persisted
console.log(db.get('posts').value());

// count posts
console.log(db.data);

// find all posts ids
// ----------------------------
// YOUR CODE

// all matches of published false
// ----------------------------
// YOUR CODE

// find post with published false
// ----------------------------
// YOUR CODE
