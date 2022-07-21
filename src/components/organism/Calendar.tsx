import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
  stringOrDate,
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
import { Container, Form } from "react-bootstrap";
import { NewEventModal } from "../atoms/NewEventModal";
import {
  DeleteEventInput,
  listEvents,
  ListEventsQuery,
  LocationType,
} from "../../graphql";
import * as MUTATIONS from "../../graphql/mutations";
import GraphQLAPI, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { IdentifiedEvent } from "../../types/IdentifiedEvent";

type DragAndDropEventData = {
  event: Event;
  start: stringOrDate;
  end: stringOrDate;
  isAllDay: boolean;
};

interface CustomCalendarProps {
  title: string;
}

const adaptEventsFromAPI = (data: ListEventsQuery) => {
  if (data !== undefined) {
    const adaptedEvents: IdentifiedEvent[] = [];
    if (data.listEvents?.items !== undefined) {
      for (const event of data.listEvents?.items) {
        adaptedEvents.push({
          title: event?.title,
          start: new Date(event?.startDate as string),
          end: new Date(event?.endDate as string),
          id: event?.id as string,
        });
      }
    }
    return adaptedEvents;
  }
};

export const CustomCalendar = (props: CustomCalendarProps) => {
  const [events, setEvents] = useState<ListEventsQuery | undefined>(undefined);
  const [location, setLocation] = useState<LocationType>(
    LocationType.SALA_DE_JUNTAS
  );
  const LOCATIONS = Object.keys(LocationType).filter((item) => {
    return isNaN(Number(item));
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = (await GraphQLAPI.graphql({
          query: listEvents,
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
          variables: {
            filter: {
              location: {
                eq: location,
              },
            },
          },
        })) as { data: ListEventsQuery };
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [location]);

  const updateEventFromAPI = async (eventDetails: IdentifiedEvent) =>
    await API.graphql({
      query: MUTATIONS.updateEvent,
      variables: { input: eventDetails },
    });

  const deleteEventFromAPI = async (eventId: DeleteEventInput) => {
    await API.graphql({
      query: MUTATIONS.deleteEvent,
      variables: { input: eventId },
    });
  };

  const updateEvent = async (data: DragAndDropEventData) => {
    const identifiedEvent = data.event as IdentifiedEvent;
    const eventDetails = {
      id: identifiedEvent.id,
      startDate: data.start,
      endDate: data.end,
      location: location,
    };
    try {
      (await updateEventFromAPI(eventDetails)) as {
        data: ListEventsQuery;
        errors: Array<{}>;
      };
      setEvents((currentEvents) => {
        const newEvents = Object.assign({}, currentEvents);
        // eslint-disable-next-line
        newEvents?.listEvents?.items.filter((item) => {
          if (item?.id === identifiedEvent.id) {
            item.startDate = data.start.toString();
            item.endDate = data.end.toString();
          }
        });
        return newEvents;
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      if (error instanceof Array && error.length > 0) alert(error[0].message);
    }
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (
    data: DragAndDropEventData
  ) => {
    updateEvent(data);
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    console.log(slotInfo);
  };

  const onSelectEvent = (event: Event) => {
    const identifiedEvent = event as IdentifiedEvent;
    const confirmation = window.confirm(
      "Quiere eliminar el evento:  " + event.title + " ?"
    );
    if (confirmation) removeEvent(identifiedEvent);
    return;
  };

  const onEventResize: withDragAndDropProps["onEventResize"] = (
    data: DragAndDropEventData
  ) => {
    updateEvent(data);
  };

  const removeEvent = async (eventToDelete: IdentifiedEvent) => {
    try {
      await deleteEventFromAPI({ id: eventToDelete.id });
      setEvents((currentEvents) => {
        const newEvents = Object.assign({}, currentEvents);
        const items = newEvents?.listEvents?.items.filter(
          (item) => item?.id !== eventToDelete.id
        );
        if (newEvents?.listEvents?.items !== undefined && items !== undefined)
          newEvents.listEvents.items = items;
        return newEvents;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className={"mt-3"}>
      <div style={style.HeadingContainer}>
        <h2>{props.title}</h2>

        <Form.Select
          aria-label="Select location"
          style={style.DropdownSelect}
          defaultValue={LocationType.SALA_DE_JUNTAS}
          onChange={(event) => setLocation(event.target.value as LocationType)}
        >
          {LOCATIONS.map((location) => (
            <option value={location} key={location}>
              {location.replaceAll("_", " ")}
            </option>
          ))}
        </Form.Select>
        <div style={style.NewEventButtonWrapper}>
          <NewEventModal
            buttonText={"Nueva Reserva"}
            events={events}
            setEvents={setEvents}
            location={location}
          />
        </div>
      </div>

      <DnDCalendar
        defaultView="week"
        events={adaptEventsFromAPI(events as ListEventsQuery)}
        localizer={localizer}
        culture={"es"}
        messages={MESSAGES}
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        onEventResize={onEventResize}
        min={new Date(0, 0, 0, 7, 0)} // 7.00 AM
        max={new Date(0, 0, 0, 19, 0)} // 7.00 PM
        style={{ height: "85vh" }}
        dayLayoutAlgorithm={"no-overlap"}
        resizable
        selectable
      />
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

const MESSAGES = {
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDay: "Todo el día",
  week: "Semana",
  work_week: "Semana Laboral",
  day: "Dia",
  month: "Mes",
  previous: "Atrás",
  next: "Siguiente",
  yesterday: "Ayer",
  tomorrow: "Mañana",
  today: "Hoy",
  agenda: "Agenda",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: function showMore(total: number) {
    return "+" + total + " Mas";
  },
};

const style = {
  DropdownSelect: {
    width: "max-content",
    marginLeft: "1%",
  },
  HeadingContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    marginBottom: "1%",
  },
  NewEventButtonWrapper: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
};
