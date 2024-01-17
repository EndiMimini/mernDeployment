const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/polls',authenticate,  PostController.getAllPosts);
    app.get('/api/polls/top3',authenticate, PostController.getTopThreePosts)
    app.post('/api/poll',authenticate, PostController.createPost);  
    app.get('/api/poll/:id',authenticate, PostController.getOnePost);
    app.put('/api/poll/:id',authenticate, PostController.getOnePostAndUpdate);
    // app.delete('/api/poll/:id', PostController.deletePost);
    app.patch('/api/poll/:id', authenticate, PostController.getOnePostAndUpdate);
}