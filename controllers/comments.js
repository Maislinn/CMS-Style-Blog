const Comment = require('../models/comment');

const createComment = async (req, res) => {
    try {
        const { postID, content } = req.body;
        const userId = req.session.user.id;
        const comment = await Comment.create({
            content,
            postID,
            userId
        });
        res.status(201).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.destroy({ where: { id } });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createComment,
    deleteComment
};