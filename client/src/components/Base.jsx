import React from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import {AppBar, IconButton, IconMenu, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuBar from './MenuBar.jsx'
import Attachment from 'material-ui/svg-icons/file/attachment';
import Auth from '../modules/Auth';
import injectTapEventPlugin from "react-tap-event-plugin";
import createHistory from 'history/createBrowserHistory';


 //Needed for onTouchTap
 //Can go away when react 1.0 release
 //Check this repo:
 //https://github.com/zilverline/react-tap-event-plugin
 injectTapEventPlugin();
 const history = createHistory();

const appbarStyle = {
  color: "black"
}

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
          <AppBar title="Polling App" style={appbarStyle} iconElementLeft={<IconButton onClick={this.handleClick.bind(this)}><Attachment/></IconButton>} iconElementRight={<MenuBar />} />
        </div>
        {this.props.children}
        </div>
    );
  }
  handleClick(e) {
    e.preventDefault();
    browserHistory.push('/')
    console.log("works");

  }
}



Base.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Base;
