import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TripList from './TripList';
import MainPage from './MainPage';
import Nav from './Nav';
import ItineraryForm from './ItineraryForm';
import TripDetails from './TripDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/itinerary" element={<ItineraryForm />} />
            <Route path="/trip/:id" element={<TripDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}
export default App;
