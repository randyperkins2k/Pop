import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import GlobalStyles from './components/styles/globalStyles.js';
import './i18n.jsx';

ReactDOM.render(
<Suspense fallback={(<div>Loading ~~~</div>)} >
	<React.Fragment>
    <GlobalStyles />
		  <App />
	</React.Fragment>
</Suspense>,
 document.getElementById('app'));