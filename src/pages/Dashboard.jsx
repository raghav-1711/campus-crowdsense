import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeatMap from "./HeatMap";

function Dashboard({ crowdData, reportCount }) {

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

  const dashboardCrowdData = locations.map((location) => {
    const crowd = crowdData.find(
  (item) =>
    item.location.trim().toLowerCase() ===
    location.name.trim().toLowerCase()
);

    return {
      location: location.name,
      level: crowd ? crowd.level : "Low",
      percentage: crowd ? crowd.percentage : 0
    };
  });

  const lowCount = dashboardCrowdData.filter(
    (item) => item.level === "Low"
  ).length;

  const moderateCount = dashboardCrowdData.filter(
    (item) => item.level === "Moderate"
  ).length;

  const highCount = dashboardCrowdData.filter(
    (item) => item.level === "High"
  ).length;

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="dashboard-logo">
          <span className="logo-icon">C</span>
          <span>Campus CrowdSense</span>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard" className="side-link active">
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

          <Link to="/predictions" className="side-link">
            <span>◷</span>
            Predictions
          </Link>

          <Link to="/report" className="side-link">
            <span>✎</span>
            Report Crowd
          </Link>

          <Link to="/survey" className="side-link">
            <span>?</span>
            Survey
          </Link>

        </nav>

        <div className="sidebar-bottom">

          <Link to="/" className="side-link logout">
            <span>↪</span>
            Logout
          </Link>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <div>
            <h1>Campus Dashboard</h1>
            <p>
              Monitor real-time crowd activity across campus.
            </p>
          </div>

          <div className="profile">

            <div className="profile-avatar">
              R
            </div>

            <div>
              <strong>Student</strong>
              <span>Campus User</span>
            </div>

          </div>

        </header>

        {/* WELCOME */}
        <section className="dashboard-welcome">

          <div>
            <h2>Good Evening, Student 👋</h2>

            <p>
              Here's the current crowd overview of your campus.
            </p>
          </div>

          <Link to="/report" className="welcome-button">
            Report Crowd
          </Link>

        </section>

        {/* STATISTICS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon green">
              L
            </div>

            <div>
              <span>Low Crowd</span>
              <strong>{lowCount}</strong>
              <small>Locations</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon yellow">
              M
            </div>

            <div>
              <span>Moderate Crowd</span>
              <strong>{moderateCount}</strong>
              <small>Locations</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon red">
              H
            </div>

            <div>
              <span>High Crowd</span>
              <strong>{highCount}</strong>
              <small>Locations</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              R
            </div>

            <div>
              <span>Total Reports</span>
              <strong>{reportCount}</strong>
              <small>Today</small>
            </div>

          </div>

        </section>

        {/* HEAT MAP */}
        <div className="dashboard-heatmap">

          <div className="section-header">


          </div>

          <HeatMap
            crowdData={crowdData}
            locations={locations}
          />

        </div>

        {/* LIVE OVERVIEW */}
        <section className="dashboard-card dashboard-overview">

          <div className="card-heading">

            <div>
              <h2>Live Crowd Overview</h2>

              <p>
                Current crowd levels across campus.
              </p>
            </div>

            <Link to="/live" className="view-link">
              View Live →
            </Link>

          </div>

          <div className="overview-list">

            {dashboardCrowdData.map((item) => (

              <div
                className="overview-row"
                key={item.location}
              >

                <div className="overview-location">

                  <div
                    className={
                      item.level === "High"
                        ? "location-symbol red-symbol"
                        : item.level === "Moderate"
                        ? "location-symbol yellow-symbol"
                        : "location-symbol green-symbol"
                    }
                  >
                    {item.location.charAt(0)}
                  </div>

                  <div>

                    <strong>
                      {item.location}
                    </strong>

                    <span>
                      {item.level === "High"
                        ? "Very crowded"
                        : item.level === "Moderate"
                        ? "Moderately crowded"
                        : "Low crowd"}
                    </span>

                  </div>

                </div>

                <div className="overview-progress">

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.percentage}%`
                      }}
                    />

                  </div>

                  <strong>
                    {item.percentage}%
                  </strong>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <Link
            to="/locations"
            className="quick-card"
          >
            <span>⌖</span>

            <strong>
              Explore Locations
            </strong>

            <small>
              Check campus crowd levels
            </small>

          </Link>

          <Link
            to="/predictions"
            className="quick-card"
          >
            <span>◷</span>

            <strong>
              View Predictions
            </strong>

            <small>
              See expected busy periods
            </small>

          </Link>

          <Link
            to="/survey"
            className="quick-card"
          >
            <span>?</span>

            <strong>
              Take Survey
            </strong>

            <small>
              Help improve crowd accuracy
            </small>

          </Link>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;