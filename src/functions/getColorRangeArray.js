import { TOTAL_COLOR_RANGE } from "../constants";

export default function getColorRangeArray(increment) {
  var colorRangeArray = [];
  var range = 0;
  for (var i = 1; i <= TOTAL_COLOR_RANGE; i++) {
    range = increment * i;
    colorRangeArray.push(range);
  }

  return colorRangeArray;
}
