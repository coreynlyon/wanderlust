import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ItineraryForm() {
    const tripId = useParams();
    const id = Number(tripId.id);
    const [depart_flight_num, setDepartFlightNum] = useState("");
    const [depart_flight_airline, setDepartFlightAirline] = useState("");
    const [depart_flight_date, setDepartFlightDate] = useState("");
    const [return_flight_num, setReturnFlightNum] = useState("");
    const [return_flight_airline, setReturnFlightAirline] = useState("");
    const [return_flight_date, setReturnFlightDate] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            window.location.replace(`/wanderlust/trip/${id}`)
        }
    })

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
            event.target.reset();
            setDepartFlightNum("");
            setDepartFlightAirline("");
            setDepartFlightDate("");
            setReturnFlightNum("");
            setReturnFlightAirline("");
            setReturnFlightDate("");
            setSubmitted(true);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Add Flight Info</h1>
                    <form id="create-trip-form" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setDepartFlightNum(e.target.value)}
                                placeholder="Depart Flight Num"
                                required
                                type="text"
                                name="depart_flight_num"
                                id="depart_flight_num"
                                className="form-control"
                            />
                            <label htmlFor="depart_flight_num">Depart Flight Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setDepartFlightAirline(e.target.value)}
                                placeholder="Depart Flight Airline"
                                required
                                type="text"
                                name="depart_flight_airline"
                                id="depart_flight_airline"
                                className="form-control"
                            />
                            <label htmlFor="depart_flight_airline">Depart Flight Airline</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setDepartFlightDate(e.target.value)}
                                placeholder="Depart Flight Date"
                                required
                                type="datetime-local"
                                name="depart_flight_date"
                                id="depart_flight_date"
                                className="form-control"
                            />
                            <label htmlFor="depart_flight_date">Depart Flight Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setReturnFlightNum(e.target.value)}
                                placeholder="Return Flight Num"
                                required
                                type="text"
                                name="return_flight_num"
                                id="return_flight_num"
                                className="form-control"
                            />
                            <label htmlFor="return_flight_num">Return Flight Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setReturnFlightAirline(e.target.value)}
                                placeholder="Return Flight Airline"
                                required
                                type="text"
                                name="return_flight_airline"
                                id="return_flight_airline"
                                className="form-control"
                            />
                            <label htmlFor="return_flight_airline">Return Flight Airline</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e) => setReturnFlightDate(e.target.value)}
                                placeholder="Return Flight Date"
                                required
                                type="datetime-local"
                                name="return_flight_date"
                                id="return_flight_date"
                                className="form-control"
                            />
                            <label htmlFor="v">Return Flight Date</label>
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
