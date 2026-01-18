document.addEventListener('DOMContentLoaded', function () {

  /*******************
   * Map initialization
   *******************/
  // Centered on Pakistan (balanced view for all regions)
  const map = L.map('map').setView([30.3753, 69.3451], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  /*******************
   * Tourist locations (Pakistan)
   *******************/
  const touristSpots = [

    /* 🏔 Hunza Valley */
    {
      name: "Karimabad (Hunza)",
      lat: 36.3167,
      lon: 74.6500,
      category: "Mountain",
      info: "Main tourist town of Hunza Valley."
    },
    {
      name: "Baltit Fort",
      lat: 36.3208,
      lon: 74.6666,
      category: "Heritage",
      info: "700-year-old fort and cultural landmark."
    },

    /* 🌊 Sindh Coast */
    {
      name: "Mubarak Village",
      lat: 24.8416,
      lon: 66.7011,
      category: "Coastal",
      info: "Traditional fishing village on the Arabian Sea."
    },

    /* 🏔 Skardu */
    {
      name: "Shangrila Lake (Skardu)",
      lat: 35.2926,
      lon: 75.6440,
      category: "Mountain",
      info: "Famous alpine lake near Skardu."
    },

    /* 🏞 Swat Valley */
    {
      name: "Kalam Valley (Swat)",
      lat: 35.4794,
      lon: 72.5850,
      category: "Mountain",
      info: "Popular hill station with rivers and forests."
    },

    /* 🕌 Lahore */
    {
      name: "Badshahi Mosque",
      lat: 31.5880,
      lon: 74.3100,
      category: "Heritage",
      info: "One of the largest mosques of the Mughal era."
    },
    {
      name: "Lahore Fort",
      lat: 31.5886,
      lon: 74.3150,
      category: "Heritage",
      info: "UNESCO World Heritage Site."
    },

    /* 🏜 Thar & Sindh */
    {
      name: "Thar Desert",
      lat: 24.8825,
      lon: 70.2170,
      category: "Desert",
      info: "Largest desert in Pakistan with unique culture."
    },
    {
      name: "Chaukhandi Tombs",
      lat: 24.8806,
      lon: 67.8389,
      category: "Heritage",
      info: "Historic Islamic cemetery near Karachi."
    }
  ];

  /*******************
   * Category colors
   *******************/
  const categoryStyles = {
    Mountain: { color: "#2E8B57", fill: "#3CB371" },
    Coastal:  { color: "#005f73", fill: "#0a9396" },
    Heritage: { color: "#8B0000", fill: "#CD5C5C" },
    Desert:   { color: "#B8860B", fill: "#F4A261" }
  };

  /*******************
   * Add markers
   *******************/
  touristSpots.forEach(spot => {
    const style = categoryStyles[spot.category];

    L.circleMarker([spot.lat, spot.lon], {
      radius: 8,
      color: style.color,
      weight: 2,
      fillColor: style.fill,
      fillOpacity: 0.8
    })
    .addTo(map)
    .bindPopup(`
      <strong>${spot.name}</strong><br>
      <em>${spot.category} Tourism</em><br>
      ${spot.info}
    `);
  });

  /*******************
   * Legend
   *******************/
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `<h4>Tourism Categories</h4>`;

    Object.entries(categoryStyles).forEach(([cat, style]) => {
      div.innerHTML += `
        <div style="margin-bottom:5px;">
          <span style="
            display:inline-block;
            width:12px;height:12px;
            background:${style.fill};
            border:2px solid ${style.color};
            border-radius:50%;
            margin-right:6px;
          "></span>${cat}
        </div>`;
    });

    return div;
  };

  legend.addTo(map);

});
