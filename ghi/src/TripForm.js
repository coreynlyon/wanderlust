import { useState } from "react";

function TripForm() {
    const [destination, setDestination] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [attendees, setAttendees] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [submitted, setSubmitted] = useState(false);



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            destination,
            start_date,
            end_date,
            attendees,
            image_url,
            // itinerary_id
         };

        const tripUrl = "http://localhost:8100/trips/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(tripUrl, fetchConfig);
        if (response.ok) {
            event.target.reset();
            setDestination("");
            setStartDate("");
            setEndDate("");
            setAttendees("");
            setImageUrl("");
            // setItineraryId("");
            setSubmitted(true);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Create a New Trip</h1>
                    <form id="create-trip-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Destination"
                                required
                                type="text"
                                name="destination"
                                id="destination"
                                className="form-control"
                            />
                            <label htmlFor="destination">Destination</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Start Date"
                                required
                                type="date"
                                name="start_date"
                                id="start_date"
                                className="form-control"
                            />
                            <label htmlFor="start_date">Start Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="End Date"
                                required
                                type="date"
                                name="end_date"
                                id="end_date"
                                className="form-control"
                            />
                            <label htmlFor="end_date">End Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setAttendees(e.target.value)}
                                placeholder="Attendees"
                                required
                                type="text"
                                name="attendees"
                                id="attendees"
                                className="form-control"
                            />
                            <label htmlFor="attendees">Attendees</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Image URL"
                                type="text"
                                name="image_url"
                                id="image_url"
                                className="form-control"
                            />
                            <label htmlFor="image_url">Image URL</label>
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                    {submitted && (
                        <div
                            className="alert text-center alert-success mb-0 p-4 mt-4"
                            id="success-message">
                            Your trip has been created!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};




export default TripForm;
