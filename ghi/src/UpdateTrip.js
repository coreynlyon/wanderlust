import React, { useState, useEffect } from 'react';
import { Button }  from '@mantine/core';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';

function UpdateTrip() {
    const tripId = useParams();
    const id = Number(tripId.id);
    const [destination, setDestination] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [attendees, setAttendees] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [show, setShow] = useState(false);
    const [setTrip] = useState("");

    useEffect(() => {
        const fetchTrips = async () => {
            const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setDestination(data.destination);
                setStartDate(data.start_date);
                setEndDate(data.end_date);
                setAttendees(data.attendees);
                setImageUrl(data.image_url);
            }
        };
        fetchTrips();
    }, [id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
          destination,
          start_date,
          end_date,
          attendees,
          image_url
        };

      const tripUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/wanderlust/trips/${id}`;
      const fetchConfig = {
          method: "put",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      };

      const response = await fetch(tripUrl, fetchConfig);
      if (response.ok) {
            setShow(false);
            const reloadResponse = await fetch(tripUrl);
            const updatedTrip = await reloadResponse.json();
            setTrip(updatedTrip);
            // event.target.reset();
            // setDestination("");
            // setStartDate("");
            // setEndDate("");
            // setAttendees("");
            // setImageUrl("");
      }
  };

  return (
    <>
      <Button
        variant="light"
        size="md"
        radius="sm"
        color="indigo"
        // style = {{backgroundColor: 'rgba(255, 255, 255, .4)'}}
        onClick={handleShow}
      >
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
            <Form.Group
              className="mb-3"
            >
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
           <Form.Group
              className="mb-3"
            >
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
           <Form.Group
              className="mb-3"
            >
              <Form.Label>Attendees</Form.Label>
              <Form.Control
                onChange={(e) => setAttendees(e.target.value)}
                required
                type="text"
                name="attendees"
                id="attendees"
                defaultValue={attendees}
                autoFocus
              />
            </Form.Group>
           <Form.Group
              className="mb-3"
            >
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
          <Button variant="light" color="indigo" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" color="indigo" onClick={handleSubmit}>
            Update Trip
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateTrip;
