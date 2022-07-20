import { API } from "aws-amplify";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CreateEmployeeMutation, Employee } from "../../API";
import { createEmployee } from "../../graphql";

interface ModalNewEmployeeProps {
  buttonText: String;
  employees: Employee[] | undefined;
  setEmployees: React.Dispatch<SetStateAction<Employee[] | undefined>>;
}

interface InputsInterface {
  fullName: String;
  extension?: String;
  department?: String;
  type: String;
}

export const NewEmployeeModal = (props: ModalNewEmployeeProps) => {
  const INITIAL_INPUTS = {
    fullName: "",
    extension: "9999",
    department: "",
    type: "Employee",
  };

  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState<InputsInterface>(INITIAL_INPUTS);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => createNewEmployee();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent
  ) => {
    const element = event.target as HTMLInputElement;
    setInputs(
      (prevState) =>
        ({
          ...prevState,
          [element.name]: element.value,
        } as InputsInterface)
    );
  };

  const createNewEmployee = async () => {
    const createEmployeeMutationData = (await API.graphql({
      query: createEmployee,
      variables: { input: inputs },
      authMode: "API_KEY",
    })) as { data: CreateEmployeeMutation; errors: any[] };
    const newEmployee = createEmployeeMutationData.data;
    props.setEmployees((currentEmployee) => {
      const newEmployees = currentEmployee?.map((item) => item);
      if (newEmployee.createEmployee) {
        newEmployees?.push({
          ...newEmployee.createEmployee,
        });
        return newEmployees;
      } else {
        return undefined;
      }
    });

    setShow(false);
    setInputs(INITIAL_INPUTS);
  };

  return (
    <>
      <Button
        variant="success"
        style={style.CreateEmployeeButton}
        onClick={handleShow}
      >
        {props.buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.ControlFullName"
            >
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Nombre..."
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.ControlExtension"
            >
              <Form.Label>Extension</Form.Label>
              <Form.Control
                type="number"
                name="extension"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.ControlDepartment"
            >
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                name="department"
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
  CreateEmployeeButton: {
    margin: "0.5% 0 0.5% auto",
  },
};
