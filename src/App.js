import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import DayView from "./components/Day/DayView";
import dayjs from "dayjs";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, dayViews, daySelected, filteredEvents } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  const [dayEvents, setDayEvents] = useState([]);
  

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, daySelected]);
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex flex-1">
          <Sidebar className="w-full md:w-auto md:mx-auto"/>
          {dayViews ? <DayView date={new Date(daySelected)} events={dayEvents}/> : <Month month={currenMonth}/>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
