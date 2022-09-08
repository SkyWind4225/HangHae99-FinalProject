const express = require("express");
const router = express.Router();
const Comment = require("../controllers/comments.controller");
const AuthMiddleware = require("../middlewares/auth-middleware");
const CommentController = new Comment();
//나중에 유저에서 include 찾아서 nickname이랑 profile 넣어줘야함
//댓글 개수도 표현해줘야함 comment.length??or findandCountAll
// /comment 루트로들어와

// query로 받을때 주소는 "/?"
router
  .route("/:postId")
  .post(AuthMiddleware, CommentController.insertComment)
  .get(CommentController.getComment);
router
  .route("/:commentId")
  .put(AuthMiddleware, CommentController.editComment)
  .delete(AuthMiddleware, CommentController.deleteComment);

// router.route("/?").get(CommentController.getCommentT);

router
  .route("/:commentId/:recommentId")
  .post(AuthMiddleware, CommentController.insertRecomment)
  .get(CommentController.getRecomment);
router
  .route("/:commentId/:recommentId")
  .put(AuthMiddleware, CommentController.editRecomment)
  .delete(AuthMiddleware, CommentController.deleteRecomment);

module.exports = router;
