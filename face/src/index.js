import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App'
import {store} from './store/store'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
  </StrictMode>
);
