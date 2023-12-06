// create web server
// return all comments in database
// return all comments for a specific post
// add a new comment
// delete a comment
// update a comment
// return a specific comment

// import express
const express = require("express");
// import router
const router = express.Router();
// import Post model
const Post = require("../models/Post");
// import Comment model
const Comment = require("../models/Comment");

// return all comments in database
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// return all comments for a specific post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// add a new comment
router.post("/", async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    post: req.body.post,
  });

  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const removedComment = await Comment.remove({
      _id: req.params.commentId,
    });
    res.json(removedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// update a comment
router.patch("/:commentId", async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne(
      {
        _id: req.params.commentId,
      },
      {
        $set: {
          content: req.body.content,
        },
      }
    );
    res.json(updatedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// return a specific comment
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
