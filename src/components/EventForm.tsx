import React, { useState } from "react";
import { FC } from "react";
import { Row, Col, Form, Button, Modal, Image } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { addEvent, editEvent } from "../features/eventSlice";
import { addTickets } from "../features/ticketSlice";
import { IEvent, ITicket } from "../types/types";
import { v4 as uuidv4 } from "uuid";

interface CreateFormProps {
  event?: IEvent | undefined;
  modalActive: boolean;
  setModalActive: (state: boolean) => void;
}

const EventForm: FC<CreateFormProps> = ({
  event,
  modalActive,
  setModalActive,
}) => {
  const [title, setTitle] = useState<string>(event?.title || "");
  const [body, setBody] = useState<string>(event?.body || "");
  const [date, setDate] = useState<string | undefined>(event?.date || "");
  const [price, setPrice] = useState<number | string>(); //fix types (only number)
  const [numbRow, setNumbRow] = useState<number | string>();
  const [numbSeatInRow, setNumbSeatInRow] = useState<number | string>();
  const [urlImage, setUrlImage] = useState<string | undefined>(
    event?.urlImage || ""
  );

  const appDispatch = useAppDispatch();

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let fileList = e.target.files;
    const file = fileList?.item(0);
    if (file) {
      const objurl = URL.createObjectURL(file);
      setUrlImage(objurl);
    }
  }

  function addHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const ticketList = createArrayOfTickets();
    appDispatch(
      addEvent({
        id: uuidv4(),
        title: title,
        body: body,
        date: date,
        ticketsList: ticketList,
        urlImage: urlImage,
      })
    );
    appDispatch(addTickets({ title, ticketList }));
    setTitle("");
    setBody("");
    setDate("");
    setUrlImage("");
    setModalActive(false);
  }

  function editHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (event) {
      appDispatch(
        editEvent({
          id: event.id,
          title: title,
          body: body,
          date: date,
          urlImage: urlImage,
        })
      );
      setTitle("");
      setBody("");
      setUrlImage("");
      setModalActive(false);
    }
  }

  function createArrayOfTickets() {
    const arrTickets: ITicket[] = [];
    if (numbRow && numbSeatInRow && price) {
      for (let i = 1; i <= numbRow; i++) {
        for (let j = 1; j <= numbSeatInRow; j++) {
          arrTickets.push({
            id: uuidv4(),
            status: false,
            price: price,
            numbRows: numbRow,
            numbSeats: numbSeatInRow,
            pos: { row: i, seat: j },
          });
        }
      }
    }
    return arrTickets;
  }

  const handleClose = () => setModalActive(false);

  return (
    <div>
      <Modal show={modalActive} onHide={handleClose}>
        <Modal.Header closeButton>
          {event ? (
            <Modal.Title>Edit Event</Modal.Title>
          ) : (
            <Modal.Title>Create Event</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter title event"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
                aria-required="true"
              />
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                placeholder="Enter event"
                value={body}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBody(e.target.value)
                }
                style={{ marginTop: "1rem" }}
                required
                aria-required="true"
              />
              <Form.Control
                type="date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                style={{ marginTop: "1rem" }}
                required
                aria-required="true"
              />
              <Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Rows </Form.Label>
                  <Form.Control
                    type="number"
                    value={numbRow}
                    placeholder="Enter the number of row"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNumbRow(e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Seats in the row</Form.Label>
                  <Form.Control
                    type="number"
                    value={numbSeatInRow}
                    placeholder="Enter the number of seats in the row"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNumbSeatInRow(e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Ticket price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    placeholder="Enter ticket pric"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrice(e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Control
                type="file"
                accept="image/jpeg,image/png"
                onChange={imageHandler}
                style={{ marginTop: "1rem" }}
              />
              {event ? (
                <Image
                  src={event.urlImage}
                  fluid={true}
                  style={{ marginTop: "1rem" }}
                />
              ) : (
                <></>
              )}
              {event ? (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={editHandler}
                  style={{ marginTop: "1rem" }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={addHandler}
                  style={{ marginTop: "1rem" }}
                >
                  Add
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ margin: "1rem 0 0 1rem" }}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventForm;
