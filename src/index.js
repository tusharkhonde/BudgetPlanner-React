import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import 'normalize.css/normalize.css';
import './styles/App.scss';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,  
    document.getElementById('root')
);

