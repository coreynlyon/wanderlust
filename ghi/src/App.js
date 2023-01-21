import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripList from "./TripList";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ItineraryForm from "./ItineraryForm";
import TripDetails from "./TripDetails";
import ActivityForm from "./ActivityForm.js";
import ActivityList from "./ActivityList.js";



function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <div>
      <BrowserRouter basename={basename}>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/itinerary" element={<ItineraryForm />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/activities/" element={<ActivityList />} />
            <Route path="/activities/new/" element={<ActivityForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
