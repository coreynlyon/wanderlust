import Itinerary from "./ItineraryComponent";
import Activities from "./ActivityComponent";
import Checklist from "./ChecklistComponent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItineraryForm from "./ItineraryForm";

function TripDetails() {
  const tripId = useParams();
  const id = Number(tripId.id);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      const url = `http://localhost:8100/itineraries/trip/${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setItinerary(data[0]);
      }
    };
    fetchItinerary();
  }, [id]);

  return (
    <div>
      {itinerary ? (
        <div>
          <Itinerary />
          <Activities />
          <Checklist />
        </div>
      ) : (
        <ItineraryForm />
      )}
    </div>
  );
}

export default TripDetails;
