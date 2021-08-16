import React from 'react';

import './App.css';
import { GithubContributions } from "./components/demos/GithubContributions";

function App() {
  return (
    <div className="App">
      <GithubContributions numberOfSamples={500}/>
    </div>
  );
}

export default App;
