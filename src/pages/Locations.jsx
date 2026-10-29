import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Locations({ crowdData }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });
  }, []);

  const getCrowdData = (locationName) => {
    return crowdData.find(
      (item) => item.location === locationName
    );
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="dashboard-logo">
          <span className="logo-icon">C</span>
          <span>Campus CrowdSense</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="side-link">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/live" className="side-link">
            <span>◉</span>
            Live Crowd
          </Link>

          <Link to="/locations" className="side-link active">
            <span>⌖</span>
            Locations
          </Link>

          <Link to="/predictions" className="side-link">
            <span>◷</span>
            Predictions
          </Link>

          <Link to="/report" className="side-link">
            <span>✎</span>
            Report Crowd
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="side-link logout">
            <span>↪</span>
            Logout
          </Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Campus Locations</h1>
            <p>View crowd levels across campus locations.</p>
          </div>

          <div className="profile">
            <div className="profile-avatar">R</div>

            <div>
              <strong>Student</strong>
              <span>Campus User</span>
            </div>
          </div>
        </header>

        <section className="locations-grid">
          {locations.map((location) => {
            const crowd = getCrowdData(location.name);

            return (
              <div className="location-card" key={location._id}>
                <div className="location-card-top">
                  <div className="location-symbol green-symbol">
                    {location.name.charAt(0)}
                  </div>

                  <div>
                    <h2>{location.name}</h2>
                    <p>Campus location</p>
                  </div>
                </div>

                <div className="location-crowd">
                  <span>Crowd Level</span>

                  <strong>
                    {crowd ? crowd.level : "No data"}
                  </strong>
                </div>

                <div className="location-percentage">
                  {crowd ? `${crowd.percentage}%` : "--"}
                </div>

                <Link to="/report" className="update-link">
                  Update Crowd →
                </Link>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Locations;