import AdminDashboard from "./pages/AdminDashboard";
import ReportCrowd from "./pages/ReportCrowd";
import LiveCrowd from "./pages/LiveCrowd";
import Locations from "./pages/Locations";
import Predictions from "./pages/Predictions";
import Dashboard from "./pages/Dashboard";
import HeatMap from "./pages/HeatMap";

import Survey from "./pages/Survey";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";


function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <span className="logo-icon">C</span>
          <span>Campus CrowdSense</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>

          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>

      </nav>

      <main className="hero">

        <section className="hero-content">

          <div className="badge">
            ● SMART CAMPUS CROWD MANAGEMENT
          </div>

          <h1>
            Know the crowd.
            <br />
            <span>Plan your campus.</span>
          </h1>

          <p>
            Campus CrowdSense helps students discover live crowd levels,
            report crowded locations, and predict busy hours across campus.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-btn">
              Get Started →
            </Link>

            <Link to="/login" className="secondary-btn">
              View Live Crowd
            </Link>

          </div>

          <div className="stats">

            <div>
              <strong>25+</strong>
              <span>Campus Locations</span>
            </div>

            <div>
              <strong>Live</strong>
              <span>Crowd Updates</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Predictions</span>
            </div>

          </div>

        </section>

        <section className="hero-card">

          <div className="card-header">

            <div>
              <small>LIVE CAMPUS STATUS</small>
              <h2>Today's Crowd</h2>
            </div>

            <span className="live">
              ● LIVE
            </span>

          </div>

          <div className="location">

            <div className="location-icon green">L</div>

            <div>
              <strong>Central Library</strong>
              <span>Low crowd</span>
            </div>

            <b>32%</b>

          </div>

          <div className="location">

            <div className="location-icon yellow">C</div>

            <div>
              <strong>Cafeteria</strong>
              <span>Moderate crowd</span>
            </div>

            <b>61%</b>

          </div>

          <div className="location">

            <div className="location-icon red">G</div>

            <div>
              <strong>Campus Gym</strong>
              <span>High crowd</span>
            </div>

            <b>87%</b>

          </div>

          <div className="mini-map">

            <div className="map-title">
              CAMPUS HEAT MAP
            </div>

            <div className="map-point point-one">●</div>
            <div className="map-point point-two">●</div>
            <div className="map-point point-three">●</div>
            <div className="map-point point-four">●</div>

          </div>

        </section>

      </main>

    </div>
  );
}





function App() {

  const [crowdData, setCrowdData] = useState([
    {
      location: "Cafeteria",
      level: "High",
      percentage: 87
    },
    {
      location: "Campus Gym",
      level: "Moderate",
      percentage: 74
    },
    {
      location: "Central Library",
      level: "Low",
      percentage: 32
    },
    {
      location: "Block B",
      level: "Low",
      percentage: 24
    }
  ]);

  const [reportCount, setReportCount] = useState(0);

useEffect(() => {
  const fetchCrowdData = () => {
    fetch("http://localhost:5000/api/crowd")
      .then((response) => response.json())
      .then((reports) => {
        setCrowdData(
          reports.map((report) => ({
            location: report.location,
            level: report.crowdLevel,
            percentage: report.percentage,
            updatedAt: report.updatedAt
          }))
        );
      })
      .catch((error) => {
        console.error(
          "Failed to fetch crowd reports:",
          error
        );
      });

    fetch("http://localhost:5000/api/crowd/stats")
      .then((response) => response.json())
      .then((data) => {
        setReportCount(data.reportCountToday);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch report count:",
          error
        );
      });
  };

  fetchCrowdData();

  const interval = setInterval(fetchCrowdData, 5000);

  return () => clearInterval(interval);
}, []);

  const handleReport = ({ location, crowdLevel }) => {

    let percentage;

    if (crowdLevel === "Low") {
      percentage = Math.floor(Math.random() * 25) + 10;
    }

    if (crowdLevel === "Moderate") {
      percentage = Math.floor(Math.random() * 20) + 50;
    }

    if (crowdLevel === "High") {
      percentage = Math.floor(Math.random() * 15) + 80;
    }


    setCrowdData((previousData) =>
      previousData.map((item) =>
        item.location === location
          ? {
            ...item,
            level: crowdLevel,
            percentage: percentage
          }
          : item
      )
    );



  };


  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<Dashboard
            crowdData={crowdData}
            reportCount={reportCount}
          />}
        />

        <Route
  path="/survey"
  element={<Survey />}
/>

        <Route
          path="/report"
          element={<ReportCrowd onReport={handleReport} />}
        />

        <Route
          path="/live"
          element={<LiveCrowd crowdData={crowdData} />}
        />

        <Route
          path="/locations"
          element={<Locations crowdData={crowdData} />}
        />

        <Route
          path="/predictions"
          element={<Predictions crowdData={crowdData} />}
        />

        <Route path="/heatmap" element={<HeatMap crowdData={crowdData} />} />

        <Route
  path="/admin"
  element={<AdminDashboard />}
/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;