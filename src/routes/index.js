const { Router } = require("express");
const auth = require("../middlewares/auth");
const repo = require("../controller/repository/userRepository");
const services = require("../controller/services/userServices");

const router = Router();

router.post("/signup", services.signup);
router.post("/login", services.login);
router.get("/user/:userId", auth.allowIfLoggedIn, repo.getUser);
router.get("/users", auth.allowIfLoggedIn, auth.grantAccess("readAny", "profile"), repo.getUsers);
router.put(
  "/user/:userId",
  auth.allowIfLoggedIn,
  auth.grantAccess("updateAny", "profile"),
  repo.updateUser
);
router.delete(
  "/user/:userId",
  auth.allowIfLoggedIn,
  auth.grantAccess("deleteAny", "profile"),
  repo.deleteUser
);

module.exports = router;
