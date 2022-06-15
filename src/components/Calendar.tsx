import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
} from "react-big-calendar";
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
import { Container } from "react-bootstrap";
import { NewEventModal } from "./NewEventModal";

export const MyCalendar = () => {
  const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
  const now = new Date();
  const start = endOfHour(now);
  const end = addHours(start, 2);

  const [events, setEvents] = useState<Event[]>([
    {
      title: "Reservado por FVega",
      start,
      end,
    },
    {
      title: "Reservado por FVega2",
      start,
      end,
    },
    {
      title: "Reservado por FVega3",
      start,
      end,
    },
  ]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;
    data.event.start = start as Date;
    data.event.end = end as Date;
    setEvents((currentEvents) => {
      return [...currentEvents];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    data.event.start = data.start as Date;
    data.event.end = data.end as Date;
  };

  const onSelectEvent = (event: Event) => {
    console.log(event);
    const confirmation = window.confirm(
      "Would you like to remove this event?" + event.title
    );
    if (confirmation) deleteEvent(event);
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    console.log(slotInfo);
  };

  const deleteEvent = (eventToDelete: Event) => {
    setEvents((currentEvents) => {
      return currentEvents.filter((event) => event != eventToDelete);
    });
  };

  return (
    <Container>
      <DnDCalendar
        defaultView="week"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        min={new Date(0, 0, 0, 7, 0)} // 7.00 AM
        max={new Date(0, 0, 0, 19, 0)} // 7.00 PM
        style={{ height: "85vh" }}
        resizable
        selectable
      />
      <NewEventModal events={events} setEvents={setEvents} />
    </Container>
  );
};

const DnDCalendar = withDragAndDrop(Calendar);

const locales = { es: es };
const sOfWeek = () => startOfWeek(new Date(), { weekStartsOn: 1 });
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: sOfWeek,
  getDay,
  locales,
});
