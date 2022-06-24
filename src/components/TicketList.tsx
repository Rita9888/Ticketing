import { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Seat from "./Seat";
import { ITicket } from "../types/types";
import { v4 as uuidv4 } from "uuid";

interface TicketLisrProps {
  tickets: ITicket[];
  eventId: string | number;
}

const TicketList: FC<TicketLisrProps> = ({ tickets, eventId }) => {
  const result = [];

  let rowValue = 1;

  let oneRowSeat = [];

  for (const ticket of tickets) {
    if (rowValue !== ticket.pos.row) {
      rowValue = Number(ticket.pos.row);
      result.push(<Row key={ticket.id}> {oneRowSeat} </Row>);
      oneRowSeat = [];
    }

    oneRowSeat.push(
      <Col>
        <Seat ticket={ticket} eventId={eventId} />
      </Col>
    );
  }

  if (oneRowSeat.length > 0) {
    result.push(<Row key={uuidv4()}> {oneRowSeat} </Row>);
  }

  return <Container>{result}</Container>;
};

export default TicketList;
