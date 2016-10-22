import React from 'react';
import {RaisedButton, FlatButton, TextField, CardText} from 'material-ui';
import {Chart} from 'chart.js';

export default class AddOption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toAdd: false,
      option: ""
    }
  }

  render() {
    return (
    <div>
      {this.state.toAdd ? ( <div>
        <TextField ref="addOption" floatingLabelText="Option" />
        <RaisedButton label="Confirm" primary={true} onClick={this.processForm.bind(this)}/>
        </div>
          ) : (<RaisedButton label="Add Option" onClick={this.toggleAdd.bind(this)}/>)
        }
    </div>
    )
  }

  toggleAdd() {
    this.setState({ toAdd: true });
  }

  processForm(e) {
    e.preventDefault();
    const newOption = this.refs.addOption.getValue();
    const poll = this.props.poll.title;
    let vote = 'option=' + newOption + "&title=" + poll;
    console.log("Submmiting the following vote: %s", vote);
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/polls/addoption');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.send(vote);
    console.log("Add option submitted!");
    this.setState({ option: newOption }, this.renderPoll.bind(this));
    this.setState({ toAdd: false });
  }

  renderPoll() {
    let xhr = new XMLHttpRequest();
    console.log(this.props);
    let pollId = this.props.poll._id;
    let self = this;
    console.log(this.props);
    console.log(pollId);
    xhr.open('get', '/polls/details/'+pollId,);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (this.status == 200) {
        // change the component state
        // console.log(this.response.data);
        self.props.renderPoll(this.response.data);
        // console.log(self.state.poll);
        // change the current URL to /
        // history.replaceState(null, '/login');
      } else {
        // failure
        console.log(this.response.error);
      }
    };
    xhr.send();
  }
}
