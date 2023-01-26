import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Title, Flex } from "@mantine/core";
import { useAuthContext } from "./Auth";
import ViewerModal from "./AddViewerModal";


function TripList() {
  const [trips, setTrips] = useState([]);
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [image_url, setImageUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchTrips = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips`;
      const fetchConfig = {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);

      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      }
    };
    fetchTrips();
  }, [token]);


  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
        destination,
        start_date,
        end_date,
        image_url,
      };

      const tripUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips`;
      const fetchConfig = {
        method: "post",
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
            setTrips(data);
          }
        };
        fetchTrip();
      }
    };

  return (
    <div>
      <div className="container mt-3">
        <Title className="mb-3">Your Trips</Title>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {trips.map((trip) => {
            return (
              <div key={trip.id}>
                <div className="col">
                  <div className="card h-100">
                    <Link to={`/trip/${trip.id}`}>
                      <img
                        src={trip.image_url}
                        className="card-img-top"
                        alt={trip.destination}
                      />
                    </Link>
                    <div className="card-body">
                      <Title order={3} className="card-title">
                        <Flex
                          gap="xs"
                          justify="flex-start"
                          align="center"
                          direction="row"
                          wrap="wrap">
                          {trip.destination}
                          <div>
                            <ViewerModal id={trip.id} />
                          </div>
                        </Flex>
                      </Title>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        {new Date(trip.start_date).toLocaleDateString()}-
                        {new Date(trip.end_date).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3 mb-3">
        {/* <TripModal /> */}
          <Button
            variant="primary"
            radius="xl"
            size="md"
            color="indigo"
            onClick={handleShow}>
            Add a trip
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a new trip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter a destination"
                    required
                    type="text"
                    name="destination"
                    id="destination"
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
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    onChange={(e) => setImageUrl(e.target.value)}
                    type="text"
                    name="image_url"
                    id="image_url"
                    placeholder="Add an image"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" color="indigo" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" color="indigo" onClick={handleSubmit}>
                Add Trip
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    </div>
  );
};

export default TripList;
