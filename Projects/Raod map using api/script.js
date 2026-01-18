// script.js
document.addEventListener('DOMContentLoaded', function () {
  /*******************
   * Map & base layer
   *******************/
  const map = L.map('map').setView([42.3601, -71.0589], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  /***************
   * Simple markers
   ***************/
  // 1) Default pin marker
  L.marker([42.3523, -71.0550]).addTo(map).bindPopup("South Station");

  // 2) Styled circle marker (thin blue ring)
  L.circleMarker([42.3656, -71.0616], {
    radius: 7,
    color: "blue",
    weight: 3,
    fillColor: "lightblue",
    fillOpacity: 0.25
  }).addTo(map).bindPopup("North Station");

  // 3) Multiple locations from data
  const locations = [
    { name: "Downtown Crossing", lat: 42.3555, lon: -71.0600 },
    { name: "Harvard Square",    lat: 42.3733, lon: -71.1189 },
    { name: "Park Street",       lat: 42.3563, lon: -71.0624 }
  ];

  locations.forEach(loc => {
    L.marker([loc.lat, loc.lon]).addTo(map).bindPopup(loc.name);
  });

  /*************************
   * (Optional) MBTA live trains
   *
   * NOTE: The MBTA API is used in the tutorial. If you copy this to
   * a local file and your browser blocks cross-origin requests (CORS),
   * run with Live Server (VSCode) or host on HTTPS. See troubleshooting.
   *************************/
  let trainMarkers = {};

  const lineColors = {
    Red: '#DA291C',
    Orange: '#ED8B00',
    Blue: '#003DA5',
    'Green-B': '#00843D',
    'Green-C': '#00843D',
    'Green-D': '#00843D',
    'Green-E': '#00843D'
  };

  const routeLabel = (id) => (id ? id.replace('-', ' ') : 'Unknown');

  function createTrainIcon(color) {
    return L.divIcon({
      className: 'train-icon',
      html: `<div style="
        background-color:${color};
        width:12px;height:12px;border-radius:50%;
        border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,.4);
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  }

  async function updateTrainPositions() {
    try {
      // This is MBTA's public vehicles endpoint (as used in the tutorial)
      const url = 'https://api-v3.mbta.com/vehicles?filter[route_type]=0,1&include=route,stop';
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Network response was not ok');
      const json = await resp.json();

      // Build stop lookup (if included)
      const stopNameById = {};
      if (Array.isArray(json.included)) {
        json.included.forEach(item => {
          if (item.type === 'stop') {
            stopNameById[item.id] = item.attributes?.name || '';
          }
        });
      }

      // Remove old markers
      Object.values(trainMarkers).forEach(m => m.remove());
      trainMarkers = {};

      // Add new markers
      (json.data || []).forEach(v => {
        const lat = v?.attributes?.latitude;
        const lon = v?.attributes?.longitude;
        if (lat == null || lon == null) return;

        const routeId = v?.relationships?.route?.data?.id || 'Unknown';
        const color = lineColors[routeId] || '#666';
        const dir = v?.attributes?.direction_id === 0 ? 'Outbound' : 'Inbound';
        const status = v?.attributes?.current_status || 'In Transit';

        const speedMps = v?.attributes?.speed;
        const speedMph = (typeof speedMps === 'number') ? Math.round(speedMps * 2.237) : '—';

        const stopId = v?.relationships?.stop?.data?.id || null;
        const stopName = stopId && stopNameById[stopId] ? stopNameById[stopId] : '';
        const atText = (status === 'STOPPED_AT' && stopName) ? ` at <em>${stopName}</em>` : '';

        const popupHtml = `
          <strong>Line:</strong> ${routeLabel(routeId)}<br>
          <strong>Direction:</strong> ${dir}<br>
          <strong>Status:</strong> ${status}${atText}<br>
          <strong>Speed:</strong> ${speedMph} mph
        `;

        const marker = L.marker([lat, lon], { icon: createTrainIcon(color) })
          .bindPopup(popupHtml)
          .addTo(map);

        trainMarkers[v.id] = marker;
      });

      // console.log('Trains updated:', Object.keys(trainMarkers).length);
    } catch (e) {
      console.error('Error fetching MBTA vehicles:', e);
    }
  }

  // Initial load + refresh every 10s (change interval or remove if you don't want live updates)
  updateTrainPositions();
  setInterval(updateTrainPositions, 10000);

  /*********
   * Legend
   *********/
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<h4 style="margin:0 0 6px 0;">MBTA Lines</h4>';
    Object.entries(lineColors).forEach(([id, color]) => {
      div.innerHTML += `
        <div style="margin:5px 0; font-size:13px;">
          <span style="
            display:inline-block;width:12px;height:12px;margin-right:6px;
            background:${color};border-radius:50%;border:1px solid #fff;
            box-shadow:0 1px 2px rgba(0,0,0,.2);
          "></span>${routeLabel(id)}
        </div>`;
    });
    return div;
  };
  legend.addTo(map);

});
