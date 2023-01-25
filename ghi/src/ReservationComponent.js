import { Title, Paper, Text, Button, } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Reservation() {
  const tripId = useParams();
  const id = Number(tripId.id);
  const [accommodation_name, setAccommodation] = useState("");
  const [address, setAddress] = useState("");
  const [reservation_num, setReservationNum] = useState("");
  const [check_in, setCheckIn] = useState("");
  const [check_out, setCheckOut] = useState("");
  const [show, setShow] = useState(false);
  const [reservation, setReservation] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchReservation = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/reservations/trip/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setReservation(data[0]);
      }
    };
    fetchReservation();
  }, [id]);

  const handleSubmit = async (event) => {
      event.preventDefault();
      const trip_id=id
      const data = {
          accommodation_name,
          address,
          reservation_num,
          check_in,
          check_out,
          trip_id,
        };

      const reservationUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/reservations`;
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      };

        const response = await fetch(reservationUrl, fetchConfig);
        if (response.ok) {
            setShow(false);
            const fetchReservation = async () => {
                const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/reservations/trip/${id}`;
                const response = await fetch(url);
                if (response.ok) {
                const data = await response.json();
                setReservation(data[0]);
                }
            };
            fetchReservation();
        }
  };

    return (
        <Paper shadow="sm" p="xl">
            <Title color="indigo" order={4}>Accommodation Details</Title>
            {reservation ? (
            <Text>
            {reservation.accommodation_name} (Confirmation #: {reservation.reservation_num})
            <br /> {reservation.address}
            <br />
            <br /> Check in: {new Date(reservation.check_in).toLocaleString('en-US',{ year: "numeric", month:"numeric", day:"numeric", hour: "2-digit", minute: "2-digit" })}
            <br /> Check out: {new Date(reservation.check_out).toLocaleString('en-US',{ year: "numeric", month:"numeric", day:"numeric", hour: "2-digit", minute: "2-digit" })}
            </Text>
            ) : (
            <Text>
            <br />
            You haven't added any accommodations to your trip!
            <br />
            <br />
                <>
                <Button variant="light" radius="xl" color="indigo" onClick={handleShow}>
                    Add Accommodation
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Accommodation Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form id="reservation-form">
                        <Form.Group className="mb-3">
                        <Form.Label>Accommodation Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setAccommodation(e.target.value)}
                            placeholder="Accommodation Name"
                            required
                            type="text"
                            name="accommodation_name"
                            id="accommodation_name"
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            required
                            type="text"
                            name="address"
                            id="address"
                            autoFocus
                        />
                        </Form.Group>
                    <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Reservation Number</Form.Label>
                        <Form.Control
                            onChange={(e) => setReservationNum(e.target.value)}
                            placeholder="Reservation Number"
                            required
                            type="text"
                            name="reservation_num"
                            id="reservation_num"
                            autoFocus
                        />
                        </Form.Group>
                    <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Check In</Form.Label>
                        <Form.Control
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                            type="datetime-local"
                            name="check_in"
                            id="check_in"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        >
                        <Form.Label>Check Out</Form.Label>
                        <Form.Control
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                            type="datetime-local"
                            name="check_out"
                            id="check_out"
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
                        Add Accommodation
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <br />

            </Text>
            )}
    </Paper>
    )
}
