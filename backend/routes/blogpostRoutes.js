const express = require("express");
const blogpostController = require("../controllers/blogpostController");
const passport = require("passport");

const router = express.Router();

router.get("/", blogpostController.getBlogposts);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  blogpostController.getAllBlogposts
);
router.get("/:id", blogpostController.getBlogpostById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogpostController.createBlogpost
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  blogpostController.updateBlogpost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  blogpostController.deleteBlogpost
);
router.post("/:id/comments", blogpostController.addCommentToBlogpost);
router.delete(
  "/:id/comments/:commentId",
  blogpostController.deleteCommentFromBlogpost
);

module.exports = router;
