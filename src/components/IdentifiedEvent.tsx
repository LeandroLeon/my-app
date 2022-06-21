import { Event } from "react-big-calendar";

export type IdentifiedEvent = Event & {
  id: string;
};
