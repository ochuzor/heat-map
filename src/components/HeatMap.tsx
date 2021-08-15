import React from "react";
import { groupBy, map, max, min, range, filter, reduce, add, flatten } from "lodash";

import type { DataItem, HeatMapItem } from "../Types";
import { HeatMapRow } from "./HeatMapRow";

const NUM_CATEGORIES = 4;

const getStepValue = (nums: number[], categoryCount = NUM_CATEGORIES) => {
    const maxValue = max(nums) || 0;
    const minValue = min(nums) || 0;
    const range = maxValue - minValue;

    if (range <= 0) return 1;

    const step = Math.ceil(range / categoryCount);

    return step;
};

const getCategory = (val: number, step: number, numberOfCategories = NUM_CATEGORIES) => {
    if (numberOfCategories < 2) {
        throw new Error("Must have at least 2 categories");
    }

    if (val === 0) return 0;
    if (numberOfCategories === 2) return 1;

    for (let i = 1; i < numberOfCategories; i++) {
        if (val <= (step * i)) return i;
    }

    return numberOfCategories;
};

// maps indices to tile color
const CATEGORY_COLOR_MAP = [
    "#f7f9f9",
    "#DDDAB6",
    "#9FB089",
    "#C77E6B",
    "#3E3732",
];

const getColor = (category: number, defaultColour: string = "black") => {
    return CATEGORY_COLOR_MAP[category] || defaultColour;
};

export type HeatMapProps = {
    data: DataItem[];
    getRowValue: (item: DataItem) => number;
    getColumnValue: (item: DataItem) => number;
    getNumberValue: (item: DataItem) => number;
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

    const getRowData = (id: number | string, value: number, step: number): HeatMapItem => {
        const category = getCategory(value, step);

        return ({
            id,
            color: getColor(category, "blue"),
        });
    };

    return (<div>
        {map(rowGroups, (row, i) => (<div key={i}>
                <HeatMapRow data={getRangeData(row)
                    .map(itm => getRowData(itm.id, itm.value, step))} />
            </div>)
        )}
    </div>);
}
