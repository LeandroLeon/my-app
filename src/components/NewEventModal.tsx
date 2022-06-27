import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CreateEventMutation, ListEventsQuery } from "../API";
import { API, Auth } from "aws-amplify";
import { createEvent } from "../graphql";

interface NewEventModalProps {
  events: ListEventsQuery | undefined;
  setEvents: React.Dispatch<SetStateAction<ListEventsQuery | undefined>>;
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

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    try {
      Auth.currentAuthenticatedUser({
        bypassCache: false,
      })
        .then((user) => {
          setUser({
            username: user.attributes.name,
            email: user.attributes.email,
          });
          setInputs((currentInputs) => {
            return { ...currentInputs, email: user.attributes.email };
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const handleSave = async () => {
    if (!areValidInputs()) return;
    const eventDetails = getInputs();

    const createEventMutationData = (await API.graphql({
      query: createEvent,
      variables: { input: eventDetails },
    })) as { data: CreateEventMutation; errors: any[] };
    const newEvent = createEventMutationData.data;
    props.setEvents((currentEvents) => {
      const newEvents = Object.assign({}, currentEvents);
      const items = newEvents?.listEvents?.items;
      if (
        newEvents?.listEvents?.items !== undefined &&
        items !== undefined &&
        newEvent.createEvent
      ) {
        newEvents.listEvents.items.push({ ...newEvent.createEvent });
        return newEvents;
      } else {
        return undefined;
      }
    });

    setShow(false);
  };

  const areValidInputs = () => {
    for (const key of Object.keys(inputs) as (keyof typeof inputs)[]) {
      if (inputs[key] === "") {
        alert("Todos los campos deben estar rellenados");
        return false;
      }
    }
    return true;
  };

  const getInputs = () => {
    return {
      title: `Reservado por: ${inputs.email}`,
      startDate: new Date(inputs.eventDate + "T" + inputs.startTime),
      endDate: new Date(inputs.eventDate + "T" + inputs.endTime),
    };
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@aytoagaete.es"
                defaultValue={user.email}
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
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlStartTime"
            >
              <Form.Label>Desde</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                style={{ width: "50%" }}
                min={"07:00"}
                max={"18:30"}
                step={3600}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlEndTime">
              <Form.Label>Hasta</Form.Label>
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
