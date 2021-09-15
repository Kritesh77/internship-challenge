import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import fetchData from "../functions/fetchData";
import {
  getValueObjectArray,
  getStartAndEndDate,
} from "../functions/calenderFunctions";

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
      .then((dataJson) => getValueObjectArray(dataJson))
      .then((valueArray) => {
        setValues(valueArray);
        setStartEndDate(getStartAndEndDate(valueArray));
      })
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    // console.log("DATA", data);
    console.log("VALUE ARRAY", values, startEndDate);
  }, [data, values, startEndDate]);
  return (
    <section className="flex justify-center items-center bg-white my-20 mx-28 h-screen">
      <div className="w-full">
        {!loading && (
          <>
            <CalendarHeatmap
              values={values}
              tooltipDataAttrs={(value) => {
                return {
                  "data-tip": `Gross realised P&L on ${value.date}: count:${value.pnl}`,
                };
              }}
              showWeekdayLabels={true}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-scale-${value.count}`;
              }}
            />
            <ReactTooltip />
          </>
        )}
      </div>
    </section>
  );
}
