import React from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Auth from '../modules/Auth';


class Dashboard extends React.Component {

  /**
   * Class constructor.
   */
  constructor() {
    super();

    this.state = {
      secretData: ''
    };
  }

  /**
   * This method will be executed after the initial rendering.
   */
  componentDidMount() {
    let self = this;

    let xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', 'bearer ' + Auth.getToken());
    xhr.responseType = 'json';
    xhr.onload = function() {
      let state = {};

      if (this.status == 200) {
        state.secretData = this.response.message;
        self.setState(state);
     }

    };
    xhr.send();
  }

  /**
   * Render the component.
   */
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
}

  render() {
    return (
      <Card className="container">
        <CardTitle title="Dashboard" subtitle="You should get access to this page only after authentication." />

        {this.state.secretData && <CardText style="">{this.state.secretData}</CardText>}

      </Card>
    );
  }



}

Dashboard.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Dashboard;
