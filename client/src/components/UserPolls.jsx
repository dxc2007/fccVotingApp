import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import {RaisedButton, CardTitle, Divider, Subheader} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Auth from '../modules/Auth';

const myPolls = [];

const buttonStyle = {
  textAlign: "center",
  margin: 12
};

const listStyle = {
  fontWeight: "normal"

}

export default class UserPolls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myPolls
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
        // change the component state
        self.setState({myPolls: this.response.data});
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
    return (
      <div>
        <CardTitle title={Auth.getUserInfo()} />
        <Link to="/polls/new">
          <RaisedButton label="Create" primary={true} style={buttonStyle}/>
        </Link>
        <Link to="/polls/mypolls">
          <RaisedButton label="My Polls" secondary={true} style={buttonStyle} />
        </Link>
  <List style={listStyle}>
    <Subheader>Your polls</Subheader>
    {
      this.state.myPolls.map(poll =>
        <Link to={"/polls/" + poll._id}>
          <Divider />
          <ListItem key={poll.title} primaryText={poll.title} />
        </Link>
      )
  }
  </List>
  </div>
)}
}
