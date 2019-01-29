module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Zero Credits left in your account, buy more credits to send a survey!!'});
  }

  next();
};
