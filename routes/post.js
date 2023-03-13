const express = require('express');
const { createPost, updatePost, deletePost, getAllPosts, getPostById } = require('../controllers/posts.js');
const {requireAuth} = require('../middleware/auth.js');

const router = express.Router();

// new post
router.post('/', requireAuth, createPost);

// update post
router.put('/:id', requireAuth, updatePost);

// delete post
router.delete('/:id', requireAuth, deletePost);

// get all posts
router.get('/', getAllPosts);

// get post by id
router.get('/:id', getPostById);

module.exports = router;