import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from "./redux/store"
import App from './App'
import { ApiServiceProvider } from "./services/api-service-context"
import apiService from "./services/api/requests"

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <Provider store={store}>
        <ApiServiceProvider value={apiService}>
            <Router>
                <App />
            </Router>
        </ApiServiceProvider>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister()
