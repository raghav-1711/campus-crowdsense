import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Predictions({ crowdData }) {
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

          <Link to="/locations" className="side-link">
            <span>⌖</span>
            Locations
          </Link>

          <Link to="/predictions" className="side-link active">
            <span>◷</span>
            Predictions
          </Link>

          <Link to="/report" className="side-link">
            <span>＋</span>
            Report Crowd
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <a href="#profile" className="side-link">
            <span>⚙</span>
            Settings
          </a>

          <Link to="/" className="side-link logout">
            <span>↪</span>
            Logout
          </Link>

        </div>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>Crowd Predictions</h1>
            <p>Predicted crowd levels for today.</p>
          </div>

          <div className="header-actions">

            <button className="notification-btn">
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="profile">
              <div className="profile-avatar">S</div>

              <div>
                <strong>Student</strong>
                <span>Student Account</span>
              </div>
            </div>

          </div>

        </header>

        <section className="dashboard-card">

          <div className="card-heading">

            <div>
              <h2>Today's Expected Crowd</h2>
              <p>AI-based prediction of busy campus hours</p>
            </div>

            <span className="prediction-icon">
              AI
            </span>

          </div>

          <div className="prediction-bars">

            <div className="prediction-item">
              <span>9 AM</span>

              <div className="bar">
                <div style={{ width: "35%" }}></div>
              </div>

              <b>Low</b>
            </div>

            <div className="prediction-item">
              <span>12 PM</span>

              <div className="bar">
                <div style={{ width: "82%" }}></div>
              </div>

              <b>High</b>
            </div>

            <div className="prediction-item">
              <span>3 PM</span>

              <div className="bar">
                <div style={{ width: "55%" }}></div>
              </div>

              <b>Moderate</b>
            </div>

            <div className="prediction-item">
              <span>6 PM</span>

              <div className="bar">
                <div style={{ width: "76%" }}></div>
              </div>

              <b>High</b>
            </div>

          </div>

        </section>

        <section
          className="dashboard-grid"
          style={{ marginTop: "24px" }}
        >

          {locations.map((location) => {
  const item = crowdData.find(
    (crowd) => crowd.location === location.name
  );

  return (
    <div className="dashboard-card" key={location._id}>

      <div className="card-heading">

        <div>
          <h2>{location.name}</h2>
          <p>
            Current crowd: {item ? `${item.percentage}%` : "No data"}
          </p>
        </div>

        <span className="prediction-icon">
          AI
        </span>

      </div>

      <div style={{ marginTop: "20px" }}>

        <p>
          Expected busiest period:
        </p>

        <strong style={{ fontSize: "22px" }}>
          {item
            ? item.level === "High"
              ? "12 PM – 2 PM"
              : item.level === "Moderate"
              ? "1 PM – 3 PM"
              : "10 AM – 12 PM"
            : "Not enough data"}
        </strong>

      </div>

    </div>
  );
})}

        </section>

      </main>

    </div>
  );
}

export default Predictions;