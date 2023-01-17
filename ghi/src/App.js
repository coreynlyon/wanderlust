import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TripForm from './TripForm';
import TripList from './TripList';
import MainPage from './MainPage';
import ItineraryForm from './ItineraryForm';
import ItineraryDetails from './ItineraryDetails';
import Nav from './Nav';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/trips/new" element={<TripForm />} />
            <Route path="/itineraries/new" element={<ItineraryForm />} />
            <Route path="/itineraries/details" element={<ItineraryDetails/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}
export default App;
