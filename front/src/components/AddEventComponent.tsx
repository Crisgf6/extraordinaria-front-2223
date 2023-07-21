import React, { useState } from "react";
import { Event } from "../types";
import ParticipantsComponentEditor from "./ParticipantsComponentEditor";
import { useRouter } from "next/router";
import { styled } from "styled-components";

const AddEventComponent = () => {
  const router = useRouter();
  const [event, setEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: new Date(),
    init: new Date().getHours(),
    end: new Date().getHours() + 1,
    participants: [],
  });

  const addEvent = async (event: Omit<Event, "id">) => {
    const response = await fetch(
      `https://back-tbyditz3fa-no.a.run.app/addEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (response.status === 200) {
      router.push("/");
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <EventForm>
      <h1>Añadir Evento</h1>
      <div>
        <button onClick={() => addEvent(event)}>Añadir</button>
        <button onClick={() => router.push("/")}>Cancelar</button>
      </div>
      <input
        type="text"
        placeholder="Título"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <input
        type="date"
        value={event.date.toISOString().split("T")[0]}
        onChange={(e) => setEvent({ ...event, date: new Date(e.target.value) })}
      />
      <InputHour>
        <Text>Hora de inicio: </Text>
        <input
          placeholder="Hora de inicio"
          type="number"
          value={event.init}
          onChange={(e) =>
            setEvent({ ...event, init: parseInt(e.target.value) })
          }
        />
      </InputHour>
      <InputHour>
        <Text>Hora de finalización:</Text>
        <input
          placeholder="Hora de finalización"
          type="number"
          value={event.end}
          onChange={(e) =>
            setEvent({ ...event, end: parseInt(e.target.value) })
          }
        />
      </InputHour>
      <ParticipantsComponentEditor
        participants={event.participants}
        onChange={(participants) => setEvent({ ...event, participants })}
      />
    </EventForm>
  );
};

const EventForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // make it like a post-it note
  padding: 1rem;
  border-radius: 1rem;
  background-color: #f5f5f5;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
  }
  & > input {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Text = styled.div`
  width: 150px;
`;

const InputHour = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 400px;
`;
export default AddEventComponent;
