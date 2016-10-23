import React from 'react';
import Auth from '../modules/Auth';
import {FlatButton, Menu, MenuItem} from 'material-ui';
import {IndexLink, Link} from 'react-router';

const menubarStyle = {
  color: "white"
}

export default class MenuBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      LoggedInItems: [
      {
        name: "My Polls",
        path: "/polls/mypolls"
      },
      {
        name: "Logout",
        path: "/logout"
      },
    ],
    LoggedOutItems: [
    {
      name: "Login",
      path: "/login"
    },
    {
      name: "Signup",
      path: "/signup"
    },
    ]
    };
  }

  //   <Route path="/" component={PollList} />
  //   <Route path="/polls/mypolls" component={UserPolls} />
  //   <Route path="/polls/new" component={NewPoll} />
  //   <Route path="/polls/:formid" component={Poll} />
  // </Route>
  // <Route path="/login" component={LoginForm} />
  // <Route path="/signup" component={SignUpForm} />
  // </Route>
  // <Route path="/logout"

  render() {
    return (
      <div>
        { Auth.isUserAuthenticated()?
          (<div>
            <IndexLink to="/"><FlatButton style={menubarStyle} label="Home"/></IndexLink>
            {this.state.LoggedInItems.map(item => <Link to={item.path}><FlatButton style={menubarStyle} key={item.name} label={item.name}/></Link>)}
          </div>)
          :
          (<div>
            {this.state.LoggedOutItems.map(item => <Link to={item.path}><FlatButton style={menubarStyle} key={item.name} label={item.name}/></Link>)}
          </div>)
        }
      </div>
    );
  }
}
