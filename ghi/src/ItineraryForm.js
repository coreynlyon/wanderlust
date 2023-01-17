import { useState, useEffect } from "react";

function ItineraryForm() {
    const [notes, setNotes] = useState("");
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            const url = "http://localhost:8100/trips/";
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setTrips(data);
            }
        };
        fetchTrips();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trip_id = selectedTrip;
        const data = {
            notes,
            trip_id
         };

        const itineraryUrl = "http://localhost:8100/itineraries/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(itineraryUrl, fetchConfig);
        if (response.ok) {
            event.target.reset();
            setNotes("");
            setSelectedTrip("");
            setSubmitted(true);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Create a New Itinerary</h1>
                    <form id="create-trip-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Notes"
                                required
                                type="text"
                                name="notes"
                                id="notes"
                                className="form-control"
                            />
                            <label htmlFor="notes">Notes</label>
                        </div>
                        <div className="mb-3">
                            <select
                                onChange={(e) => setSelectedTrip(e.target.value)}
                                required
                                name="trip_id"
                                id="trip_id"
                                className="form-select">
                                <option value="">Select a trip ID</option>
                                {trips.map((trip) => {
                                    return (
                                        <option key={trip.id} value={trip.id}>
                                            {trip.destination}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="col text-center">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                    {submitted && (
                        <div
                            className="alert text-center alert-success mb-0 p-4 mt-4"
                            id="success-message">
                            Your itinerary has been created!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ItineraryForm;
