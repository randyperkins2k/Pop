import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import GlobalStyles from './components/styles/globalStyles.js';
<<<<<<< HEAD
import { registerServiceWorker } from './serviceWorker'


ReactDOM.render(
<React.Fragment>
<GlobalStyles/>
<App />
</React.Fragment>,
 document.getElementById('app'));

 registerServiceWorker();



=======
import './i18n.jsx';


ReactDOM.render(
<Suspense fallback={(<div>Loading ~~~</div>)} >
	<React.Fragment>
		<GlobalStyles/>
		<App />
	</React.Fragment>
</Suspense>,
 document.getElementById('app'));
>>>>>>> b07bda9e7d52c49be6b49103f62bd4906b47d967
