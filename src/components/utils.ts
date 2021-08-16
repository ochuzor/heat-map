import { max, min } from "lodash";

import type { HeatMapItem } from "../Types";

const NUM_CATEGORIES = 4;

export const getStepValue = (nums: number[], categoryCount = NUM_CATEGORIES) => {
    const maxValue = max(nums) || 0;
    const minValue = min(nums) || 0;
    const range = maxValue - minValue;

    if (range <= 0) return 1;

    const step = Math.ceil(range / categoryCount);

    return step;
};

export const getCategory = (val: number, step: number, numberOfCategories = NUM_CATEGORIES) => {
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

export const getColor = (category: number, defaultColour: string = "black") => {
    return CATEGORY_COLOR_MAP[category] || defaultColour;
};

export const getRowData = (id: number | string, value: number, step: number): HeatMapItem => {
    const category = getCategory(value, step);

    return ({
        id,
        color: getColor(category, "blue"),
    });
};
