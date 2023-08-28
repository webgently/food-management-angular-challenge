import React from 'react';
import Provider from './context';
import { Router } from './router';
import './App.scss';

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
