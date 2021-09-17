import React, { useState, useEffect, useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import fetchData from "../functions/fetchData";
import {
  getMonthlyDataArray,
  getMonthlyArrayMappedWithColorCode,
} from "../functions/calenderFunctions";
import getStartAndEndDate from "../functions/getStartAndEndDate";
import {
  TOTAL_COLOR_RANGE,
  COLOR_CODE_INCREMENT,
  PROFIT_COLOR,
  LOSS_COLOR,
} from "../constants";
import { ApiDataContext } from "../context/ApiDataContext";

export default function Calender() {
  const { monthlyArray } = useContext(ApiDataContext);
  console.log("USECONTEXT", monthlyArray);
  return (
    <section className="flex-col justify-center items-center bg-white my-20 mx-10 py-10">
      <div className="w-full h-1/2 flex mx-4 md:flex-nowrap flex-wrap ">
        {monthlyArray?.map((values, index, array) => {
          return (
            <div className="" style={{ maxHeight: "30vh" }}>
              <CalendarHeatmap
                startDate={values[0]?.date}
                endDate={values[values.length - 1]?.date}
                values={values.map((arr) => arr)}
                tooltipDataAttrs={(value) => {
                  return {
                    "data-tip": `Gross realised P&L on ${value.date}: count:${value.pnl} color:${value.colorCode}`,
                  };
                }}
                // showWeekdayLabels={index === 0 ? true : false}
                showMonthLabels={true}
                classForValue={(value) => {
                  const colorCode = value?.colorCode;
                  if (value?.pnl > 0) {
                    if (!colorCode) {
                      return "color-empty";
                    }
                    return `text-${PROFIT_COLOR}-${colorCode} fill-current	`;
                  } else {
                    if (!colorCode) {
                      return "color-empty";
                    }
                    return `text-${LOSS_COLOR}-${colorCode} fill-current	`;
                  }
                }}
              />
              <ReactTooltip />
            </div>
          );
        })}
      </div>
      <ColorRange />
    </section>
  );
}

function ColorRange() {
  let colorArray = [];
  for (var i = 1; i <= TOTAL_COLOR_RANGE; i++) {
    colorArray.push(COLOR_CODE_INCREMENT * i);
  }
  return (
    <>
      <div className="flex justify-end px-10 mt-10">
        <div className="flex">
          <h1 className="px-2">Min. profit</h1>
          {colorArray?.map((code) => {
            return (
              <div
                key={code}
                className={`bg-${PROFIT_COLOR}-${code} h-5 w-5`}
              ></div>
            );
          })}
          <h1 className="px-2">Max. profit</h1>
        </div>
        <div className="flex ml-4">
          <h1 className="px-2">Min. loss</h1>
          {colorArray?.map((code) => {
            return (
              <div
                key={code}
                className={`bg-${LOSS_COLOR}-${code} h-5 w-5`}
              ></div>
            );
          })}
          <h1 className="px-2">Max. loss</h1>
        </div>
      </div>
    </>
  );
}
