import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App action="nothing" gapi={window.gapi}/>,
                document.getElementById('root'));
