import React, { useState } from 'react';
import { Button, ActionIcon } from '@mantine/core';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IconPlus } from "@tabler/icons";
import { useAuthContext } from "./Auth";
import { redirect } from "react-router-dom";


function ViewerModal({id}) {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const { token } = useAuthContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
      event.preventDefault();
      const trip_id=id;
      const data = {
          email,
          trip_id,
        };

      const viewerUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/viewers`;
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      };

      const response = await fetch(viewerUrl, fetchConfig);
      if (response.ok) {
          setShow(false);
          return redirect("/wanderlust/trips");
      }
      else {
        return(
          <div
            className="alert text-center alert-success mb-0 p-4 mt-4"
            id="danger-message">
            You are not authorized to add a viewer to this trip
          </div>
        )
      }
  };

  return (
    <>
      <ActionIcon
        variant="light"
        color="indigo"
        radius="xl"
        size="xs"
        onClick={handleShow}>
        <IconPlus size={14} />
      </ActionIcon>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                type="text"
                name="email"
                id="email"
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
            Add attendee
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewerModal;
