const express = require('express');
const { createComment, deleteComment } = require('../controllers/comments.js');

const router = express.Router();

// post comment
router.post('/', createComment);

// delete comment
router.delete('/:id', deleteComment);

module.exports = router;