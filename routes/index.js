const express = require('express');
const postController = require('../controllers/posts.js');
const commentController = require('../controllers/comments.js');
const {requiresAuth} = require('../middleware/auth.js');
const router = express.Router();

// posts
router.get('/', async (req, res) => {
    await res.render('posts/home')})

router.get('/auth/login', async (req, res) => {
    await res.render('auth/login')})

router.get('/auth/register', async (req, res) => {
    await res.render('auth/register')})

router.get('/dashboard', requiresAuth, async (req, res) => {
    await res.render('dashboard')})

module.exports = router;

