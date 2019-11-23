import {generatePatternFormula} from "./generatePatternFormula";

export const getSatinWeave = (size) => generatePatternFormula([size - 1, 1], Math.floor((size - 1) / 2));