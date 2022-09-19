const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function validatePassword(passwordHash, plainPassword) {
  return await bcrypt.compare(plainPassword, passwordHash);
}

exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const passwordHash = await hashPassword(password);

    const newUser = new User({
      email,
      password: passwordHash,
      role: role || "basic",
    });

    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    newUser.accessToken = accessToken;
    await newUser.save();

    res.json({
      data: newUser,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const error = "Invalid Email or Password";
  try {
    const { password, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return next(new Error(error));
    }

    const validPassword = await validatePassword(user.password, password);

    if (!validPassword) {
      return next(new Error(error));
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken });

    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
