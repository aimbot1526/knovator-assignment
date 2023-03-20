const Post = require('../models/Post');
const User = require('../models/User')

exports.Create = async (req, res) => {
    const { title, body, status, coordinates } = req.body;
    const user = await User.findOne({ _id: req.params.id })
    if(!user) res.status(400);
    const newPost = await Post.create({
        title: title,
        body: body,
        createdBy: user,
        status: status,
        location: {
            type: "Point",
            coordinates: coordinates
        }
    })
    if(newPost) {
        res.status(200).send(newPost);
    } else {
        res.status(400);
    }
}

exports.View = async (req, res) => {
    const post = Post.findOne({ _id: req.params.id })
    if(!post) res.status(400);
    res.status(200).send(post);
}

exports.Update = async (req, res) => {
    const post = req.body;
    const id = req.params.id;
    try {
        if(post.title !== undefined && post.title !== '') {
            await Post.updateOne(
                { _id: id },
                { title: post.title }
            )
        }
        if(post.body !== undefined && post.body !== '') {
            await Post.updateOne(
                { _id: id },
                { body: post.body }
            )
        }
        if(post.status !== undefined && post.status !== '') {
            await Post.updateOne(
                { _id: id },
                { status: post.status }
            )
        }
        if(post.location.coordinates !== undefined && post.location.coordinates !== '') {
            const coordinates = { location: { coordinates: post.location.coordinates } };
            console.log(coordinates)
            await Post.updateOne(
                { _id: id },
                { location: { coordinates: coordinates } }
            )
        }
    } catch (error) {
        console.log(error)
    }
    return res.json({
        title: post.title,
        body: post.body,
        status: post.status,
        location: {
            coordinates: post.location.coordinates
        }
    })
}