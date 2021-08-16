import React from "react";
import { range, random } from "lodash";

import { HeatMap } from '../HeatMap';

type GithubData = {
    dayOfWeek: number;
    weekOfYear: number;
    contributions: number;
};

type Props = {
    numberOfSamples: number;
}

export function GithubContributions({ numberOfSamples }: Props) {
    const data: GithubData[] = range(0, numberOfSamples)
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

    return (<div>
        <h4>Random contributions simulation data for {numberOfSamples} commits</h4>
        <HeatMap
            data={data}
            getRowValue={getRow}
            getColumnValue={getColumn}
            getNumberValue={getValue}
        />
    </div>);
}
