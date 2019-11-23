import {generatePatternFormula} from "./generatePatternFormula";

export const getTwillWeave = (patternTxt) => generatePatternFormula(patternTxt.split(' ').map(n => +n), 1);