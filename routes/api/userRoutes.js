const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriendById,
  removeFriendById
} = require("../../controllers/userController");

// /api/users

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

// /api/users/:userId


router
  .route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users/:userId/friends/:friendId


router
  .route("/:userId/friends/:friendId")
  .post(addFriendById)
  .delete(removeFriendById);

module.exports = router;
