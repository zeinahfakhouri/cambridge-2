// Sample Data: Training Centers
const trainingCenters = [
{
id: "TC1",
name: "Amman Advanced Tech center",
location: "Amman",
description: "Specialized in Web Development and cloud Computing.",
accreditationStatus: "Active",
accreditationDate: "2024-01-15"
},

{
id: "TC2",
name: "Zarqa Academy for Training",
location: "Zarqa",
description: "Provides professional business and IT courses.",
accreditationStatus: "Active",
accreditationDate: "2022-10-22"
},

{
id: "TC3",
name: "Future Skills Institute",
location: "Irbid",
description: "Focuses on Artificial Intelligence and Data Science.",
accreditationStatus: "Inactive",
accreditationDate: "2022-05-10"
},

{
id: "TC4",
name: "Pioneer Professional Hub",
location: "Amman",
description: "Executive training and digital transformation.",
accreditationStatus: "Active",
accreditationDate: "2024-03-01"
},

{
id: "TC5",
name: "Legacy Education Center",
location: "Aqaba",
description: "Logistics and international communication skills.",
accreditationStatus: "Inactive",
accreditationDate: "2021-09-12"
},

{
id: "TC6",
name: "Horizon Tech & Design",
location: "Amman",
description: "UI/UX design, graphics, and frontend engineering.",
accreditationStatus: "Active",
accreditationDate: "2024-06-18"
}
];

// Sample Data: Trainers
const trainers = [
{
id: "TR1",
name: "Zeinah Al-Fakhouri",
specialization: "Frontend Web Development",
centerId: "TC1",
accreditationStatus: "Active",
accreditationDate: "2024-02-07"
},

{
id: "TR2",
name: "Ahmad Al-Mansi",
specialization: "Database Management & SQL",
centerId: "TC2",
accreditationStatus: "Active",
accreditationDate: "2023-12-05"
},

{
id: "TR3",
name: "Sami Al-Majali",
specialization: "Data Science & Python",
centerId: "TC3",
accreditationStatus: "Active",
accreditationDate: "2023-01-10"
},

{
id: "TR4",
name: "Laila Al-Momani",
specialization: "UI/UX Design Systems",
centerId: "TC6",
accreditationStatus: "Inactive",
accreditationDate: "2024-08-15"
},

{
id: "TR5",
name: "Omar Al-Qudah",
specialization: "Project Management",
centerId: "TC4",
accreditationStatus: "Active",
accreditationDate: "2024-04-10"
},

{
id: "TR6",
name: "Rania Haddad",
specialization: "Business Analytics",
centerId: "TC1",
accreditationStatus: "Active",
accreditationDate: "2024-05-22"
}
];

// Helper Function: Get center name by centerId
function getCenterName(centerId) {
const center = trainingCenters.find(c => c.id === centerId);
return center ? center.name : "Unknown Center";
}

// Function: Render Training Centers
function renderTrainingCenters(searchTerm = "") {
const container = document.getElementById("centers-container");
if (!container) return;
container.innerHTML = "";

const activeCenters = trainingCenters.filter(center => {
const isActive = center.accreditationStatus.toLowerCase() === "active";
const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase());
return isActive && matchesSearch;
});

if (activeCenters.length === 0) {
container.innerHTML = `<p class="no-results">No accredited training centers found matching your criteria.</p>`;
return;
}

activeCenters.forEach(center => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
<div>
<h3>${center.name}</h3>
<p class="card-info"><strong>Location:</strong> ${center.location}</p>
<p class="card-info">${center.description}</p>
</div>
<div>
<p class="card-info"><strong>Accredited Since:</strong> ${center.accreditationDate}</p>
<span class="status-badge">${center.accreditationStatus}</span>
</div>
`;
container.appendChild(card);
});
}

// Function: Render Trainers
function renderTrainers(searchTerm = "") {
const container = document.getElementById("trainers-container");
if (!container) return;
container.innerHTML = "";

const activeTrainers = trainers.filter(trainer => {
const isTrainerActive = trainer.accreditationStatus.toLowerCase() === "active";
const parentCenter = trainingCenters.find(c => c.id === trainer.centerId);
const isCenterActive = parentCenter && parentCenter.accreditationStatus.toLowerCase() === "active";
const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase());

return isTrainerActive && isCenterActive && matchesSearch;
});

if (activeTrainers.length === 0) {
container.innerHTML = `<p class="no-results">No accredited trainers found matching your criteria.</p>`;
return;
}

activeTrainers.forEach(trainer => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
<div>
<h3>${trainer.name}</h3>
<p class="card-info"><strong>Specialization:</strong> ${trainer.specialization}</p>
<p class="card-info"><strong>Center:</strong> ${getCenterName(trainer.centerId)}</p>
</div>
<div>
<p class="card-info"><strong>Accredited Since:</strong> ${trainer.accreditationDate}</p>
<span class="status-badge">${trainer.accreditationStatus}</span>
</div>
`;
container.appendChild(card);
});
}

// Initialize Page Elements & Event Listeners
document.addEventListener("DOMContentLoaded", () => {
// Set Footer Year Dynamically
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
yearSpan.textContent = new Date().getFullYear();
}

// Initial Rendering
renderTrainingCenters();
renderTrainers();

// Search Listener for Training Centers
const centerSearchInput = document.getElementById("center-search");
if (centerSearchInput) {
centerSearchInput.addEventListener("input", (e) => {
renderTrainingCenters(e.target.value.trim());
});
}

// Search Listener for Trainers
const trainerSearchInput = document.getElementById("trainer-search");
if (trainerSearchInput) {
trainerSearchInput.addEventListener("input", (e) => {
renderTrainers(e.target.value.trim());
});
}
});