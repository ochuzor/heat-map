import React from 'react';
import { range, random } from "lodash";

import './App.css';
import { HeatMap } from './components/HeatMap';

type GithubData = {
  dayOfWeek: number;
  weekOfYear: number;
  contributions: number;
};

function App() {
  const data: GithubData[] = range(0, 80)
    .map(_ => {
      return ({
        dayOfWeek: random(0, 6),
        weekOfYear: random(0, 51),
        contributions: random(0, 10),
      });
    });

  const getRow = (item: GithubData) => item.dayOfWeek;
  const getColumn = (item: GithubData) => item.weekOfYear;
  const getValue = (item: GithubData) => item.contributions;

  return (
    <div className="App">
      <HeatMap
        data={data}
        getRowValue={getRow}
        getColumnValue={getColumn}
        getNumberValue={getValue}
      />
    </div>
  );
}

export default App;
