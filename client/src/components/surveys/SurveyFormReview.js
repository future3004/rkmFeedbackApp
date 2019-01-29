// SurveyFormReview lets users confirm their
// Survey Feedback entries/input
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please Confirm your Survey Feedback Entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat left white-text" onClick={onCancel} style={{ marginTop: '10px'}}>
        Back
      </button>

      <button onClick={() => submitSurvey(formValues, history)} className="green right btn-flat white-text" style={{ marginTop: '10px'}}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// we use a function to pull data out of
// the redux store; name of the function is
// not important here
function mapStateToProps(state) {
  //console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

// function functionName() {
//   <div>
//     <div>
//       <label>Survey Title</label>
//       <div>{formValues.title}</div>
//     </div>
//
//     <div>
//       <label>Subject Line</label>
//       <div>{formValues.subject}</div>
//     </div>
//
//     <div>
//       <label>Email Body</label>
//       <div>{formValues.body}</div>
//     </div>
//
//     <div>
//       <label>Recipient Emails List</label>
//       <div>{formValues.emails}</div>
//     </div>
//   </div>
// }
