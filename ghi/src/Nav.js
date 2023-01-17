import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {/* <img src="https://cdn-icons-png.flaticon.com/512/4312/4312298.png" width="50" height="50" alt="plane" /> */}
          <img src="https://cdn-icons-png.flaticon.com/512/3069/3069318.png" width="40" height="40" alt="plane" /> Wanderlust
      </Link>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/trips">View Trips</NavLink>
          </div>
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/itineraries/new">Create Itinerary</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
