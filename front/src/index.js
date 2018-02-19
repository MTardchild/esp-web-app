import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const alertOptions = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

class Root extends React.Component  {
    render () {
        return (
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <App />
            </AlertProvider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
