import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import {navigation} from "./components/navigation/navigation.jsx"

function App() {
  return (
    <BrowserRouter>
      <div id = "app">
        {navigation()}
      </div>
    </BrowserRouter>
  );
}

export default App;
