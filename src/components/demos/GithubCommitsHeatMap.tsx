import React from "react";
import { range } from "lodash";
import { subYears, getDay, getWeek } from "date-fns";

import { HeatMap } from '../HeatMap';

// src https://gist.github.com/nick-desteffen/4286260
/**
 *  Function to generate a random date between 2 dates
 * @param start the start date
 * @param end the end date
 * @returns a random date between start and end dates
 */
function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const randomDateWithinOneyear = () => {
    const endDate = new Date();
    const startDate = subYears(endDate, 1);

    return randomDate(startDate, endDate);
}

type Props = {
    numberOfSamples: number;
};

export function GithubCommitsHeatMap({ numberOfSamples }: Props) {
    // each data represents a commit
    const data = range(0, numberOfSamples).map(randomDateWithinOneyear);

    const getRow = (commitDate: Date) => getDay(commitDate);
    const getColumn = (commitDate: Date) => getWeek(commitDate);
    const getValue = () => 1; // each data item (date) represents a single commit

    return (<div>
        <h4>Random commits simulation data for {numberOfSamples} commits</h4>
        <HeatMap
            data={data}
            getRowValue={getRow}
            getColumnValue={getColumn}
            getNumberValue={getValue}
        />
    </div>);
}
