import React, { useContext, useState, useEffect} from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function Labels() {
  const {
    setDayViews,
  } = useContext(GlobalContext);
  const {
    filteredEvents,
    setSelectedEvent,
    dayViews
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);
  
  const today = dayjs().startOf('day');

  useEffect(() => {
    const events = filteredEvents.filter((evt) =>
      dayjs(evt.day).startOf('day').isSame(today, 'day')
    );
    setDayEvents(events);   
  }, [filteredEvents]);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Upcoming Events  <span className="float-right" onClick={() => setDayViews(!dayViews)}>View All</span></p>
      <p className="text-gray-600 text-sm">Today, {today.format("D MMMM")} </p>

      {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            <p className="text-gray-600 text-sm">{evt.title} 
              {evt.selectedType === "Appointment" 
              ? <span className="material-icons-outlined text-xl float-right bg-white rounded-full text-black">
                  videocam
                </span>
              : <span className="material-icons-outlined text-xl float-right bg-white rounded-full text-black">
                  event
                </span>
              }
            </p>
            <p className="text-gray-600 text-sm">{evt.startHour} - {evt.endHour} GMT+7</p>
          </div>
        ))}
    </React.Fragment>
  );
}
