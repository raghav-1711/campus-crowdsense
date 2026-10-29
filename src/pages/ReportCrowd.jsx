

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ReportCrowd({ onReport }) {
  const [location, setLocation] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!location || !crowdLevel) {
    alert("Please select a location and crowd level.");
    return;
  }

  let percentage;

  if (crowdLevel === "Low") {
    percentage = Math.floor(Math.random() * 25) + 10;
  } else if (crowdLevel === "Moderate") {
    percentage = Math.floor(Math.random() * 20) + 50;
  } else {
    percentage = Math.floor(Math.random() * 15) + 80;
  }

  try {
    const response = await fetch("http://localhost:5000/api/crowd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location,
        crowdLevel,
        percentage
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit report");
    }

    onReport({
      location,
      crowdLevel,
      percentage
    });

    alert("Crowd report saved successfully!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Could not save report. Please try again.");
  }
};

  return (
    <div className="report-page">

      <div className="report-form-card">

        <button
          className="report-back"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="report-form-icon">
          +
        </div>

        <h1>Report Crowd Level</h1>

        <p>
          Help other students by reporting the current crowd
          at a campus location.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Select Location</label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select a location</option>

{locations.map((location) => (
  <option key={location._id} value={location.name}>
    {location.name}
  </option>
))}
          </select>


          <label>Current Crowd Level</label>

          <div className="crowd-options">

            <button
              type="button"
              className={crowdLevel === "Low" ? "crowd-option selected-low" : "crowd-option"}
              onClick={() => setCrowdLevel("Low")}
            >
              <span>🟢</span>
              <strong>Low</strong>
              <small>Not crowded</small>
            </button>

            <button
              type="button"
              className={crowdLevel === "Moderate" ? "crowd-option selected-medium" : "crowd-option"}
              onClick={() => setCrowdLevel("Moderate")}
            >
              <span>🟡</span>
              <strong>Moderate</strong>
              <small>Some crowd</small>
            </button>

            <button
              type="button"
              className={crowdLevel === "High" ? "crowd-option selected-high" : "crowd-option"}
              onClick={() => setCrowdLevel("High")}
            >
              <span>🔴</span>
              <strong>High</strong>
              <small>Very crowded</small>
            </button>

          </div>


          <button type="submit" className="submit-report">
            Submit Crowd Report →
          </button>

        </form>

      </div>

    </div>
  );
}

export default ReportCrowd;