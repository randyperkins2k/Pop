import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import GlobalStyles from './components/styles/globalStyles.js';
import './i18n.jsx';
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import './components/Themes/Theme.jsx'

ReactDOM.render(
<Suspense fallback={(<div>Loading ~~~</div>)} >
		  <App />
</Suspense>,
 document.getElementById('app'));