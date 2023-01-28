import { Title, Paper, Text, Button, } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ItineraryComponent() {
  const tripId = useParams();
  let id = Number(tripId.id);
  const [depart_flight_num, setDepartFlightNum] = useState("");
  const [depart_flight_airline, setDepartFlightAirline] = useState("");
  const [depart_flight_date, setDepartFlightDate] = useState("");
  const [return_flight_num, setReturnFlightNum] = useState("");
  const [return_flight_airline, setReturnFlightAirline] = useState("");
  const [return_flight_date, setReturnFlightDate] = useState("");
  const [show, setShow] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries/trip/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setItinerary(data[0]);
      }
    };
    fetchItinerary();
  }, [id]);


  const handleDelete = (id) => async () => {
    try {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries/${id}`;
      const deleteResponse = await fetch(url, {
        method: "delete",
      });

      if (deleteResponse.ok) {
            const fetchItinerary = async () => {
              const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries/trip/${id}`;
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();
                setItinerary(data[0]);
              }
            };
            fetchItinerary();
      }
    } catch (err) {}
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const trip_id=id
      const data = {
          depart_flight_num,
          depart_flight_airline,
          depart_flight_date,
          return_flight_num,
          return_flight_airline,
          return_flight_date,
          trip_id,
        };

      const itineraryUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries`;
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      };

        const response = await fetch(itineraryUrl, fetchConfig);
        if (response.ok) {
            setShow(false);
            const fetchItinerary = async () => {
                const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/itineraries/trip/${id}`;
                const response = await fetch(url);
                if (response.ok) {
                const data = await response.json();
                setItinerary(data[0]);
                }
            };
            fetchItinerary();
        }
  };

    return (
      <Paper shadow="sm" p="xl">
        <Title color="indigo" order={4}>
          Flight Info
        </Title>
        {itinerary ? (
          <>
            <Text>
              Departing Flight: {itinerary.depart_flight_airline}{" "}
              {itinerary.depart_flight_num}
              <br />{" "}
              {new Date(itinerary.depart_flight_date).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              <br />
              <br /> Return Flight: {itinerary.return_flight_airline}{" "}
              {itinerary.return_flight_num}
              <br />{" "}
              {new Date(itinerary.return_flight_date).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <br />
            <Button
              variant="light"
              radius="xl"
              color="red"
              onClick={handleDelete(itinerary.id)}>
              Delete Flight Info
            </Button>
            <Text>
            </Text>
          </>
        ) : (
          <Text>
            <br />
            You haven't added any flight info to your trip
            <br />
            <br />
            <>
              <Button
                variant="light"
                radius="xl"
                color="indigo"
                onClick={handleShow}>
                Add Flight Info
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Flight Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form id="itinerary-form">
                    <Form.Group className="mb-3">
                      <Form.Label>Depart Flight Number</Form.Label>
                      <Form.Control
                        onChange={(e) => setDepartFlightNum(e.target.value)}
                        placeholder="SW1256"
                        required
                        type="text"
                        name="depart_flight_num"
                        id="depart_flight_num"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Depart Flight Airline</Form.Label>
                      <Form.Control
                        onChange={(e) => setDepartFlightAirline(e.target.value)}
                        placeholder="Southwest"
                        required
                        type="text"
                        name="depart_flight_airline"
                        id="depart_flight_airline"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Depart Flight Date</Form.Label>
                      <Form.Control
                        onChange={(e) => setDepartFlightDate(e.target.value)}
                        required
                        type="datetime-local"
                        name="depart_flight_date"
                        id="depart_flight_date"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Return Flight Number</Form.Label>
                      <Form.Control
                        onChange={(e) => setReturnFlightNum(e.target.value)}
                        placeholder="UA4974"
                        required
                        type="text"
                        name="return_flight_num"
                        id="return_flight_num"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Return Flight Airline</Form.Label>
                      <Form.Control
                        onChange={(e) => setReturnFlightAirline(e.target.value)}
                        placeholder="United"
                        required
                        type="text"
                        name="return_flight_airline"
                        id="return_flight_airline"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Return Flight Date</Form.Label>
                      <Form.Control
                        onChange={(e) => setReturnFlightDate(e.target.value)}
                        required
                        type="datetime-local"
                        name="return_flight_date"
                        id="return_flight_date"
                        autoFocus
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" color="indigo" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    color="indigo"
                    onClick={handleSubmit}>
                    Add Flight
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
            <br />
          </Text>
        )}
      </Paper>
    );
}
