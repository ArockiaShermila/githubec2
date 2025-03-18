const API_URL = "https://226vnlhm09.execute-api.us-east-1.amazonaws.com/drone";  // Replace with actual API Gateway URL
const STREAM_URL = "https://your-cloudfront-url";  // Replace with CloudFront live video stream

function requestTour() {
    const location = document.getElementById("locationInput").value;
    const responseDiv = document.getElementById("response");

    if (!location) {
        responseDiv.innerHTML = "<p style='color:red;'>Please enter a location!</p>";
        return;
    }

    responseDiv.innerHTML = "<p>Requesting tour...</p>";

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location })
    })
    .then(response => response.json())
    .then(data => {
        responseDiv.innerHTML = `<p>${data.message}</p>`;
        document.getElementById("liveStream").src = STREAM_URL;  // Load live stream
    })
    .catch(error => {
        responseDiv.innerHTML = "<p style='color:red;'>Error: Unable to connect to server.</p>";
        console.error("Error:", error);
    });
}

function askAssistant() {
    fetch(API_URL + "/voice-assistant")
    .then(response => response.json())
    .then(data => {
        document.getElementById("voiceResponse").innerText = data.response;
    })
    .catch(error => console.error("Voice assistant error:", error));
}

