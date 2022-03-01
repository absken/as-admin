import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const render = () =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
    render();
  });
} else {
  render();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
