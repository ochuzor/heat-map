import React from 'react';

import './App.css';
import { HeatMapSquare } from './components/HeatMapSquare';

function App() {
  return (
    <div className="App">
      <div>
        <HeatMapSquare />
        <HeatMapSquare />
      </div>
    </div>
  );
}

export default App;
