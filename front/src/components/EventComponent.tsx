import React, { FC } from "react";
import { Event } from "../types";

type EventComponentProps = {
  event: Event;
};

const EventComponent: FC<EventComponentProps> = ({ event }) => {
  return (
    <div>
      <h1>{event.title}</h1>
      <p>Hora de inicio: {event.init}</p>
      <p>Hora final: {event.end}</p>
      <p>Participantes: {event.participants.join(", ")}</p>
    </div>
  );
};

export default EventComponent;
