import GraphQLAPI, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import { NewCircularModal } from "../moleculs/NewCircularModal";
import { useAuthContext } from "../../contexts/useAuthContext";
import {
  deleteCircular,
  DeleteCircularMutation,
  circularsByDate,
  Circular,
  CircularsByDateQuery,
} from "../../graphql";

export const Circulares = () => {
  const [circulars, setCirculars] = useState<Circular[] | undefined>(undefined);
  const user = useAuthContext();
  const rawToken = user?.getSignInUserSession()?.getAccessToken().getJwtToken();

  const fetchCirculars = async () => {
    try {
      const response = (await GraphQLAPI.graphql({
        query: circularsByDate,
        variables: { type: "Circular", sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as { data: CircularsByDateQuery };
      const adaptedItems = adaptDataToHooks(
        response.data?.circularsByDate?.items
      );
      setCirculars(adaptedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const adaptDataToHooks = (items: Array<Circular | null> | undefined) => {
    if (items === undefined)
      throw new Error("Type of " + items + "is undefined");
    const adaptedItems: Array<Circular> = [];
    for (const item of items) {
      adaptedItems.push(item as Circular);
    }
    return adaptedItems;
  };

  const deleteCircularFromAPI = async (id: string) => {
    try {
      (await GraphQLAPI.graphql({
        query: deleteCircular,
        variables: { input: { id: id } },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as { data: DeleteCircularMutation };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCircularFromHook = (id: string) => {
    setCirculars((currentCirculars) => {
      const updatedItems = currentCirculars?.filter((item) => item?.id !== id);
      if (updatedItems !== undefined) return updatedItems;
    });
  };

  const deleteCircularById = async (id: string) => {
    deleteCircularFromAPI(id);
    deleteCircularFromHook(id);
  };

  const isAdminUser = () => {
    if (rawToken === undefined) return false;
    const decodedToken = jwtDecode<any>(rawToken); // NOTE: We use <any> because we dont have a proper type for AWS JWT Token
    return (
      (decodedToken.hasOwnProperty("cognito:groups") as boolean) &&
      (decodedToken["cognito:groups"].includes("admin") as boolean)
    );
  };

  useEffect(() => {
    fetchCirculars();
  });

  const buttonOnClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    circularId: string
  ) => {
    event.preventDefault();
    if (window.confirm("Está seguro que quiere borrar esta circular?")) {
      deleteCircularById(circularId);
    }
  };

  const parseGraphqlDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const localDate = date.toLocaleDateString("es-ES");
    return localDate.substring(0, 10);
  };

  return (
    <>
      <Container style={style.Header}>
        <h2>Circulares</h2>
        {isAdminUser() && (
          <NewCircularModal
            buttonText="Crear Circular"
            circulars={circulars}
            setCirculars={setCirculars}
          />
        )}
      </Container>
      <Accordion>
        {circulars?.map((item, index) => {
          return (
            <Accordion.Item eventKey={item?.id as string} key={index}>
              <Accordion.Header>
                {parseGraphqlDate(item?.createdAt as string) + " — "}
                {item?.title}
              </Accordion.Header>
              <Accordion.Body style={style.AccordionBody}>
                <div>{item?.description}</div>
                {isAdminUser() && (
                  <Button
                    variant="danger"
                    style={style.DeleteButton}
                    onClick={(event) => {
                      buttonOnClick(event, item?.id as string);
                    }}
                  >
                    X Delete
                  </Button>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

const style = {
  ListGroup: {
    paddingTop: "2%",
    width: "80%",
    margin: "0 auto",
  },
  DeleteButton: {
    margin: "auto 0",
    width: "fit-content",
    marginLeft: "auto",
  },
  AccordionBody: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  Header: {
    display: "flex",
  },
};
