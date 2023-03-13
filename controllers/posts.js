const Post = require('../models/post.js');
const User = require('../models/user.js');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.user.id;
    
        const post = await Post.create({
          title,
          content,
          UserId: userId
        });
    
        res.status(201).json({ post });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    const updatePost = async (req, res) => {
      try {
        const { id } = req.params;
        const { title, content } = req.body;
    
        const post = await Post.findOne({ where: { id } });
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        const userId = req.session.user.id;
    
        if (post.UserId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
    
        post.title = title;
        post.content = content;
    
        await post.save();
    
        res.json({ post });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    const deletePost = async (req, res) => {
      try {
        const { id } = req.params;
    
        const post = await Post.findOne({ where: { id } });
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        const userId = req.session.user.id;
    
        if (post.UserId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
    
        await post.destroy();
    
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    const getAllPosts = async (req, res) => {
      try {
        const posts = await Post.findAll({
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            }
          ]
        });
    
        res.json({ posts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    const getPostById = async (req, res) => {
      try {
        const { id } = req.params;
    
        const post = await Post.findOne({
          where: { id },
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            }
          ]
        });
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.json({ post });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    module.exports = {
      createPost,
      updatePost,
      deletePost,
      getAllPosts,
      getPostById
    };