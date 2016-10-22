import Base from '../components/Base.jsx';
import Home from '../components/Home.jsx';
import Poll from '../components/Poll.jsx';
import PollList from '../components/PollList.jsx';
import UserPolls from '../components/UserPolls.jsx';
import NewPoll from '../components/NewPoll.jsx';
import Dashboard from '../components/Dashboard.jsx';
import LoginForm from '../components/LoginForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import Auth from '../modules/Auth';
import React from 'react';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';

let user = Auth.isUserAuthenticated();

export default class Routes extends React.Component {

  render() {

    return(
      <Router history={browserHistory}>
        <Route component={Base}>
        <Route component={Home}>
          <Route path="/" component={PollList} />
          <Route path="/polls/mypolls" component={UserPolls} />
          <Route path="/polls/new" component={NewPoll} />
          <Route path="/polls/:formid" component={Poll} />
        </Route>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        </Route>
        <Route path="/logout" onEnter= {(nextState, replaceState) => {
          Auth.deauthenticateUser();
          replaceState(null, '/');
        }} />
      </Router>
    )

  }
}
