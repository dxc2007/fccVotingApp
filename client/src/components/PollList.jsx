import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const polls = [{
  title: "What's your favourite song?",
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
  title: "Color?",
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
