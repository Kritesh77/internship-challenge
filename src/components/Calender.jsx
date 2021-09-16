import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import fetchData from "../functions/fetchData";
import { getMonthlyDataArray } from "../functions/calenderFunctions";
import getStartAndEndDate from "../functions/getStartAndEndDate";

export default function Calender() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [values, setValues] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((data) => data.json())
      .then((dataJson) => {
        setStartEndDate(getStartAndEndDate(dataJson));
        return getMonthlyDataArray(dataJson);
      })
      .then((monthlyArray) => {
        const flattenMonthlyArray = monthlyArray.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        setValues(flattenMonthlyArray);
      })
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    // console.log("DATA", data);
    console.log("VALUE ARRAY", values[0], startEndDate);
  }, [data, values, startEndDate]);
  return (
    <section className="flex justify-center items-center bg-white my-20 mx-10 h-screen">
      <div className="w-full px-10">
        {!loading && (
          <>
            <CalendarHeatmap
              startDate={startEndDate?.startDate}
              endDate={startEndDate?.endDate}
              values={values.map((arr) => arr)}
              tooltipDataAttrs={(value) => {
                return {
                  "data-tip": `Gross realised P&L on ${value.date}: count:${value.pnl}`,
                };
              }}
              showWeekdayLabels={true}
              classForValue={(value) => {
                const colorCode = value?.colorCode;
                if (value?.pnl > 0) {
                  if (!colorCode) {
                    return "color-empty";
                  }
                  return `text-green-${colorCode} fill-current	`;
                } else {
                  if (!colorCode) {
                    return "color-empty";
                  }
                  return `text-red-${colorCode} fill-current	`;
                }
              }}
            />
            <ReactTooltip />
          </>
        )}
      </div>
    </section>
  );
}
