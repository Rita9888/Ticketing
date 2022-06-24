import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import TicketCard from "../components/TicketsCard";
import NotFound from "./NotFound";
import {
  Card,
  Container,
  Row,
  Col,
  Badge,
  Button,
  Tabs,
  Tab,
  ListGroup,
} from "react-bootstrap";
import { GrTicket } from "react-icons/gr";

const EventPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.eventsList.find((event) => event.id === id)
  );
  const tickets = useAppSelector(
    (state) => state.tickets.ticketList[event?.title || ""] || "Not found event"
  );

  if (event && tickets) {
    return (
      <Container style={{ marginTop: "2rem" }}>
        <TicketCard
          modalActive={modalActive}
          setModalActive={setModalActive}
          id={event.id}
        />
        <Row>
          <Col xs={4}>
            <Card.Img src={event.urlImage} style={{ borderRadius: "20px" }} />
          </Col>
          <Col xs={8}>
            <Row>
              <Col xs={10}>
                <Card.Title style={{ fontSize: "3rem" }}>
                  {event.title}
                </Card.Title>
              </Col>
              <Col>
                <Badge bg="light" text="dark" style={{ fontSize: "1rem" }}>
                  {event.date}
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ color: "grey", marginBottom: "1rem" }}>
                  Ticket quality:
                </div>
                <Button
                  variant="primary"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setModalActive(true);
                  }}
                >
                  <GrTicket
                    style={{
                      marginRight: "1rem",
                      color: "#fff",
                    }}
                  />
                  Buy tickets
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <Tabs
                  defaultActiveKey="descr"
                  id="controlled-tab-example"
                  className="mb-3"
                  style={{ marginTop: "1rem" }}
                >
                  <Tab eventKey="descr" title="Description">
                    <Card.Text>{event.body}</Card.Text>
                  </Tab>
                  <Tab eventKey="tickets" title="Tickets">
                    <p>Select ticket</p>
                    <ListGroup>
                      {tickets.map((ticket) => (
                        <ListGroup.Item key={ticket.id}>
                          {ticket.id}. Seat №{ticket.pos.seat} Price:
                          {ticket.price}$
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <NotFound />;
  }
};

export default EventPage;
