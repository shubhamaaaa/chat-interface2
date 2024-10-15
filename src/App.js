import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Chat from './Chat';

const App = () => {
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  );
};

export default App;

