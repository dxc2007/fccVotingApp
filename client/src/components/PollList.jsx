import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import {RaisedButton, CardTitle, Divider, Subheader} from 'material-ui';

const polls = [{
  title: "Hang on man",
  creator: "someguy",
  options: [
    "yesterday once more",
    "Billie Jean",
    "Love Songs"
  ],
  votes: {
    "yesterday once more": 1,
    "Billie Jean": 0,
    "Love Songs": 10
  }
},
{
  title: "It's coming very soon",
  creator: "dxc2007",
  options: [
    "Blue",
    "Black",
    "Purple"
  ],
  votes: {
    "Blue": 3,
    "Black": 0,
    "Purple": 10
  }
}
]

const buttonStyle = {
  textAlign: "center",
  margin: 12
};

const listStyle = {
  fontWeight: "normal"

}

export default class PollList extends React.Component {

constructor(props) {
  super(props);

  this.state = {
    polls
  }
}

componentDidMount() {
  let xhr = new XMLHttpRequest();
  let self = this;
  xhr.open('get', '/polls/showall',);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.onload = function() {
    if (this.status == 200) {
      self.setState({polls: this.response.data});
    } else {
      console.log(this.response.error);
    }
  };
  xhr.send();
}

render() {
  return (
    <div>
      <CardTitle title="All Polls" />
        <Link to="/polls/new">
          <RaisedButton label="Create" primary={true} style={buttonStyle}/>
        </Link>
        <Link to="/polls/mypolls">
          <RaisedButton label="My Polls" secondary={true} style={buttonStyle} />
        </Link>
        <List style={listStyle}>
          <Subheader>All polls</Subheader>
          {
            this.state.polls.map(poll =>
              <Link to={"/polls/" + poll._id}>
                <Divider />
                <ListItem key={poll.title} primaryText={poll.title} />
              </Link>
            )
        }
        </List>
</div>
)
}
}
