const PostController = require('../controllers/post.controller');
module.exports = (app) => {
    app.get('/api/posts', PostController.getAllPosts);
    app.post('/api/post', PostController.createPost);  
    app.get('/api/post/:id', PostController.getOnePost);
    app.put('/api/post/:id', PostController.getOnePostAndUpdate);
    app.delete('/api/post/:id', PostController.deletePost);
    app.patch('/api/post/review/:id', PostController.getOnePostAndAddReview);
}