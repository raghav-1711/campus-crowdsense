import {
  MapContainer,
  TileLayer,
  Circle,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function HeatMap({ crowdData, locations }) {

  const mapCenter = [12.84303, 80.15643];

  const getColor = (percentage) => {
    if (percentage >= 70) return "#ef4444";
    if (percentage >= 40) return "#facc15";
    return "#22c55e";
  };

  const getStatus = (percentage) => {
    if (percentage >= 70) return "High Crowd";
    if (percentage >= 40) return "Moderate Crowd";
    return "Low Crowd";
  };

  return (
    <div className="heatmap-page">

      <div className="heatmap-container">

        <MapContainer
          center={mapCenter}
          zoom={17}
          style={{
            height: "600px",
            width: "100%"
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((location) => {

            const crowd = crowdData.find(
              (item) =>
                item.location.trim().toLowerCase() ===
                location.name.trim().toLowerCase()
            );

            const percentage = crowd
              ? crowd.percentage
              : 0;

            const color = getColor(percentage);

            if (
              location.latitude === undefined ||
              location.longitude === undefined
            ) {
              return null;
            }

            return (
              <Circle
                key={location._id}
                center={[
                  location.latitude,
                  location.longitude
                ]}
                radius={140}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.35,
                  weight: 2
                }}
              >

                <Popup>

                  <strong>
                    {location.name}
                  </strong>

                  <br />

                  Crowd: {percentage}%

                  <br />

                  Status: {getStatus(percentage)}

                  <br />

                  Capacity: {location.capacity || "N/A"}

                </Popup>

              </Circle>
            );
          })}

        </MapContainer>

      </div>

      <div className="heatmap-legend">

        <div>
          <span className="legend-dot low"></span>
          Low Crowd
        </div>

        <div>
          <span className="legend-dot moderate"></span>
          Moderate Crowd
        </div>

        <div>
          <span className="legend-dot high"></span>
          High Crowd
        </div>

      </div>

    </div>
  );
}

export default HeatMap;