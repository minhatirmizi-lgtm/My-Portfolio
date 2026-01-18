const projects = [
  // 5 HTML PROJECTS
  { title: "Simple Calculator", 
    type: "Web App", 
    file: "Projects/Ass_calculator/index_cal.HTML", 
    img: "images/Simple Calculator.JPG",
  category: "HTML" },
  { title: "GeoJSON Viewer", 
    type: "Web App", 
    file: "Projects/Geojson/index_Geo.html",
     img: "images/Geojson.JPG",
    category: "HTML" },
  { title: "My Travel Route Map", 
    type: "Web App", 
    file: "Projects/Lab Work leaflet/index_Leaflet.html", 
    img: "images/Travel Plan.JPG",
  category: "HTML" },
  { title: "My Leaflet Map", 
    type: "Web App", 
    file: "Projects/Raod map using api/index_API.html", 
    img: "images/Api.JPG", 
    category: "HTML" },
  { title: "My Leaflet Map Pakistan", 
    type: "Web App", 
    file: "Projects/Tourist map/index_pak.html", 
    img: "images/Tour.JPG", 
    category: "HTML" },

  // 10 PDF PROJECTS
  // 10 PDF PROJECTS (Add your exact PDF filenames here)
  { title: "Addressing Wildfire Risks in Australia: GIS-Based Solutions for Early Warning Systems and Climate Change Challenges", file: "doc/Addressing Wildfire Risks in Australia_ GIS-Based Solutions for Early Warning Systems and Climate Change Challenges.pdf", type: "PDF Report", img: "images/Addressing Wildfire Risks in Australia.JPG", category: "PDF" },
  { title: "Comparative Analysis of NDWI and Water Body Changes", file: "doc/DIP Ass#4 (1).pdf", type: "PDF Report", img: "images/NDWI.JPG" },
  { title: "Role of Open-Source Tools in Community-Based Mapping Projects", file: "doc/Geospatial Project Management .pdf", type: "PDF Report", img: "images/Role of Open-Source Tools in Community-Based Mapping Projects.JPG", category: "PDF" },
  { title: "Hyperspectral Analysis: SAM and SFF Tutorial", file: "doc/Hyperspectral Analysis_ SAM and SFF Tutorial.pdf", type: "PDF Report", img: "images/Hyper.JPG", category: "PDF" },
  { title: "Land Cover Classification of Lahore Using Unsupervised Techniques in Remote Sensing and GIS", file: "doc/Land Cover_ Land Use (1).pdf.pdf", type: "PDF Report", img: "images/LULC.JPG", category: "PDF" },
  { title: "Vegetation Analysis of Mubarak Village: A Comprehensive Study of Plant Types and Distribution", file: "doc/Mubarak Village Field Report-2.pdf", type: "PDF Report", img: "images/Vegetation Analysis of Mubarak Village.JPG", category: "PDF" },
  { title: "Plant Biodiversity", file: "doc/Plant Biodiversity .pdf", type: "PDF Report", img: "images/biodiversity.JPG", category: "PDF" },
  { title: "Field Report for the Northern Trip: Understanding the environment in its natural habitat", file: "doc/Report (5).pdf", type: "PDF Report", img: "images/Field report.JPG", category: "PDF" },
  { title: "Urban Heat Island (UHI) Analysis in New York City Using Remote Sensing and GIS", file: "doc/Spatial Analysis Report.pdf", type: "PDF Report", img: "images/UHI.JPG", category: "PDF" },
  { title: "Unwilling Urban Growth and Demographic Trends Through Supervised Classification Techniques", file: "doc/Unwilling Urban Growth and Demographic Trends Through Supervised Classification Techniques.pdf", type: "PDF Report", img: "images/Unwilling Urban Growth and Demographic Trends Through Supervised Classification Techniques.JPG", category: "PDF" },

  // 3 IMAGE PROJECTS

  // 3 IMAGE PROJECTS
  { title: "Telling Stories with GIS Maps", type: "Image/Map", file: "map_img1.png", img: "images/project1.JPG", category: "IMAGE" },
  { title: "Building an App in ArcGIS Online to Expand Food Access", type: "Image/Map", file: "map_img2.png", img: "images/project2.JPG", category: "IMAGE" },
  { title: "Creating an Underground Scene in ArcGIS Online", type: "Image/Map", file: "map_img3.png", img: "images/project3.JPG", category: "IMAGE" }
];
 
function loadPortfolio() {
  const grid = document.getElementById('projectGrid');
  // Shuffle all 18 projects
  const mixed = projects.sort(() => Math.random() - 0.5);

  grid.innerHTML = mixed.map(p => `
    <div class="col-md-4 mb-4">
      <div class="card project-card shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="Thumbnail">
        <div class="card-body d-flex flex-column">
          <span class="badge mb-2 align-self-start ${p.category === 'HTML' ? 'bg-success' : p.category === 'PDF' ? 'bg-danger' : 'bg-secondary'}">${p.type}</span>
          <h6 class="fw-bold project-title-text">${p.title}</h6>
          
          ${p.category !== 'IMAGE' ? `<a href="${p.file}" target="_blank" class="btn btn-sm btn-primary mt-auto">View Project</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('themeToggle').textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

window.onload = loadPortfolio;
document.getElementById('year').innerText = new Date().getFullYear();