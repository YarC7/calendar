import { useState } from "react";
import {
  format,
  addMinutes,
  setHours,
  startOfDay,
  eachHourOfInterval,
} from "date-fns";
import  AllDayEvent  from "./AllDayEvent";
import React from "react";

const DayView = ({ date, events = [] }) => {
  const [ref, setRef] = useState(null);
  console.log(events);
  const hours = eachHourOfInterval({
    start: setHours(startOfDay(date), 8), // Start at 9 AM
    end: setHours(startOfDay(date), 21),  // End at 9 PM
  });
  function calculateEventTop(startHour, hourStart) {
    const startTime = parseInt(startHour.split(":")[0], 10);
    const hourTime = parseInt(hourStart.split(":")[0], 10);
    return ((startTime - hourTime) * 100) / 1; // Assuming each hour is represented by 100%
  }
  
  function calculateEventHeight(startHour, endHour) {
    const startTime = parseInt(startHour.split(":")[0], 10);
    const endTime = parseInt(endHour.split(":")[0], 10);
    return (endTime - startTime) * 100; // Assuming full hour height is 100%
  }



  return (
    <section id="calendar-day-view" className="flex-1 h-full">
      <div className="border-b flex scrollbar-gutter-stable">
        <div className="w-24 h-14 flex justify-center items-center">
          <span className="text-xs">{format(new Date(), "z")}</span>
        </div>
        <div className="flex flex-col flex-1 justify-center  border-l gap-[1px]">
          {events.map((event) => (
            <AllDayEvent event={event} key={event.id} />
          ))}
        </div>
      </div>
      <div className="flex-1 max-h-full overflow-y-scroll pb-28">
        <div className="relative" ref={(node) => setRef(node)}>
          {hours.map((time, index) => {
            const hourStart = format(time, "HH:mm");
            const hourEnd = format(addMinutes(time, 60), "HH:mm"); // assuming each `h-14` is one hour

            // Filter events that should be displayed in the current time slot
            const eventsToDisplay = events.filter((event) => {
              return event.startHour >= hourStart && event.startHour < hourEnd;
            });

            return (
              <div className="h-14 flex" key={time.toISOString() + index}>
                <div className="h-full w-24 flex items-start justify-center">
                  <time
                    className="text-xs -m-3 select-none"
                    dateTime={format(time, "yyyy-MM-dd")}
                  >
                    {index === 0 ? "" : format(time, "h a")}
                  </time>
                </div>
                <div className="flex-1 relative border-b border-l">
                  {eventsToDisplay.map((event) => (
                    <div
                      key={event.id}
                      className={`absolute top-0 left-0 w-32 h-full bg-${event.label}-500`}
                      style={{
                        top: `${calculateEventTop(event.startHour, hourStart)}%`,
                        height: `${calculateEventHeight(event.startHour, event.endHour)}%`,
                      }}
                    >
                      <span className="text-xs text-white">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
    </div>
    </section>
  );
};

export default DayView;
