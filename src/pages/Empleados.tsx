import { Container } from "react-bootstrap";
import { EmployeesInformationTable } from "../components/organism/EmployeesInformationTable";

export const Empleados = () => {
  return (
    <Container>
      <h2>Información de los empleados</h2>
      <EmployeesInformationTable />
    </Container>
  );
};
