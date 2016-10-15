import React from 'react';
import {Card, CardTitle} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const style = {
  margin: 12,
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
      <Card className="container">
        <CardTitle title="React Application" subtitle="This is the home page." />
          <Link to="/polls/new">
            <RaisedButton label="Create" primary={true} style={style} />
          </Link>
          <Link to="/polls/mypolls">
            <RaisedButton label="My Polls" secondary={true} style={style} />
          </Link>
            {this.props.children}
      </Card>
    );
  }

}
Home.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Home;
