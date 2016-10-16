import React from 'react';
import {Link, IndexLink} from 'react-router';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Auth from '../modules/Auth';

class Base extends React.Component {
  /**
   * Render the component.
   */
   getChildContext() {
     return { muiTheme: getMuiTheme(baseTheme) };
 }


  render() {
    return (
      <div>
        <div>
          <AppBar title="Polling App" iconClassNameRight="muidocs-icon-navigation-expand-more">

            
                    <IndexLink to="/">React App</IndexLink>
                     <Link to="/polls/randomName">Polls</Link>
                     <Link to="/polls/new">NewPoll</Link>
                     <Link to="/polls/mypolls">UserPolls</Link>


                   {Auth.isUserAuthenticated() ? (

                       <div><Link to="/logout">Log out</Link></div>

                   ) : (
                     <div><Link to="/login">Log in</Link>
                     <Link to="/signup">Sign up</Link></div>


                   )}

               </AppBar>
        </div>

        {this.props.children}
      </div>
    );
  }
}

Base.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Base;
