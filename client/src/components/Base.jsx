import React from 'react';
import {Link, IndexLink} from 'react-router';
import {AppBar, IconButton, IconMenu, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuBar from './MenuBar.jsx'
import Attachment from 'material-ui/svg-icons/file/attachment';
import Auth from '../modules/Auth';

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
          <AppBar title="Polling App" style={appbarStyle} iconElementLeft={<IconButton><Attachment/></IconButton>} iconElementRight={<MenuBar />} />
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
