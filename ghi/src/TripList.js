import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TripModal from "./TripModal";
import { Title } from "@mantine/core";

function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/`;
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
  //       const url = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/${id}/`;
  //       const deleteResponse = await fetch(url,
  //           {
  //               method: "delete"
  //           }
  //       );

  //       if (deleteResponse.ok) {
  //         const reloadUrl = `${process.env.REACT_APP_TRIP_SERVICE_API_HOST}/trips/`;
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
        <Title className="mb-3">
          Your Trips
        </Title>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {trips.map((trip) => {
            return (
              <div key={trip.id}>
                <div className="col">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/trip/${trip.id}`}>
                    <div className="card h-100">
                      <img
                        src={trip.image_url}
                        className="card-img-top"
                        alt={trip.destination}
                      />
                      <div className="card-body">
                        <Title order={3} className="card-title">
                          {trip.destination}
                        </Title>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          {new Date(trip.start_date).toLocaleDateString()}-
                          {new Date(trip.end_date).toLocaleDateString()}
                        </small>
                        {/* <button onClick={deleteTrip(trip.id)} className="btn btn-danger"><img width="25" height="25" src='https://cdn-icons-png.flaticon.com/128/399/399274.png'/></button> */}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3 mb-3">
        <TripModal />
      </div>
    </div>
  );
};

export default TripList;
