import React from 'react';
import ReactDom from 'react-dom';
import {browserHistory, Router} from 'react-router';
import routes from './config/routes.js';
import Routes from './components/Routes.jsx';

ReactDom.render((<Routes />), document.getElementById('react-app'));
