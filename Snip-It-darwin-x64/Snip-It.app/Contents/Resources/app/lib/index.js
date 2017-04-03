require('../styles/index.scss');

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

import App from './components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('application'));
