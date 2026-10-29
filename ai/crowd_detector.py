from ultralytics import YOLO
import cv2
import requests
import time

MODEL = YOLO("yolo11n.pt")

LOCATION = "Central Library"

LOCATION_API = "http://localhost:5000/api/locations"

CAPACITY = 100

try:
    response = requests.get(LOCATION_API)
    locations = response.json()

    for location in locations:
        if location["name"].strip().lower() == LOCATION.strip().lower():
            CAPACITY = location.get("capacity", 100)
            break

except Exception as error:
    print("Could not fetch location capacity:", error)
BACKEND_URL = "http://localhost:5000/api/crowd"

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Could not open camera")
    exit()

print("Crowd detection started...")
print("Press Q to stop")

last_sent = 0

while True:

    ret, frame = cap.read()

    if not ret:
        break

    results = MODEL(frame)

    person_count = 0

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            if class_id == 0:
                person_count += 1

    percentage = round(
        (person_count / CAPACITY) * 100
    )

    percentage = min(percentage, 100)

    if percentage < 40:
        crowd_level = "Low"

    elif percentage < 70:
        crowd_level = "Moderate"

    else:
        crowd_level = "High"

    cv2.putText(
        frame,
        f"People: {person_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        f"Crowd: {percentage}% - {crowd_level}",
        (20, 80),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 255),
        2
    )

    current_time = time.time()

    if current_time - last_sent >= 5:

        try:

            response = requests.post(
                BACKEND_URL,
                json={
                    "location": LOCATION,
                    "crowdLevel": crowd_level,
                    "percentage": percentage
                }
            )

            print(
                f"Location: {LOCATION} | "
                f"People: {person_count} | "
                f"Crowd: {percentage}% | "
                f"Status: {crowd_level}"
            )

        except Exception as error:

            print(
                "Backend connection failed:",
                error
            )

        last_sent = current_time

    cv2.imshow(
        "Campus CrowdSense - AI Detection",
        frame
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()

cv2.destroyAllWindows()