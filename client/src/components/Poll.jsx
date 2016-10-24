import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {RaisedButton, FlatButton, CardTitle, Subheader} from 'material-ui';
import {Link} from 'react-router';
import ChartView from './ChartView.jsx';
import AddOption from './AddOption.jsx';
import Auth from '../modules/Auth';

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

const pollOptionsStyle = {
  width: "40%",
  display: "block",
  margin: "0 auto"
}

const buttonStyle = {
  textAlign: "center",
  margin: 12
};

export default class Poll extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      poll,
      showResults: true,
      option: "",
      formErrorText: "",
      href: "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href,
      deleted: false,
      data: [],
      value: 1
    }
  }

  componentWillMount() {
    let xhr = new XMLHttpRequest();
    // console.log(this.props);
    let pollId = this.props.params.formid;
    let self = this;
    // console.log(this.props);
    // console.log(pollId);
    xhr.open('get', '/polls/details/'+pollId,);
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
        <div style={pollOptionsStyle}>
          <CardTitle title={this.state.poll.title} />
          {Auth.isUserAuthenticated() ?
              <AddOption poll={this.state.poll} renderPoll={this.renderPoll.bind(this)}/>
              :
              null
          }

        {this.state.showResults ? (
<div>
  <form action="/" onSubmit={this.processForm.bind(this)} >
    <RaisedButton secondary={true} type="submit" label="Submit"/>
      <a href={this.state.href} target="_blank"><RaisedButton style={buttonStyle} icon={<i className='fa fa-facebook-square fa-2x' />} label="FB this">
        </RaisedButton></a>
    {this.state.formErrorText && <p className="error-message">{this.state.formErrorText}</p>}
<RadioButtonGroup name="shipSpeed" ref="radioGroup">
{this.state.poll.options.map(option =>
<RadioButton key={option} label={option} ref={option} value={option} />)}
</RadioButtonGroup>
</form>
</div>

  )
      : <ChartView
      option={this.state.option}
      poll={this.state.poll}
      data={this.state.data}
      />}
    </div>

    )}

processForm(e) {
  e.preventDefault();
  let currentPoll = Object.assign({}, this.state.poll);
  console.log(currentPoll);
  let option = this.refs.radioGroup.state.selected
  if (option === "") {
    this.setState({ formErrorText: "Please select an option!"});
    return "was hoping for that";
  }
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
  if (currentPoll.votes[option] === undefined) {
    currentPoll.votes[option] = 1;
  } else {
    currentPoll.votes[option] += 1;
  }
  console.log(currentPoll);
  this.setState({ poll: currentPoll });
  this.setState({ showResults: false });
}

delete(e) {
  e.preventDefault();
  console.log(this.state.poll);
  const pollTitle = 'title=' + this.state.poll.title;
  let xhr = new XMLHttpRequest();
  xhr.open('post', '/polls/delete');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.send(pollTitle);
  this.setState({ deleted: true });
  replaceState(null, '/polls/mypolls');
}

  renderPoll(data) {
    this.setState({ poll: data });
  }

}
