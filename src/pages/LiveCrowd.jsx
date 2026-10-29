import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LiveCrowd({ crowdData }) {
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

          <Link to="/live" className="side-link active">
            <span>◉</span>
            Live Crowd
          </Link>

          <Link to="/locations" className="side-link">
  <span>⌖</span>
  Locations
</Link>

          <Link to="/predictions" className="side-link">
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
            <h1>Live Crowd</h1>
            <p>Real-time crowd levels across your campus.</p>
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

        <section className="stats-grid">

          <div className="dashboard-stat">
            <div className="stat-icon low">●</div>
            <div>
              <span>Low Crowd</span>
              <strong>
                {crowdData.filter((item) => item.level === "Low").length}
              </strong>
              <small>locations</small>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-icon medium">●</div>
            <div>
              <span>Moderate Crowd</span>
              <strong>
                {crowdData.filter((item) => item.level === "Moderate").length}
              </strong>
              <small>locations</small>
            </div>
          </div>

          <div className="dashboard-stat">
            <div className="stat-icon high">●</div>
            <div>
              <span>High Crowd</span>
              <strong>
                {crowdData.filter((item) => item.level === "High").length}
              </strong>
              <small>locations</small>
            </div>
          </div>

        </section>

        <section className="dashboard-card" style={{ marginTop: "24px" }}>

          <div className="card-heading">
            <div>
              <h2>Current Campus Crowd</h2>
              <p>Latest crowd reports from students</p>
            </div>

            <span className="live-badge">
              ● LIVE
            </span>
          </div>

          <div style={{ marginTop: "20px" }}>

            {locations.map((location) => {
  const item = crowdData.find(
    (crowd) => crowd.location === location.name
  );

  return (
    <div
      className="location-row"
      key={location._id}
    >

      <div
        className={
          item?.level === "High"
            ? "location-symbol red-symbol"
            : item?.level === "Moderate"
            ? "location-symbol yellow-symbol"
            : "location-symbol green-symbol"
        }
      >
        {location.name.charAt(0)}
      </div>

      <div className="location-info">

        <strong>{location.name}</strong>

        <span>
          {item
            ? item.level === "High"
              ? "Very crowded"
              : item.level === "Moderate"
              ? "Moderately crowded"
              : "Low crowd"
            : "No crowd report yet"}
        </span>

      </div>

      <strong className="crowd-percent">
        {item ? `${item.percentage}%` : "--"}
      </strong>

    </div>
  );
})}

          </div>

        </section>

      </main>

    </div>
  );
}

export default LiveCrowd;