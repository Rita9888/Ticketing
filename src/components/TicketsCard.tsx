import { FC } from "react";
import { useAppSelector } from "../app/hooks";
import { Modal } from "react-bootstrap";

import TicketList from "./TicketList";

interface TicketCardProps {
  modalActive: boolean;
  setModalActive: (state: boolean) => void;
  id: string | number;
}
const TicketCard: FC<TicketCardProps> = ({
  modalActive,
  setModalActive,
  id,
}) => {
  const event = useAppSelector((state) =>
    state.events.eventsList.find((event) => event.id === id)
  );
  const tickets = useAppSelector(
    (state) => state.tickets.ticketList[event?.title || ""] || "Not found event"
  );

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <Modal size="xl" show={modalActive} onHide={handleClose}>
      <TicketList tickets={tickets} eventId={id} />
    </Modal>
  );
};

export default TicketCard;
