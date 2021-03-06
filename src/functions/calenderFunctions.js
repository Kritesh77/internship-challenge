import getDate from "./getDate";
import getColorRange from "./getColorCode";
import getColorRangeArray from "./getColorRangeArray";
import { TOTAL_COLOR_RANGE, COLOR_CODE_INCREMENT } from "../constants";

export function getMonthlyDataArray(data) {
  var monthArray = [];
  const finalArray = [];
  for (var i = 0; i < data.length; i++) {
    const date = new Date(data[i]?.date);
    const nextDate = new Date(data[i + 1]?.date);
    const obj = {
      date: getDate(data[i]?.date),
      pnl: data[i]?.pnl,
      // count: getColorRange(data[i]?.pnl),
    };

    if (date.getMonth() === nextDate.getMonth()) {
      monthArray.push(obj); //push it in the same monthly array
    } else {
      //push the prev month array to final array and make a new month array to start afresh
      monthArray.push(obj);
      finalArray.push(monthArray);
      var monthArray = new Array();
      //pushing the first element in the new month array
    }
  }
  return finalArray;
}
export function getMonthlyArrayMappedWithColorCode(monthArray) {
  const finalFinalArray = monthArray.map((monthly) => {
    const arr = monthly.map((d) => d.pnl);
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    // console.log("MIN:", min, "MAX", max);
    const colorRangeArrayPositive = getColorRangeArray(max / TOTAL_COLOR_RANGE);
    const colorRangeArrayNegative = getColorRangeArray(min / TOTAL_COLOR_RANGE);

    const colorCodedMonthlyArray = monthly.map((data) => {
      var colorCode = 0;
      if (data.pnl > 0) {
        for (let x of colorRangeArrayPositive) {
          if (data.pnl >= x) {
            colorCode += COLOR_CODE_INCREMENT;
          }
        }
      } else if (data.pnl < 0) {
        for (let x of colorRangeArrayNegative) {
          if (data.pnl <= x) {
            colorCode += COLOR_CODE_INCREMENT;
          }
        }
      }
      const obj = {
        date: data.date,
        pnl: data.pnl,
        colorCode: colorCode || 100,
      };
      // console.log(data.pnl, colorCode);
      return obj;
    });
    console.log(colorRangeArrayPositive, colorRangeArrayNegative);
    return colorCodedMonthlyArray;
  });
  return finalFinalArray;
}
