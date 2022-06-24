import { FC } from "react";
import { ITicket } from "../types/types";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { bookingTicket } from "../features/ticketSlice";
import { Col, Button } from "react-bootstrap";
import { TbArmchair } from "react-icons/tb";

interface SeatProps {
  ticket: ITicket;
  eventId: number | string;
}
const Seat: FC<SeatProps> = ({ ticket, eventId }) => {
  const event = useAppSelector((state) =>
    state.events.eventsList.find((event) => event.id === eventId)
  );

  const appDispatch = useAppDispatch();

  function bookingHandler() {
    if (event) {
      appDispatch(bookingTicket({ key: event.title, id: ticket.id }));
    }
  }

  function getStyleHandler() {
    if (ticket.status) {
      return { background: "blue", color: "#fff" };
    } else {
      return { background: "white", color: "blue" };
    }
  }

  return (
    <Col>
      <Button
        variant="outline-primary"
        onClick={bookingHandler}
        style={getStyleHandler()}
      >
        <TbArmchair />
        <div>
          row:{ticket.pos.row} seat:{ticket.pos.seat} price:{ticket.price}$
        </div>
      </Button>
    </Col>
  );
};

export default Seat;
