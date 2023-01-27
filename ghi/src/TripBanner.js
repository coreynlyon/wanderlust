import {
  Title,
  Grid,
  Text,
  Container,
  Button,
  Flex,
  Overlay,
  createStyles,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Reservation from "./ReservationComponent";
import { useAuthContext } from "./Auth";
import ItineraryComponent from "./ItineraryComponent";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage:
      "url(https://images.ctfassets.net/itrs3p223g0s/2RbOacx6d1RYNCLOtDmvg/f71f77059110c404db7874ad0d5d6fb6/canadians-travel_1920x1280.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 55,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",
  },

  controls: {
    marginTop: theme.spacing.xl * 1,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },
}));

export default function Itinerary() {
  const tripId = useParams();
  const id = Number(tripId.id);
  const [trip, setTrip] = useState([]);
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const { classes } = useStyles();
  const { token } = useAuthContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;
      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        const data = await response.json();
        setTrip(data);
      }
    };
    fetchTrip();
  }, [id, token]);

  useEffect(() => {
    const fetchTrips = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;
      const fetchConfig = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        const data = await response.json();
        setDestination(data.destination);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setImageUrl(data.image_url);
      }
    };
    fetchTrips();
  }, [id,token]);

  const deleteTrip = (id) => async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;

        const deleteResponse = await fetch(url, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (deleteResponse.ok) {
          navigate("/trips");
        }
        else {
          return (
            <div
              className="alert text-center alert-success mb-0 p-4 mt-4"
              id="danger-message">
              You are not authorized to add a viewer to this trip
            </div>
          );
        }
      } catch (err) {}
    }
  };

  const updateTrip = async (event) => {
        event.preventDefault();
        const data = {
          destination,
          start_date,
          end_date,
          image_url,
        };

        const tripUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;
        const fetchConfig = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(tripUrl, fetchConfig);
        if (response.ok) {
          setShow(false);
          const fetchTrip = async () => {
          const fetchConfig = {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await fetch(tripUrl, fetchConfig);
              if (response.ok) {
                const data = await response.json();
                setTrip(data);
              }
          }
         fetchTrip();
        }
      };

  return (
    <div>
      <>
        <div className={classes.wrapper}>
          <Overlay color="#000" opacity={0.65} zIndex={1} />

          <div className={classes.inner}>
            <Title className={classes.title}>
              Trip to{" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}>
                {trip.destination}
              </Text>
            </Title>

            <Container size={640}>
              <Text size="lg" className={classes.description}>
                {new Date(trip.start_date).toLocaleDateString("en-US")} -{" "}
                {new Date(trip.end_date).toLocaleDateString("en-US")}
              </Text>
            </Container>
            <Container className="mb-3 mt-3">
              <Flex
                justify="center"
                gap="sm"
                align="center"
                className={classes.controls}>
                <div>
                  <>
                    <Button
                      variant="light"
                      size="md"
                      radius="sm"
                      color="indigo"
                      onClick={handleShow}>
                      Update Trip
                    </Button>
                    <span className="align-middle" onClick={handleShow}></span>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Trip</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                              onChange={(e) => setDestination(e.target.value)}
                              required
                              type="text"
                              name="destination"
                              id="destination"
                              defaultValue={destination}
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              onChange={(e) => setStartDate(e.target.value)}
                              required
                              type="date"
                              name="start_date"
                              id="start_date"
                              defaultValue={start_date}
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              onChange={(e) => setEndDate(e.target.value)}
                              required
                              type="date"
                              name="end_date"
                              id="end_date"
                              defaultValue={end_date}
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                              onChange={(e) => setImageUrl(e.target.value)}
                              required
                              type="text"
                              name="image_url"
                              id="image_url"
                              defaultValue={image_url}
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="light"
                          color="indigo"
                          onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          color="indigo"
                          onClick={updateTrip}>
                          Update Trip
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </div>
                <Button
                  onClick={deleteTrip(id)}
                  variant="light"
                  size="md"
                  radius="sm"
                  color="red"
                >
                  Delete Trip
                </Button>
              </Flex>
              <Grid gutter="lg" justify="center" className={classes.controls}>
                <Grid.Col span="auto">
                  <ItineraryComponent />
                </Grid.Col>
                <Grid.Col span="auto">
                  <Reservation />
                </Grid.Col>
              </Grid>
            </Container>
          </div>
        </div>
      </>
    </div>
  );
}
