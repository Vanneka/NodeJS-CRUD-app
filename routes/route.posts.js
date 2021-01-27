const express = require('express')
const router = express.Router();
const postSchema = require('../models/models.posts')


// get = display all items in the database in the index page
router.get('/', async (req, res)=>{
    // database here
    const posts = await postSchema.find().sort({ postDate: -1 })
    // attaching some data to the index page || It is here we will attach the items from the database to the index page
    res.render('index', {allPosts: posts})
})

// get:id: get a particular item
router.get('/:id', (req, res)=>{
    res.send(req.params.id)
})

// post: add new information to the /posts resource
router.post('/', async (req, res)=>{
    let newPost = new postSchema ({
        postTitle:req.body.postTitle,
        postBody: req.body.postBody,
    })
    // the database is here
    const articleNos = [1, 2, 3, 4]
    // DO THE VALIDATION HERE
    if(newPost.postTitle ==="" || newPost.postBody === ""){
        console.log('Please check the contents of your post')
        res.render('index', {articles: articleNos})
    } else {
        try {
            newPost = await newPost.save();
            res.redirect(`/posts/`)
            console.log(`Post with title: ${newPost.postTitle} successfully submitted`)
        } catch (err) {
            if(err) throw new Error(err)
        }
    }
})

module.exports = router;