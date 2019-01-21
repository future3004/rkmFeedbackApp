const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Emaily App $5 for 5 credits',
      source: req.body.id
    });

    //console.log(charge);
    // get access to user model and add credits to their accout
    // save to db
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
