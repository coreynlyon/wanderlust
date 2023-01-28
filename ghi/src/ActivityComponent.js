import { Timeline, Text, Title, Button, ActionIcon, Flex } from "@mantine/core";
import { IconStar, IconTrash, IconEdit } from "@tabler/icons";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";

function Activities() {
  const tripId = useParams();
  const id = Number(tripId.id);
  const [activity_name, setActivityName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const [activities, setActivities] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (activity) => {
    console.log(activity);
    setActivityId(activity.id);
    setEditActivityName(activity.activity_name);
    setEditPlace(activity.place);
    setEditDate(activity.date);
    setEditNotes(activity.notes);
    setEditShow(true);
  };

  const [edit_activity_name, setEditActivityName] = useState("");
  const [edit_place, setEditPlace] = useState("");
  const [edit_date, setEditDate] = useState("");
  const [edit_notes, setEditNotes] = useState("");
  const [activity_id, setActivityId] = useState("");

  const handleUpdate = (activity_id) => async (event) => {
    console.log(activity_id);
    event.preventDefault();
    const trip_id = id;
    const data = {
      activity_name: edit_activity_name,
      place: edit_place,
      date: edit_date,
      notes: edit_notes,
      trip_id,
    };
    console.log(data);

    const activityUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities/${activity_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(activityUrl, fetchConfig);
    if (response.ok) {
      setEditShow(false);
      const reloadUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities/trip/${id}`;
      const reloadResponse = await fetch(reloadUrl);
      const newActivities = await reloadResponse.json();
      setActivities(newActivities);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities/${id}`;
      const deleteResponse = await fetch(url, {
        method: "delete",
      });

      if (deleteResponse.ok) {
        const updatedActvities = activities.filter(
          (activity) => activity.id !== id
        );
        setActivities(updatedActvities);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities/trip/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    };
    fetchActivity();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trip_id = id;
    const data = {
      activity_name,
      place,
      date,
      notes,
      trip_id,
    };

    const activityUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(activityUrl, fetchConfig);
    if (response.ok) {
      setShow(false);
      const reloadUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/activities/trip/${id}`;
      const reloadResponse = await fetch(reloadUrl);
      const newActivities = await reloadResponse.json();
      setActivities(newActivities);
    }
  };

  return (
    <div>
      <div className="container mt-3 text-center">
        <Title className="mb-3">Schedule</Title>
        <>
          <Button variant="light" color="indigo" size="md" onClick={handleShow}>
            Add an activity
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a new activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="activity-form">
                <Form.Group className="mb-3">
                  <Form.Label>Activity Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="Enter an activity name"
                    required
                    type="text"
                    name="activity_name"
                    id="activity_name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    onChange={(e) => setPlace(e.target.value)}
                    required
                    type="text"
                    placeholder="Enter a place"
                    name="place"
                    id="place"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    onChange={(e) => setDate(e.target.value)}
                    required
                    type="date"
                    name="date"
                    id="date"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes"
                    type="text"
                    name="notes"
                    id="notes"
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
                Add Activity
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>

      <div
        className="container mt-3 mb-3"
        style={{ display: "flex", justifyContent: "center" }}>
        <Timeline active={100} lineWidth={3}>
          {activities.map((activity) => {
            return (
              <Timeline.Item
                color="indigo"
                bullet={<IconStar size={12} />}
                key={activity.id}
                title={activity.activity_name}>
                <Text color="dimmed" size="sm">
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap">
                    {activity.place}
                    <div>
                      <Flex>
                        <ActionIcon
                          variant="transparent"
                          color="red"
                          size="xs"
                          onClick={handleDelete(activity.id)}>
                          <IconTrash size={14} />
                        </ActionIcon>
                        <ActionIcon
                          variant="transparent"
                          color="blue"
                          size="xs"
                          onClick={() => handleEditShow(activity)}>
                          <IconEdit size={14} />
                        </ActionIcon>
                      </Flex>
                      <>
                        <Modal show={editShow} onHide={handleEditClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit activity</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form id="activity-form">
                              <Form.Group className="mb-3">
                                <Form.Label>Activity Name</Form.Label>
                                <Form.Control
                                  onChange={(e) =>
                                    setEditActivityName(e.target.value)
                                  }
                                  placeholder="Enter an activity name"
                                  required
                                  type="text"
                                  name="activity_name"
                                  id="activity_name"
                                  autoFocus
                                  defaultValue={edit_activity_name}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Place</Form.Label>
                                <Form.Control
                                  onChange={(e) => setEditPlace(e.target.value)}
                                  required
                                  type="text"
                                  placeholder="Enter a place"
                                  name="place"
                                  id="place"
                                  defaultValue={edit_place}
                                  autoFocus
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                  onChange={(e) => setEditDate(e.target.value)}
                                  required
                                  type="date"
                                  name="date"
                                  id="date"
                                  defaultValue={edit_date}
                                  autoFocus
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Add notes"
                                  type="text"
                                  name="notes"
                                  id="notes"
                                  defaultValue={edit_notes}
                                  autoFocus
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="light"
                              color="indigo"
                              onClick={handleEditClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              color="indigo"
                              onClick={handleUpdate(activity_id)}>
                              Edit Activity
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    </div>
                  </Flex>
                </Text>
                <Text color="dimmed" size="sm">
                  {activity.notes}
                </Text>
                <Text size="xs" mt={4}>
                  {new Date(activity.date).toLocaleDateString()}
                </Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
}

export default Activities;
