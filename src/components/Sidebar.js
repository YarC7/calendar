import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="border m-1 rounded-lg  p-5 w-72">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
