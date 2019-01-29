const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // all the routes on server for survey
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const user_surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false });

    res.send(user_surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send("Thanks for the feedback! It is very much appreciated!!");
  });

  app.post('/api/surveys/webhooks', (req, res) => {
  //  console.log(req.body);
  //  res.send({});
    const path = new Path('/api/surveys/:surveyId/:choice');

    // const events = _.map(req.body, (event) => {
    //   const pathname = new URL(event.url).pathname;
    //
    //   //console.log(path.test(pathname));
    //   const match = path.test(pathname);
    //
    //   if (match) {
    //     return (
    //       {
    //         email: event.email,
    //         surveyId: match.surveyId,
    //         choice: match.choice
    //       }
    //     );
    //   }
    //
    //   //console.log("Events before more refine: " + events);
    //   // remove the undefined records
    //   const compactEvents = _.compact(events);
    //
    //   // remove the redudant(exact same) click events
    //   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    //
    //   //console.log(uniqueEvents);
    //   const finalEvents = _.each(uniqueEvents, event => {
    //     // here is a mongoDb query to find a particular survey
    //     // and update it
    //     Survey.updateOne({
    //       id: surveyId,
    //       recipients: {
    //         $elemMatch: { email: email, responded: false}
    //       }
    //     }, {
    //       $inc: { [choice]: 1 },
    //       $set: { 'recipients.$.responded': true}
    //     })
    //   });
      // can use lodash chain(_.chain(value)...) helper function to reduce code lines

      _.chain(req.body)
        .map(({ email, url }) => {
          const match = path.test(new URL(url).pathname);
          if (match) {
            return (
              {
                email: email,
                surveyId: match.surveyId,
                choice: match.choice
              }
            );
          }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          // here is a mongoDb query to find a particular survey
          // and update it
              Survey.updateOne(
                {
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false}
                }
              },
              {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true},
                lastResponded: new Date()
              }
            ).exec();
        })
        .value();

      res.send({});
    });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      body: body,
      subject: subject,
      recipients: recipients.split(',').map(email => {
        return { email: email.trim() }
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });



    // send an email using the Mailer
    const mailer = new Mailer(survey, surveyTemplate(survey));

   try {
     // send the mail feedback
     await mailer.send();

     // save survey to mongo db
     await survey.save();

     // take away the credits from user account
     // for sending mail feedback (here we take away 1 credit)
     req.user.credits -= 1;
     const user = await req.user.save();

     res.send(user);

   } catch (err) {
     res.status(422).send(err);

   }


  });
};
