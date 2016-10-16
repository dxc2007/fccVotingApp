import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {RaisedButton, CardText} from 'material-ui';

const poll = {
  title: "What's your favourite song?",
  creator: "someguy",
  options: [
    "yesterday once more",
    "Billie Jean",
    "Love Songs"
  ],
  votes: {
    "yesterday once more": 1,
    "Billie Jean": 0,
    "Love Songs": 10
  }
}

export default class Poll extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      poll,
      showResults: true,
      option: ""
    }
  }

  componentDidMount() {
    // console.log(this.state.poll);
    let xhr = new XMLHttpRequest();
    // console.log(this.props);
    let pollName = this.props.params.formname;
    let self = this;
    // console.log(pollName);
    xhr.open('get', '/polls/details/'+pollName,);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (this.status == 200) {
        // change the component state
        // console.log(this.response.data);
        self.setState({poll: this.response.data});
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

render() {
    return(
        <div>
        {this.state.showResults ? (
        <form action="/" onSubmit={this.processForm.bind(this)} >
          <h2 className="card-heading">{this.state.poll.title}</h2>
  <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" ref="radioGroup">
    {this.state.poll.options.map(option =>
    <RadioButton key={option} label={option} ref={option} value={option} />)}
  </RadioButtonGroup>
  <p><RaisedButton type="submit" label="Submit"/></p>
        </form>)
      : <CardText>You have selected: {this.state.option}</CardText>}
      </div>
    )}

processForm(e) {
  e.preventDefault();
  let option = this.refs.radioGroup.state.selected
  console.log(this.refs.radioGroup.state.selected);
  // for (var ref in this.refs) {
  //   console.log(ref);
  // }
  let vote = 'option=' + option +
              '&title=' + this.state.poll.title;
  // create an AJAX request
  console.log("Submmiting the following vote: %s", option);
  let xhr = new XMLHttpRequest();
  xhr.open('post', '/polls/newvote');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.send(vote);
  console.log("submitted!");
  this.setState({ option: option });
  this.setState({ showResults: false });
}
}
