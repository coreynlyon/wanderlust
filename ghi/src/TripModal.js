import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TripModal() {
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [attendees, setAttendees] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
        if (submitted) {
            window.location.replace("/wanderlust/trips");
        }
    }, [submitted]);

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
          destination,
          start_date,
          end_date,
          attendees,
          image_url,
        };

      // const tripUrl = `https://wanderlust-app.sept-pt-4.mod3projects.com/trips`;
      const tripUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips`;
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      };

      const response = await fetch(tripUrl, fetchConfig);
      if (response.ok) {
          setShow(false);
          setSubmitted(true);
      }
  };

  return (
    <>
      <Button
        variant="primary"
        radius="xl"
        size="md"
        color="indigo"
        onClick={handleShow}
      >
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
                autoFocus
              />
            </Form.Group>
           <Form.Group
              className="mb-3"
            >
              <Form.Label>Attendees</Form.Label>
              <Form.Control
                onChange={(e) => setAttendees(e.target.value)}
                placeholder="Enter attendees"
                required
                type="text"
                name="attendees"
                id="attendees"
                autoFocus
              />
            </Form.Group>
           <Form.Group
              className="mb-3"
            >
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
    </>
  );
}

export default TripModal;
