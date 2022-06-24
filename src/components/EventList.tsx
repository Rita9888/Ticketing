import { FC } from "react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, ListGroup, Button } from "react-bootstrap";
import EventForm from "./EventForm";
import EventItem from "./EventItem";

const EventList: FC = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const events = useAppSelector((state) => state.events.eventsList);

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Events List</h1>
      <Button
        variant="primary"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsCreate(true)}
        style={{ borderRadius: "10px" }}
      >
        Create new event
      </Button>
      <EventForm modalActive={isCreate} setModalActive={setIsCreate} />
      <ListGroup style={{ padding: "0" }} className="my-2">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default EventList;
