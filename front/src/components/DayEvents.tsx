import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Event } from "../types";
import EventComponent from "./EventComponent";

type DayEventsProps = {
  date: Date;
};

const DayEvents = (props: DayEventsProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents(new Date(props.date));
  }, [props.date]);

  const fetchEvents = async (date: Date) => {
    const response = await fetch(
      `https://back-tbyditz3fa-no.a.run.app/events?date=${date.toISOString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data: Event[] = await response.json();
      setEvents(data);
    }
  };

  const deleteEvent = async (id: string) => {
    const response = await fetch(
      `https://back-tbyditz3fa-no.a.run.app/deleteEvent/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      fetchEvents(new Date(props.date));
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>
        Eventos del{" "}
        {props.date.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h1>
      <ul>
        {events.map((event) => (
          <Event key={event.id}>
            <EventComponent event={event} />
            <button onClick={() => deleteEvent(event.id)}>Borrar</button>
          </Event>
        ))}
      </ul>
    </div>
  );
};

const Event = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
  border: 1px solid black;
  padding: 10px;
  width: 300px;
  // make it look like a post-it note
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px #888888;
`;

export default DayEvents;
