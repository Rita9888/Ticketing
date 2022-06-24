import { FC } from "react";
import { useState } from "react";
import {
  ListGroup,
  Card,
  Image,
  Row,
  Col,
  Badge,
  Button,
} from "react-bootstrap";
import { deleteEvent } from "../features/eventSlice";
import { useAppDispatch } from "../app/hooks";
import { IEvent } from "../types/types";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { GrTicket } from "react-icons/gr";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";

interface EventItemProps {
  event: IEvent;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const appDispatch = useAppDispatch();

  function deleteHandler() {
    appDispatch(deleteEvent(event.id));
  }

  return (
    <div key={event.id}>
      {isEdit ? (
        <EventForm
          event={event}
          modalActive={isEdit}
          setModalActive={setIsEdit}
        />
      ) : (
        <ListGroup.Item style={{ marginBottom: "1rem", borderRadius: "20px" }}>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={event.urlImage}
                // fluid={true}
                style={{ borderRadius: "20px", maxHeight: "250px" }}
              />
            </Col>
            <Col xs={10}>
              <Row>
                <Col xs={10}>
                  <Link to={`/${event.id}`}>
                    <Card.Title style={{ textDecoration: "none" }}>
                      {event.title}
                    </Card.Title>
                  </Link>
                </Col>
                <Col>
                  <Badge bg="secondary" style={{ borderRadius: "5px" }}>
                    {event.date}
                  </Badge>
                </Col>
              </Row>

              <Card.Text>{event.body}</Card.Text>
              <Link
                to={`/${event.id}`}
                style={{
                  textDecoration: "none",
                  border: "1px solid #0d6efd",
                  borderRadius: ".25rem",
                  padding: ".375rem .75rem",
                  background: "#0d6efd",
                  color: "#fff",
                }}
              >
                <GrTicket
                  style={{
                    marginRight: "1rem",
                    color: "#fff",
                  }}
                />
                Buy tickets
              </Link>
              <Row>
                <Col xs={10}></Col>
                <Col>
                  <BsFillPencilFill
                    type="button"
                    onClick={(e: React.MouseEvent<SVGElement>) =>
                      setIsEdit(true)
                    }
                  />
                  <BsFillTrashFill
                    onClick={deleteHandler}
                    style={{ marginLeft: "1rem" }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </div>
  );
};

export default EventItem;
