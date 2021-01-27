
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const mongoose = require('mongoose');
const postRoutes = require('./routes/route.posts')

// CONNECT THE DATABASE
let uri = 'mongodb://localhost/allBlogPosts'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database connected')
}).catch((err) => {
    console.log(`error, database did not connect because ${err}`)
})

// USE EJS
app.set('view engine', 'ejs')

// JSON
app.use(express.json())

// READ FORM DATA
app.use(express.urlencoded({ extended: false }))

// USING THE ROUTES
app.use('/posts', postRoutes);

// SERVER CODE HERE
app.get('/', (req, res) => {
    // render the index.ejs page
    res.send('<h2> This is the homepage </h2>')
})
// SERVER CODE HERE

// LISTEN HERE
app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`App is listening on port ${PORT}`)
})