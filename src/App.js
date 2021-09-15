import "./App.css";
import "react-calendar-heatmap/dist/styles.css";
import Header from "./components/Header";
import Calender from "./components/Calender";

function App() {
  return (
    <>
      <Header />
      <Calender />
      <div className="w-1/2"></div>
    </>
  );
}

export default App;
