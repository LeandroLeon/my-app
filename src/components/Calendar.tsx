import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";

export const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Reservado por FVega",
      start,
      end,
    },
  ]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    data.event.start = data.start as Date;
    data.event.end = data.end as Date;
    console.log(data);
  };

  const onSelectEvent = (event: Event) => {
    console.log(event.title);
  };

  const onKeyPressEvent = (
    event: Event,
    keyPressEvent: React.SyntheticEvent<HTMLInputElement>
  ) => {
    if (
      keyPressEvent instanceof KeyboardEvent &&
      (keyPressEvent.key === "Backspace" || keyPressEvent.key === "Backspace")
    ) {
      console.log("Key pressed");
    }
  };

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      onSelectEvent={onSelectEvent}
      resizable
      style={{ height: "85vh" }}
    />
  );
};

const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);

const DnDCalendar = withDragAndDrop(Calendar);

const locales = { es: es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
