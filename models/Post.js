var mongoose = require('mongoose');
var Schema = mongoose.Schema;

postSchema = new Schema({
    title: String,
    body: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
}, { versionKey: false });

Post = mongoose.model('Post', postSchema);

module.exports = Post;