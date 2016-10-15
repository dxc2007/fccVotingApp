import React from 'react';
// const Poll = require('mongoose').model('Poll');
//
// const poll = Poll.findOne({
//   name: this.props.location
// })

const poll = {
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
}

export default class Poll extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      poll
    }
  }

  componentDidMount() {
      console.log(this.state.poll);
    let xhr = new XMLHttpRequest();
    let pollName = this.props.routeParams.formName;
    console.log(pollName);
    xhr.open('get', 'polls/'+pollName,);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.responseType = 'json';
    xhr.onload = function() {
      let state = {};

      if (this.status == 200) {
        // success

        state.errorMessage = '';
        state.errors = {};
        state.poll = this.response.poll

        // change the component state
        this.setState(state);

        // change the current URL to /
        // history.replaceState(null, '/login');
      } else {
        // failure

        state.errorMessage = this.response.message;
        state.errors = this.response.errors ? this.response.errors : {};

        // change the component state
        self.setState(state);
      }
    };
    xhr.send();
  }

render() {


    return(
      <div>
        <form onSubmit={this.processForm.bind(this)}>
          {this.state.poll.options.map(option => <input type="radio" name={option} value={option} />)}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}

processForm(e) {
  e.preventDefault();
}
}
