import React from "react";

const AllDayEvent = ({ event }) => {
  return (
    <div className="w-40 py-1 px-2 cursor-pointer bg-blue-400 rounded">
      <h1 className="text-xs text-white">{event.title}</h1>
    </div>
  );
};

export default AllDayEvent;
