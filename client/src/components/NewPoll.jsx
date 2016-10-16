import React from 'react';
import {RaisedButton, TextField, CardText} from 'material-ui';
import $ from "jquery";

import Auth from '../modules/Auth';

let pollTemplate = {
  title: "String",
  creator: Auth.getUserInfo(),
  options: [],
}

export default class NewPoll extends React.Component {

constructor(props) {
  super(props)

  this.state = {
    inputs: ['input-0', "input-1"],
    formOptions: [],
    showOptions: true,
    feedback: ""
  }
}

render() {
  console.log("User Info: %s", Auth.getUserInfo());
    return(
      <div>
        { this.state.showOptions ?
          (<form action="/" onSubmit={this.processForm.bind(this)}>
            <h2 className="card-heading">Create New Poll</h2>
            <TextField ref="title" floatingLabelText="Title" />
              { this.state.inputs.map(input =>
                <p>
                  <TextField ref={input} key={input} floatingLabelText="Option" />
                </p>
              )}
              <div className="button-line">
                <RaisedButton onClick={this.appendInput.bind(this)} label="Add Option" />
                <RaisedButton type="submit" label="Submit" primary={true} />
              </div>
          </form>) : <CardText>{this.state.feedback}</CardText>
        }
      </div>
    )}

processForm(event) {
  event.preventDefault();
  // let optionArr = [];
  // for (var ref in this.state.formOptions) {
  //      console.log("Form options: %s", this.state.formOptions[ref]);
  //      optionArr.push(this.state.formOptions[ref]);
  // }
  // let optionArr = [];
  for (var ref in this.refs) {
    console.log(this.refs);
    console.log("Ref: %s", this.refs[ref]);
    let formValues = this.refs[ref].getValue();
    let currentValues = this.state.formOptions;
    console.log(currentValues);
    console.log(this.state.formOptions);
    this.setState({currentValues: this.state.formOptions.push(formValues)});
    console.log(this.state.formOptions.slice(1));
  };
  pollTemplate.title = this.refs.title.getValue();
  // this.state.inputs.map(field => this.state.formOptions.append(this.refs.field.getValue()));
  //yes it works!!!
  pollTemplate.options = this.state.formOptions.slice(1);
  for (var option in pollTemplate.options) {
    console.log("Form Temp options: ", pollTemplate.options[option]);
  }
  // const newPoll = new Poll(pollTemplate);
  // create a string for an HTTP body message
  console.log("title: %s", pollTemplate.title);
  console.log("creator: %s", pollTemplate.creator);
  // console.log("poll: " + this.state.inputs);
  console.log("options: %s",  pollTemplate.options);
  let poll = 'title=' + pollTemplate.title
           + '&creator=' + pollTemplate.creator
           + '&options=' + pollTemplate.options;

  // create an AJAX request
    // let poll = pollTemplate;
  console.log("Submmiting the following new poll: %j", pollTemplate);
  // $.ajax({
  //   type: "POST",
  //   url: "/polls/newpoll",
  //   data: pollTemplate,
  // }).done(function(data) {
  //   console.log(data);
  //   //light up sucess. hide button etc.
  // }).fail(function(error) {
  //   console.log(error);
  // });
  let xhr = new XMLHttpRequest();
  xhr.open('post', '/polls/newpoll');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.send(poll);
  this.setState({ feedback : "Oh yeah it's done!" });
  this.setState({ showOptions : false });
  }

  appendInput() {
    let newInput = 'input-'+ this.state.inputs.length;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  }
}
