const PostController = require('../controllers/post.controller');
module.exports = (app) => {
    app.get('/api/polls', PostController.getAllPosts);
    app.get('/api/polls/top3', PostController.getTopThreePosts)
    app.post('/api/poll', PostController.createPost);  
    app.get('/api/poll/:id', PostController.getOnePost);
    app.put('/api/poll/:id', PostController.getOnePostAndUpdate);
    // app.delete('/api/poll/:id', PostController.deletePost);
    // app.patch('/api/post/review/:id', PostController.getOnePostAndAddReview);
}