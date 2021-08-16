import React from 'react';

import './App.css';
import { GithubContributions } from "./components/demos/GithubContributions";
import { GithubCommitsHeatMap } from "./components/demos/GithubCommitsHeatMap";

function App() {
  return (
    <div className="App">
      <GithubContributions numberOfSamples={250}/>
      <GithubCommitsHeatMap numberOfSamples={750} />
    </div>
  );
}

export default App;
