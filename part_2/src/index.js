import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client'; // для создания экземпляра класса клиента
import { HttpLink } from 'apollo-link-http'; // для настройки клиента
import { InMemoryCache } from 'apollo-cache-inmemory'; // для настройки клиента

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './style.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
