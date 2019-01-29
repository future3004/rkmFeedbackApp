// SurveyField contains logic to render a single
// label and text input
import React, { Component } from 'react';

class SurveyField extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    //console.log(this.props.input);
    //console.log(this.props.meta);
    return(
      <div>
        <label>{this.props.label}</label>
        <input {...this.props.input} style={{ marginBottom: '5px'}}/>
        <div className="red-text" style={{ marginBottom: '20px' }}>
        {this.props.meta.touched && this.props.meta.error}
        </div>
      </div>
    );
  }
}

export default SurveyField;

// could have also had this type of SurveyField class
// code

// import React from 'react';
//
// export default ({ input, label }) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <input {...input}/>
//     </div>
//   );
// };
