import GraphQLAPI, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useAuthContext } from "../../contexts/useAuthContext";
import {
  deleteEmployee,
  DeleteEmployeeMutation,
  Employee,
  employeesSortedByExtension,
  EmployeesSortedByExtensionQuery,
} from "../../graphql";
import { NewEmployeeModal } from "../moleculs/NewEmployeeModal";

export const EmployeesInformationTable = () => {
  const { isAdmin } = useAuthContext();
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);

  const fetchEmployees = async () => {
    try {
      const response = (await GraphQLAPI.graphql({
        query: employeesSortedByExtension,
        variables: { type: "Employee", sortDirection: "ASC" },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as { data: EmployeesSortedByExtensionQuery };
      const adaptedItems = adaptDataToHooks(
        response.data?.employeesSortedByExtension?.items
      );
      setEmployees(adaptedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const adaptDataToHooks = (items: Array<Employee | null> | undefined) => {
    if (items === undefined)
      throw new Error("Type of " + items + "is undefined");
    const adaptedItems: Array<Employee> = [];
    for (const item of items) {
      adaptedItems.push(item as Employee);
    }
    return adaptedItems;
  };

  useEffect(() => {
    fetchEmployees();
  }, [JSON.stringify(employees)]);

  const deleteEmployeeFromList = (employee: Employee) => {
    deleteEmployeeFromHook(employee);
    deleteEmployeeFromAPI(employee);
  };

  const deleteEmployeeFromHook = (employee: Employee) => {
    setEmployees((currentEmployees) => {
      return currentEmployees?.filter((item) => item !== employee);
    });
  };

  const deleteEmployeeFromAPI = async (employee: Employee) => {
    try {
      (await GraphQLAPI.graphql({
        query: deleteEmployee,
        variables: { input: { id: employee.id } },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as { data: DeleteEmployeeMutation };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Extension</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((item: Employee) => (
            <tr>
              <td>{item.fullName}</td>
              <td>{item.extension}</td>
              <td>{item.department}</td>
              {isAdmin ? (
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteEmployeeFromList(item)}
                  >
                    Borrar
                  </Button>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {isAdmin ? (
        <NewEmployeeModal
          buttonText={"+"}
          employees={employees}
          setEmployees={setEmployees}
        />
      ) : (
        <></>
      )}
    </>
  );
};
