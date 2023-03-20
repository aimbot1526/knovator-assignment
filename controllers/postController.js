const Post = require('../models/Post');
const User = require('../models/User')

exports.Create = async (req, res) => {
    const { title, body, status, coordinates } = req.body;
    const user = await User.findOne({ _id: req.params.id })
    if (!user) res.status(400);
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
    if (newPost) {
        res.status(200).send(newPost);
    } else {
        res.status(400);
    }
}

exports.View = async (req, res) => {
    const post = Post.findOne({ _id: req.params.id })
    if (!post) res.status(400);
    res.status(200).send(post);
}

exports.Update = async (req, res) => {
    const post = req.body;
    const id = req.params.id;
    try {
        if (post.title !== undefined && post.title !== '') {
            await Post.updateOne(
                { _id: id },
                { title: post.title }
            )
        }
        if (post.body !== undefined && post.body !== '') {
            await Post.updateOne(
                { _id: id },
                { body: post.body }
            )
        }
        if (post.status !== undefined && post.status !== '') {
            await Post.updateOne(
                { _id: id },
                { status: post.status }
            )
        }
        if (post.location.coordinates !== undefined && post.location.coordinates !== '') {
            await Post.updateOne(
                { _id: id },
                {
                    location: {
                        type: "Point",
                        coordinates: post.location.coordinates
                    }
                }
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

exports.Delete = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    if(!post) res.status(400).send();
    await Post.deleteOne({ _id: post._id })
    res.status(200).send("Deleted Successfully.")
};

exports.findByCoordinates = async (req, res) => {
    const post = await Post.findOne({
        location: {
            type: "Point",
            coordinates: req.body.coordinates
        }
    })
    if(!post) res.status(400).send()
    res.status(200).send(post)
}

exports.postCount = async (req, res) => {
    const inactivePosts = await Post.countDocuments({ status: "Inactive" })
    const activePosts = await Post.countDocuments({ status: "Active" })
    if(!inactivePosts && !activePosts) res.status(400).send()
    res.status(200).json({
        activePosts: activePosts,
        inactivePosts: inactivePosts
    })
}