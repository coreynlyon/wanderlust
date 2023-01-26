import Itinerary from "./TripBanner";
import Activities from "./ActivityComponent";
import Checklist from "./ChecklistComponent";

function TripDetails() {

  return (
    <div>
        <div>
          <Itinerary />
          <Activities />
          <Checklist />
        </div>
    </div>
  );
}

export default TripDetails;
