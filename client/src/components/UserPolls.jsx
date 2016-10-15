import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Auth from '../modules/Auth';

const myPolls = [];

export default class UserPolls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myPolls
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          this.state.myPolls.map(poll =>
        <TableRow key={poll.title}>
          <TableRowColumn>
            <Link to={poll.title}>
              {poll.title}
            </Link>
          </TableRowColumn>
        </TableRow>)
      }
      </TableBody>
    </Table>

          </div>

    )
  }

}

UserPolls.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
