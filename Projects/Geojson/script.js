// Step 4 – Initialize the map
var map = L.map('map').setView([0, 0], 1);

// Add base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Step 5 – Layer group (stores current GeoJSON)
var layers = L.layerGroup().addTo(map);

// Step 6 – Button functionality
document.getElementById("submit").addEventListener("click", function () {
    try {
        // Clear previous data
        layers.clearLayers();

        // Read text
        let text = document.getElementById("geojsontext").value;

        // Convert string → JSON object
        let jsonData = JSON.parse(text);

        // Add to map
        L.geoJSON(jsonData).addTo(layers);

    } catch (e) {
        alert("Invalid GeoJSON! Please check your syntax.");
    }
});
