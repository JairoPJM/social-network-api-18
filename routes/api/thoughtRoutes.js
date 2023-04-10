const router = require("express").Router();

const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateExistingThought,
  deleteExistingThought,
  createNewReaction,
  deleteExistingReaction
} = require("../../controllers/thoughtController");

// /api/thoughts
router
  .route("/")
  .get(getAllThoughts)
  .post(createNewThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateExistingThought)
  .delete(deleteExistingThought);

// /api/thoughts/:thoughtId/reactions


router
  .route("/:thoughtId/reactions")
  .post(createNewReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId


router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteExistingReaction);

module.exports = router;
