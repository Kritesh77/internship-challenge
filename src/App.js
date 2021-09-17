import "./App.css";
import Header from "./components/Header";
import Calender from "./components/Calender";
import fetchData from "./functions/fetchData";
import {
  getMonthlyDataArray,
  getMonthlyArrayMappedWithColorCode,
} from "./functions/calenderFunctions";
import getStartAndEndDate from "./functions/getStartAndEndDate";
import { useEffect, useState } from "react";
import { ApiDataContext } from "./context/ApiDataContext";

function App() {
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [monthlyArray, setMonthlyArray] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    fetchData()
      .then((data) => data.json())
      .then((dataJson) => {
        setStartEndDate(getStartAndEndDate(dataJson));
        return getMonthlyDataArray(dataJson);
      })
      .then((monthlyArray) => {
        const x = getMonthlyArrayMappedWithColorCode(monthlyArray);
        setMonthlyArray(x);
        return x;
      })
      .then((colorCodedArray) => {
        const flattenArray = colorCodedArray.reduce(function (a, b) {
          return a.concat(b);
        }, []);
        setValues(colorCodedArray);
      });
  }, []);

  useEffect(() => {
    // console.log("VALUE ARRAY", values, startEndDate, monthlyArray);
  }, [values, startEndDate, monthlyArray]);

  return (
    <ApiDataContext.Provider value={{ monthlyArray }}>
      <Header />
      <Calender />
    </ApiDataContext.Provider>
  );
}

export default App;
