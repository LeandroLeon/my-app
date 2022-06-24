import { Card, Container, Nav } from "react-bootstrap";
import logoGestiona from "../logos/logo_espublico_gestiona.png";
import logoNominalia from "../logos/logo_nominalia.png";
import logoPortalHorario from "../logos/logo_portal_horario.png";
import logoAgaete from "../logos/logo_agaete.png";

type LinkOfInterest = {
  name: string;
  description?: string | undefined;
  url: string;
  logo?: string;
};

const LINKS_OF_INTEREST: LinkOfInterest[] = [
  {
    name: "Gestiona",
    description:
      "Plataforma para la gestión de la documentación tanto a nivel interno, como en comunicaciones con otras AA.PP",
    url: "https://gestiona-02.espublico.com/",
    logo: logoGestiona,
  },
  {
    name: "Correo",
    description: "Cliente de acceso al correo institucional",
    url: "https://webmail.nominalia.com",
    logo: logoNominalia,
  },
  {
    name: "Portal Horario",
    description:
      "Portal donde el empleado gestiona todo lo relacionado a su horario (vacaciones, asuntos propios, fichajes, ...)",
    url: "https://aytoagaete.portalhorario.com",
    logo: logoPortalHorario,
  },
  {
    name: "Sede Electrónica Ayto Agaete",
    description: "Enlace a la sede electrónica del Ayuntamiento de Agaete",
    url: "https://agaete.sedelectronica.es/",
    logo: logoAgaete,
  },
];

export const LinksOfInterest = () => {
  return (
    <Container style={style.MainContainer}>
      {LINKS_OF_INTEREST.map((link) => {
        return (
          <Card
            style={{
              width: "18rem",
              margin: "1rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Body>
              {link.logo != undefined ? (
                <Card.Img variant="top" src={link.logo} />
              ) : (
                <Card.Title>{link.name}</Card.Title>
              )}
              <Card.Text className="p-3 mb-0">{link.description}</Card.Text>
              <Nav.Link
                href={link.url}
                target={"_blank"}
                style={{ marginTop: "auto" }}
              >
                Ir a {link.name}
              </Nav.Link>
            </Card.Body>
          </Card>
        );
      })}
    </Container>
  );
};

const style = {
  MainContainer: {
    display: "flex",
    marginTop: "5%",
  },
};
