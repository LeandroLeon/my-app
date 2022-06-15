import { ChangeEvent, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Event } from "react-big-calendar";

interface NewEventModalProps {
  events: Event[];
  setEvents: React.Dispatch<SetStateAction<Event[]>>;
}

export const NewEventModal = (props: NewEventModalProps) => {
  const INITIAL_INPUT_VALUES = {
    email: "",
    eventDate: "",
    startTime: "",
    endTime: "",
  };

  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState(INITIAL_INPUT_VALUES);

  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent
  ) => {
    const element = event.target as HTMLInputElement;
    setInputs((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const handleSave = () => {
    if (!areValidInputs()) return;
    props.setEvents((currentEvents) => {
      const newEvent = {
        title: `Reservado por ${inputs.email}`,
        start: new Date(inputs.eventDate + "T" + inputs.startTime),
        end: new Date(inputs.eventDate + "T" + inputs.endTime),
      };
      return [...currentEvents, newEvent];
    });
    setShow(false);
  };

  const areValidInputs = () => {
    for (const key of Object.keys(inputs) as (keyof typeof inputs)[]) {
      if (inputs[key] === "") {
        alert("Todos los campos deben estar rellanados");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Button className={"mt-2"} variant="primary" onClick={handleShow}>
        Reservar
      </Button>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlDate">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                style={{ width: "50%" }}
                onChange={handleChange}
              />
              <Form.Control
                type="time"
                name="startTime"
                style={{ width: "50%" }}
                min={"07:00"}
                max={"18:30"}
                step={3600}
                onChange={handleChange}
              />
              <Form.Control
                type="time"
                name="endTime"
                style={{ width: "50%" }}
                min={"07:30"}
                max={"19:00"}
                step={3600}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
