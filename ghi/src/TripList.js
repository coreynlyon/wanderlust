import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TripList() {
	const [trips, setTrips] = useState([]);

	useEffect(() => {
		const fetchTrips = async () => {
			const url = "http://localhost:8100/trips/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setTrips(data);
			}
		};
		fetchTrips();
	}, []);

//   const deleteTrip = (id) => async () => {
//     try {
//       const url = `http://localhost:8100/trips/${id}/`;
//       const deleteResponse = await fetch(url,
//           {
//               method: "delete"
//           }
//       );

//       if (deleteResponse.ok) {
//         const reloadUrl = "http://localhost:8100/trips/";
//         const reloadResponse = await fetch(reloadUrl);
//         const newTrip = await reloadResponse.json();
//         setTrips(newTrip);
//       }

//     }
//     catch (err) {

//     }
//   };

	return (
        <div>
            <div className="container mt-3">
                <h1>Your Trips</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {trips.map((trip) => {
                        return (
                            <div key={trip.id} >
                                <div className="col">
                                    <div className="card h-100">
                                         <img
                                             src={trip.image_url}
                                             className="card-img-top"
                                             alt={trip.destination}
								 	    />
                                    <div className="card-body">
                                        <h5 className="card-title">{trip.destination}</h5>
                                        <p className="card-text">Attendees: {trip.attendees}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{new Date(trip.start_date).toLocaleDateString()}-{new Date(trip.end_date).toLocaleDateString()}</small>
                                    </div>
                                    <Link
                                        to={{
                                            pathname: `/itineraries`,
                                            search: `?trip_id=${trip.id}`
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Itinerary Details
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3 mb-3">
            <Link
                to="/trips/new/"
                className="btn btn-primary btn-lg px-4 gap-3">
                Add a trip
            </Link>
            </div>
        </div>
	);
};

export default TripList;
