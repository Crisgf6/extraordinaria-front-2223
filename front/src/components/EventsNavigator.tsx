import React, { useState } from "react";
import DayEvents from "./DayEvents";
import { styled } from "styled-components";
import { useRouter } from "next/router";

const EventsNavigator = () => {
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();
  return (
    <Container>
      <NavigationButtons>
        <Button
          onClick={() => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            setDate(newDate);
          }}
        >
          Día anterior
        </Button>
        <Button
          onClick={() => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setDate(newDate);
          }}
        >
          Día siguiente
        </Button>
        <Button onClick={() => router.push("/addEvent")}>
          {" "}
          Añadir nuevo evento
        </Button>
      </NavigationButtons>
      <DayEvents date={date} key={date.toISOString()} />;
    </Container>
  );
};

const Button = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #424242;
  &:hover {
    background-color: #e0e0e0;
  }
  margin: 10px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default EventsNavigator;
