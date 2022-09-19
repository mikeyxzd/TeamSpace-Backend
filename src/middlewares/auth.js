const { roles } = require("../controller/repository/rolesRepository");

exports.grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);

      if (!permission.granted) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

exports.allowIfLoggedIn = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;

    if (!user) {
      return res.status(401).json({
        error: "You aint logged in",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
