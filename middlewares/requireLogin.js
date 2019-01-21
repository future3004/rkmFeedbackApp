module.exports = (req, res, next) => {
  if (!req.user) {
    // user is not signed in, can't add credits
    return res.status(401).send({ error: 'You are NOT Logged in, login to continue'});
  }

  next();
};
