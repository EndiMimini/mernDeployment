const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: { 
        type: String,
        minLength: [2, 'The title should be more then 2 characters'],
        required: [true, 'The title is required']
    },
    content: { 
        type: String,
        minLength: [2, 'The content should be more then 2 characters'],
        required: [true, 'The content is required']
    },
    imageUrl: { 
        type: String,
        required: [true, 'The image is required']
    },
    reviews : [
        {
            text: {
                type: String
            },
            rating: {
                type: Number
            }
        }
    ]
   
}, { timestamps: true });
module.exports = mongoose.model('Post', PostSchema);