import React from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Auth from '../modules/Auth';

const myPolls = [];

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
        <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>My Polls</TableHeaderColumn>
          <TableHeaderColumn>Options</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          this.state.myPolls.map(poll =>
        <TableRow key={poll.title}>
          <TableRowColumn>
            <Link to={"/polls/" + poll.title}>
              {poll.title}
            </Link>
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton secondary={true} onClick={this.delete.bind(this)} label="Delete"></RaisedButton>
          </TableRowColumn>
        </TableRow>)
      }
      </TableBody>
    </Table>
  </div>
)}

  delete(e) {
    e.preventDefault();
  }

}
