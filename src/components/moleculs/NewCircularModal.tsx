import { API } from "aws-amplify";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Circular, CreateCircularMutation } from "../../API";
import { createCircular } from "../../graphql";

interface ModalNewCircularProps {
  buttonText: String;
  circulars: Circular[] | undefined;
  setCirculars: React.Dispatch<SetStateAction<Circular[] | undefined>>;
}

export const NewCircularModal = (props: ModalNewCircularProps) => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    attachments: [],
    type: "Circular",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => createNewCircular();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent
  ) => {
    const element = event.target as HTMLInputElement;
    setInputs((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const createNewCircular = async () => {
    const createCircularMutationData = (await API.graphql({
      query: createCircular,
      variables: { input: inputs },
      authMode: "API_KEY",
    })) as { data: CreateCircularMutation; errors: any[] };
    const newCircular = createCircularMutationData.data;
    props.setCirculars((currentCirculars) => {
      const newCirculars = currentCirculars?.map((item) => item);
      if (newCircular.createCircular) {
        newCirculars?.push({
          ...newCircular.createCircular,
        });
        return newCirculars;
      } else {
        return undefined;
      }
    });

    setShow(false);
  };

  return (
    <>
      <Button
        variant="success"
        style={style.CreateCircularButton}
        onClick={handleShow}
      >
        {props.buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Circular</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="newCircularForm.ControlTitle"
            >
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Titulo..."
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newCircularForm.ControlDescripcion"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const style = {
  CreateCircularButton: {
    margin: "0.5% 0 0.5% auto",
  },
};
