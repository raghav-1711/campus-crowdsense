import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Survey() {
  const [surveys, setSurveys] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/surveys")
      .then((response) => response.json())
      .then((data) => {
        setSurveys(data.filter((survey) => survey.active));
      })
      .catch((error) => {
        console.error("Failed to fetch surveys:", error);
      });
  }, []);

  const handleAnswer = (surveyId, location, answer) => {
  setSelectedAnswers((previous) => ({
    ...previous,
    [surveyId]: answer
  }));

  fetch("http://localhost:5000/api/survey-responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      surveyId,
      location,
      crowdLevel: answer
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Survey response saved:", data);
    })
    .catch((error) => {
      console.error("Failed to save survey response:", error);
    });
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

          <Link to="/survey" className="side-link active">
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

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>Crowd Survey</h1>
            <p>Help us keep campus crowd information accurate.</p>
          </div>

          <div className="profile">
            <div className="profile-avatar">R</div>

            <div>
              <strong>Student</strong>
              <span>Campus User</span>
            </div>
          </div>

        </header>

        <section className="survey-grid">

          {surveys.length === 0 ? (
            <div className="dashboard-card">
              <h2>No Active Surveys</h2>
              <p>
                There are currently no active crowd surveys.
              </p>
            </div>
          ) : (
            surveys.map((survey) => (
              <div
                className="dashboard-card survey-card"
                key={survey._id}
              >

                <div className="card-heading">

                  <div>
                    <h2>{survey.question}</h2>

                    <p>
                      Location: {survey.location}
                    </p>
                  </div>

                  <span className="prediction-icon">
                    ?
                  </span>

                </div>

                <div className="survey-options">

                  {survey.options.map((option) => (
                    <button
                      key={option}
                      className={
                        selectedAnswers[survey._id] === option
                          ? "survey-option selected"
                          : "survey-option"
                      }
                      onClick={() =>
  handleAnswer(
    survey._id,
    survey.location,
    option
  )
}
                    >
                      {option}
                    </button>
                  ))}

                </div>

                {selectedAnswers[survey._id] && (
                  <p className="survey-selected">
                    Selected: {selectedAnswers[survey._id]}
                  </p>
                )}

              </div>
            ))
          )}

        </section>

      </main>

    </div>
  );
}

export default Survey;