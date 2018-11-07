import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        ReactDOM.render(<NextApp/>,
                        document.getElementById('root'));
    });
}

