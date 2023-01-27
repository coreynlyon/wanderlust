import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripList from "./TripList";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import TripDetails from "./TripDetails";
import { AuthProvider, useToken } from "./Auth";
import Logout from "./Logout";


function GetToken() {
  useToken();
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <>
      <div>
        <BrowserRouter basename={basename}>
          <AuthProvider>
            <GetToken />
            <Nav />
            <div>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/trips" element={<TripList />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/trip/:id" element={<TripDetails />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
  }
export default App;
