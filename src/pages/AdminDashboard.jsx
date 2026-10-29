import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");

  const [surveys, setSurveys] = useState([]);
  const [question, setQuestion] = useState("");
  const [surveyLocation, setSurveyLocation] = useState("");

  const fetchLocations = () => {
    fetch("http://localhost:5000/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error("Failed to fetch locations:", error);
      });
  };

  const fetchSurveys = () => {
    fetch("http://localhost:5000/api/surveys")
      .then((response) => response.json())
      .then((data) => {
        setSurveys(data);
      })
      .catch((error) => {
        console.error("Failed to fetch surveys:", error);
      });
  };

  useEffect(() => {
    fetchLocations();
    fetchSurveys();
  }, []);

  const addLocation = () => {
    if (
  !locationName.trim() ||
  latitude === "" ||
  longitude === "" ||
  capacity === ""
) 
     {
      alert("Please enter location name, latitude, longitude and capacity.");
      return;
    }

    fetch("http://localhost:5000/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
  name: locationName,
  latitude: Number(latitude),
  longitude: Number(longitude),
  capacity: Number(capacity)
})
    })
      .then((response) => response.json())
      .then(() => {
        setLocationName("");
setLatitude("");
setLongitude("");
setCapacity("");
        fetchLocations();
      })
      .catch((error) => {
        console.error("Failed to add location:", error);
      });
  };

  const deleteLocation = (id) => {
    fetch(`http://localhost:5000/api/locations/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        fetchLocations();
      })
      .catch((error) => {
        console.error("Failed to delete location:", error);
      });
  };

  const createSurvey = () => {
    if (!question.trim() || !surveyLocation) {
      return;
    }

    fetch("http://localhost:5000/api/surveys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        location: surveyLocation,
        options: ["Low", "Moderate", "High"]
      })
    })
      .then((response) => response.json())
      .then(() => {
        setQuestion("");
        setSurveyLocation("");
        fetchSurveys();
      })
      .catch((error) => {
        console.error("Failed to create survey:", error);
      });
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="dashboard-logo">
          <span className="logo-icon">C</span>
          <span>Campus CrowdSense</span>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard" className="side-link">
            <span>⌂</span>
            Student Dashboard
          </Link>

          <Link to="/admin" className="side-link active">
            <span>⚙</span>
            Admin Dashboard
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
            <h1>Admin Dashboard</h1>
            <p>
              Manage campus locations and crowd monitoring.
            </p>
          </div>

          <div className="profile">

            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

          </div>

        </header>

        {/* MANAGE LOCATIONS */}
        <section className="dashboard-card">

          <div className="card-heading">

            <div>
              <h2>Manage Locations</h2>
              <p>
                Add or remove campus locations with map coordinates.
              </p>
            </div>

          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}
          >

            {/* LOCATION NAME */}
            <input
              type="text"
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) =>
                setLocationName(e.target.value)
              }
              style={{
                flex: 2,
                minWidth: "220px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />

            {/* LATITUDE */}
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) =>
                setLatitude(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "140px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />

            {/* LONGITUDE */}
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) =>
                setLongitude(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "140px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />

            <input
  type="number"
  min="1"
  placeholder="Capacity"
  value={capacity}
  onChange={(e) =>
    setCapacity(e.target.value)
  }
  style={{
    flex: 1,
    minWidth: "140px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  }}
/>

            <button
              onClick={addLocation}
              className="report-button"
            >
              + Add Location
            </button>

          </div>

          <p
            style={{
              marginTop: "12px",
              fontSize: "13px",
              color: "#777"
            }}
          >
            Example VIT Chennai coordinates:
            Latitude 12.84407, Longitude 80.15354
          </p>

        </section>

        {/* CREATE SURVEY */}
        <section
          className="dashboard-card"
          style={{ marginTop: "24px" }}
        >

          <div className="card-heading">

            <div>
              <h2>Create Crowd Survey</h2>

              <p>
                Create a survey for students to report current
                crowd levels.
              </p>
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>

            <input
              type="text"
              placeholder="Enter survey question"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxSizing: "border-box"
              }}
            />

            <select
              value={surveyLocation}
              onChange={(e) =>
                setSurveyLocation(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginTop: "12px"
              }}
            >

              <option value="">
                Select location
              </option>

              {locations.map((location) => (
                <option
                  key={location._id}
                  value={location.name}
                >
                  {location.name}
                </option>
              ))}

            </select>

            <button
              onClick={createSurvey}
              className="report-button"
              style={{ marginTop: "16px" }}
            >
              + Create Survey
            </button>

          </div>

        </section>

        {/* SURVEY MANAGEMENT */}
        <section
          className="dashboard-card"
          style={{ marginTop: "24px" }}
        >

          <div className="card-heading">

            <div>
              <h2>Survey Management</h2>

              <p>
                {surveys.length} surveys created
              </p>
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>

            {surveys.length === 0 ? (

              <p>No surveys created yet.</p>

            ) : (

              surveys.map((survey) => (

                <div
                  key={survey._id}
                  className="location-row"
                >

                  <div className="location-symbol green-symbol">
                    ?
                  </div>

                  <div className="location-info">

                    <strong>
                      {survey.question}
                    </strong>

                    <span>
                      {survey.location} •{" "}
                      {survey.active
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                  <button
                    onClick={() => {
                      fetch(
                        `http://localhost:5000/api/surveys/${survey._id}/toggle`,
                        {
                          method: "PATCH"
                        }
                      )
                        .then(() => {
                          fetchSurveys();
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to update survey:",
                            error
                          );
                        });
                    }}
                    style={{
                      border: "none",
                      background: survey.active
                        ? "#fee2e2"
                        : "#dcfce7",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "8px"
                    }}
                  >
                    {survey.active
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() => {
                      fetch(
                        `http://localhost:5000/api/surveys/${survey._id}`,
                        {
                          method: "DELETE"
                        }
                      )
                        .then(() => {
                          fetchSurveys();
                        })
                        .catch((error) => {
                          console.error(
                            "Failed to delete survey:",
                            error
                          );
                        });
                    }}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "20px"
                    }}
                    title="Delete survey"
                  >
                    🗑️
                  </button>

                </div>

              ))

            )}

          </div>

        </section>

        {/* CAMPUS LOCATIONS */}
        <section
          className="dashboard-card"
          style={{ marginTop: "24px" }}
        >

          <div className="card-heading">

            <div>
              <h2>Campus Locations</h2>

              <p>
                {locations.length} locations registered
              </p>
            </div>

          </div>

          <div style={{ marginTop: "20px" }}>

            {locations.length === 0 ? (

              <p>No locations added yet.</p>

            ) : (

              locations.map((location) => (

                <div
                  key={location._id}
                  className="location-row"
                >

                  <div className="location-symbol green-symbol">
                    {location.name.charAt(0)}
                  </div>

                  <div className="location-info">

                    <strong>
                      {location.name}
                    </strong>

                    <span>
                      Lat: {location.latitude} •{" "}
                      Lng: {location.longitude}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      deleteLocation(location._id)
                    }
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "20px"
                    }}
                    title="Delete location"
                  >
                    🗑️
                  </button>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;