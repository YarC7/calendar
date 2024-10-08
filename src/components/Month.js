import React from "react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <div className="invisible md:visible flex-1 grid grid-cols-7 grid-rows-5 border rounded-lg">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
