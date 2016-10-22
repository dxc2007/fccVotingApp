import React from 'react';
import {Card, CardTitle} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const style = {
  textAlign: "center",
  margin: 12
};

class Home extends React.Component {

  /**
   * Render the component.
   */
   getChildContext() {
     return { muiTheme: getMuiTheme(baseTheme) };
 }

  render() {
    return (
      <div>
      <Card style={style}>
            {this.props.children}
      </Card>
      </div>
    );
  }

}
Home.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Home;
