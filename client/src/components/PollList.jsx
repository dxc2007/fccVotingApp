import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
      <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>All Polls</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        this.state.polls.map(poll =>
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
