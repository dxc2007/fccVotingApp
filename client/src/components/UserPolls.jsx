import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import {RaisedButton, FlatButton, CardTitle, Divider, Subheader} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Auth from '../modules/Auth';

const myPolls = [];

const buttonStyle = {
  textAlign: "center",
  margin: 12
};

export default class UserPolls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myPolls,
      userHasPolls: true
    }
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    let username = Auth.getUserInfo();
    let self = this;
    console.log(username);
    xhr.open('get', '/polls/user/'+username,);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (this.status == 200) {
        self.setState({myPolls: this.response.data});
      } else {
        console.log(this.response.error);
      }
    };
    xhr.send();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const newPolls = this.state.myPolls;
  //   // console.log("b4", originalPoll.length);
  //   // console.log("after", newPolls.length);
  //   // console.log(originalPoll.length == newPolls.length);
  //   console.log(newPolls.length == 0);
  //   if (newPolls.length == 0) {
  //     this.setState({userHasPolls: false})
  //   }
  // }

  render() {
    return (
      <div>
        <CardTitle title={Auth.getUserInfo()} />
        <Link to="/polls/new">
          <RaisedButton label="Create" primary={true} style={buttonStyle}/>
        </Link>
        <Link to="/polls/mypolls">
          <RaisedButton label="My Polls" secondary={true} style={buttonStyle} />
        </Link>
  <List className="list">
    <Subheader>Your polls</Subheader>
          {this.state.myPolls.map(poll => <Link to={"/polls/" + poll._id}>
            <Divider />
            <ListItem primaryText={poll.title}
              rightIconButton={<RaisedButton style={buttonStyle} label="Delete" onClick={this.delete.bind(this, poll.title)}/>} />
          </Link>
        )
      }
  </List>
  </div>

)}

delete(title, e) {
  e.preventDefault();
  // console.log(title);
  const pollTitle = 'title=' + title;
  // console.log(pollTitle);
  let xhr = new XMLHttpRequest();
  xhr.open('post', '/polls/delete');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.send(pollTitle);
  let polls = this.state.myPolls.slice();
  // console.log(polls);
  function filterPoll(val) {
    // console.log("Poll details are", val);
    // console.log("Title is", pollTitle);
    if(val.title !== title) {
      return true;
    } else {
      return false;
    }
  }
  let newPolls = polls.filter(filterPoll);
  // console.log(newPolls);
  this.setState({
    myPolls: newPolls
  });
  // console.log(this.state.myPolls);
}
}
