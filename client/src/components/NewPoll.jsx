import React from 'react';
import {RaisedButton, TextField, CardText} from 'material-ui';
import {Link} from 'react-router';
import $ from "jquery";

import Auth from '../modules/Auth';

export default class NewPoll extends React.Component {

constructor(props) {
  super(props)

  this.state = {
    inputs: ['input-0', "input-1"],
    showOptions: true,
    feedback: "",
    title: "String",
    creator: Auth.getUserInfo(),
    options: [],
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
          </form>) :

          <div>
            <CardText>{this.state.feedback}</CardText>
              <Link to="/polls/mypolls">
                <RaisedButton label="Head to My Polls" secondary={true} />
              </Link>
          </div>
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
  let optionsArr = [];
  for (var ref in this.refs) {
    console.log(this.refs);
    console.log("Ref: %s", this.refs[ref]);
    let formValues = this.refs[ref].getValue();
    optionsArr.push(formValues);
    console.log(optionsArr.slice(1));
  };
  this.setState({ options: optionsArr.slice(1)},
      this.setState({ title: this.refs.title.getValue() },
      this.sendPoll.bind(this)));
  }

  sendPoll() {
    for (var option in this.state.options) {
      console.log("Form Temp options: ", this.state.options[option]);
    }
    console.log("title: %s", this.state.title);
    console.log("creator: %s", this.state.creator);
    console.log("options: %s",  this.state.options);
    let poll = 'title=' + this.state.title
        + '&creator=' + this.state.creator
        + '&options=' + this.state.options;
    console.log("Submitting the following new poll: %j", this.state);
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
