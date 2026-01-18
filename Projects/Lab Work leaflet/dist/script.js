// Create map and view
const map = L.map('map', { zoomControl: true }).setView([25.5, 68.0], 6);

// Add online OSM tile layer (lab expects online tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Route points (Lat,Lng)
const routePoints = [
  { name: "Karachi", coords: [24.8607, 67.0011], info: "Karachi — a busy port city." },
  { name: "Hyderabad", coords: [25.3960, 68.3578], info: "Hyderabad — historical city." },
  { name: "Sukkur", coords: [27.7052, 68.8570], info: "Sukkur — on the Indus River." }
];

// Add markers and popups
const markers = [];
routePoints.forEach((p, i) => {
  const m = L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.name}</strong><br>${p.info}`);
  markers.push(m);
});

// Add polyline
const latlngs = routePoints.map(p => p.coords);
const routeLine = L.polyline(latlngs, { color: 'royalblue', weight: 4, opacity: 0.85 }).addTo(map);

// Add a sample circle and polygon like the screenshot (optional)
const circle = L.circle([24.9, 67.05], { radius: 12000, color: 'red', fillOpacity: 0.15 }).addTo(map);
const polygon = L.polygon([[25.5, 68.4],[25.7,68.8],[25.2,69.1]], { color: 'blue', fillOpacity:0.1 }).addTo(map);

// Fit to route
map.fitBounds(routeLine.getBounds());

// Reset view button behavior
document.getElementById('resetBtn').addEventListener('click', () => {
  map.fitBounds(routeLine.getBounds());
});

// Sidebar location clicks open marker popup and zoom
document.querySelectorAll('.loc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = Number(btn.getAttribute('data-idx'));
    const p = routePoints[idx];
    markers[idx].openPopup();
    map.setView(p.coords, 10);
  });
});

// Optional: show popup on polyline click
routeLine.on('click', () => {
  L.popup()
    .setLatLng(routeLine.getBounds().getCenter())
    .setContent(`<strong>Route</strong><br>${routePoints.length} stops`)
    .openOn(map);
});
