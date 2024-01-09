const Post = require('../models/post.model');

module.exports.getAllPosts = (req, res) => {
    Post.find().sort({createdAt:-1})
        .then((allPosts) => {
            
            res.json({ polls: allPosts })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.getTopThreePosts = (req, res) => {
    Post.find().sort({votesCount:-1}).limit(3)
        .then((allPosts) => {
            
            res.json({ polls: allPosts })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });
}
 
module.exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(onePost => {
            res.json({ poll: onePost })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.createPost = (req, res) => {
    Post.create(req.body)
        .then(newlyCreatedPost => {
            res.json({ poll: newlyCreatedPost })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.getOnePostAndUpdate = (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true}
    )
        .then(updatedPost => {
            res.json({ poll: updatedPost })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}
    
// module.exports.getOnePostAndAddReview = (req, res) => {
//             Post.findOneAndUpdate(
//                 { _id: req.params.id },
//                 { $push:{ reviews:req.body} },
//                 { new: true}
//             )
//                 .then(updatedPost => {
//                     res.json({ post: updatedPost })
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                     res.json({ message: 'Something went wrong', error: err })
//                 });}
 
// module.exports.deletePost = (req, res) => {
//     Post.deleteOne({ _id: req.params.id })
//         .then(result => {
//             res.json({ result: result })
//         })
//         .catch((err) => {
//             console.log(err)
//             res.json({ message: 'Something went wrong', error: err })
//         });}

