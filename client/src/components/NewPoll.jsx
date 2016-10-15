import React from 'react';
import {Card, CardTitle, CardText, RaisedButton, TextField} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
    formOptions: []
  }
}

getChildContext() {
  return { muiTheme: getMuiTheme(baseTheme) };
}

render() {
  console.log("User Info: %s", Auth.getUserInfo());
    return(
      <Card className="container">
        <form action="/" onSubmit={this.processForm.bind(this)}>
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
        </form>
      </Card>
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
    // console.log("Ref: %s", this.refs[ref]);
    // optionArr.push(this.refs[ref].getValue());
    let copyFormOptions = this.state.formOptions;
    this.setState({formOptions: copyFormOptions.push(this.refs[ref].getValue())})
    // console.log(optionArr.slice(1));
    console.log(this.state.formOptions.slice(1));
  };
  pollTemplate.title = this.refs.title.getValue();
  // this.state.inputs.map(field => this.state.formOptions.append(this.refs.field.getValue()));
  //yes it works!!!
  pollTemplate.options = this.state.formOptions.slice(1);
  // const newPoll = new Poll(pollTemplate);
  // create a string for an HTTP body message
  console.log("title: %s", pollTemplate.title);
  console.log("creator: %s", pollTemplate.creator);
  console.log("poll: " + this.state.inputs);
  console.log("options: " + pollTemplate.options);
  let poll = 'title=' + pollTemplate.title
           + '&creator=' + pollTemplate.creator
           + '&options=' + pollTemplate.options;
  // create an AJAX request
  console.log("Submmiting the following new poll: %j", poll);
  let xhr = new XMLHttpRequest();
  xhr.open('post', '/polls/newpoll');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.send(poll);
  }

  appendInput() {
    let newInput = 'input-'+ this.state.inputs.length;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
    this.setState({ formOptions: this.state.inputs });
  }
}

NewPoll.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
