import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import Notifications from './features/notifications/components/Notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Notifications />
      </Router>
    </Provider>
  </React.StrictMode>
);
