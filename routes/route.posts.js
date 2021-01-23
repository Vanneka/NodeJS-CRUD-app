const express = require('express')
const router = express.Router();
const postSchema = require('../models/models.posts')


// get = display all items in the database in the index page
router.get('/', (req, res)=>{
    // temporary database here
    const articleNos = [1, 2, 3, 4]
    // attaching some data to the index page || It is here we will attach the items from the database to the index page
    res.render('index', {articles: articleNos})
})

router.get('/:id', (req, res)=>{
    res.send(req.params.id)
})

router.post('/', async (req, res)=>{
    let newPost = new postSchema ({
        postTitle:req.body.postTitle,
        postBody: req.body.postBody,
    })
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