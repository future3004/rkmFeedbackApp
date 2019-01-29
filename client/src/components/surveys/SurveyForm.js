// SurveyForm shows a form for the user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
//import _ from 'lodash';

//import formFields from './formFields';


// const FIELDS = [
//   { label: 'Survey Title', name: 'title' },
//   { label: 'Subject Line', name: 'subject' },
//   { label: 'Email Body', name: 'body' },
//   { label: 'Recipient List', name: 'emails' }
// ];

class SurveyForm extends Component {
// Aonther way to do it, if you hate duplicate code

  // renderFields() {
  //   return _.map(FIELDS, field => {
  //     return (
  //       <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
  //     );
  //   });
  // }

  renderFields() {
    return (
      <div>
        <Field label="Survey Title" type="text" name="title" component={SurveyField}/>

        <Field label="Subject Line" type="text" name="subject" component={SurveyField}/>

        <Field label="Email Body" type="text" name="body" component={SurveyField}/>

        <Field label="Recipient List" type="text" name="recipients" component={SurveyField}/>
      </div>
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>

          <Link to="/surveys">
            <button className="red btn-flat left white-text">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    // here no title provided in form
    errors.title = "You must provide a title";
  }

  if (!values.subject) {
    errors.subject = "You must provide a survey subject";
  }

  if (!values.body) {
    errors.body = "You must provide some message to send out to your users";
  }

  // validate the emails
  errors.recipients = validateEmails(values.recipients || '');

// here we check if the emails field is not empty
  if (!values.recipients) {
    errors.emails = "You must provide emails to get feedback";
  }


  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

//<Field type="text" name="surveyTitle" component="input" />
