import React from "react";
import { groupBy, map, max, min, range, filter, reduce, add, flatten } from "lodash";

import type { DataItem } from "../Types";
import { HeatMapRow } from "./HeatMapRow";
import { getStepValue, getRowData } from "./utils";

export type HeatMapProps = {
    data: DataItem[];
    getRowValue: (item: DataItem, allData?: DataItem) => number;
    getColumnValue: (item: DataItem, allData?: DataItem) => number;
    getNumberValue: (item: DataItem, allData?: DataItem) => number;
};

export function HeatMap({ data, getRowValue, getColumnValue, getNumberValue }: HeatMapProps) {
    const columns = map(data, getColumnValue);
    const minCol = min(columns) || 0;
    const maxCol = max(columns) || 0;

    const getRangeData = (row: any[]) => {
        return range(minCol, maxCol)
            .map(col => {
                const list = filter(row, (r) => getColumnValue(r) === col)
                    .map(r => getNumberValue(r));

                return ({
                    id: col,
                    value: reduce(list, add, 0),
                });
            });
    };

    const rowGroups = groupBy(data, getRowValue);
    const rowsX = map(rowGroups, getRangeData);
    const allValues = flatten(rowsX);
    const valuesGreaterThan0 = allValues
        .filter(item => item.value > 0)
        .map(item => item.value);

    const step = getStepValue(valuesGreaterThan0);

    return (<div>
        {map(rowGroups, (row, i) => (<div key={i}>
                <HeatMapRow data={getRangeData(row)
                    .map(itm => getRowData(itm.id, itm.value, step))} />
            </div>)
        )}
    </div>);
}
