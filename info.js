let data = [];

async function loadData() {
  const response = await fetch('data.json');
  data = await response.json();

  setupWorkoutAccordion();
  setupDietAccordion();
}

loadData();

/* -------- WORKOUT ACCORDION -------- */
function setupWorkoutAccordion() {
  const workoutData = data.find(item => item.topic.toLowerCase().includes("workout"));
  const container = document.getElementById("workoutAccordion");

  const days = workoutData.info.split(/\n(?=[A-Z][a-z]+day)/);

  days.forEach(block => {
    const [dayLine, ...exercises] = block.trim().split("\n");
    const day = dayLine.replace(":", "");

    const item = document.createElement("div");
    item.className = "accordion-item";

    item.innerHTML = `
      <div class="accordion-header">
        ${day}
        <span class="arrow">▶</span>
      </div>
      <div class="accordion-content">
        ${exercises.join("<br>")}
      </div>
    `;

    container.appendChild(item);
  });

  enableAccordion();
}

/* -------- DIET ACCORDION -------- */
function setupDietAccordion() {
  const bulking = data.find(i => i.topic.toLowerCase().includes("bulking"));
  const cutting = data.find(i => i.topic.toLowerCase().includes("cutting"));

  const container = document.getElementById("dietAccordion");

  const diets = [
    { title: "💪 Bulking Diet", content: bulking.info.replace(/\n/g, "<br>") },
    { title: "🔥 Cutting Diet", content: cutting.info.replace(/\n/g, "<br>") }
  ];

  diets.forEach(diet => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    item.innerHTML = `
      <div class="accordion-header">
        ${diet.title}
        <span class="arrow">▶</span>
      </div>
      <div class="accordion-content">
        ${diet.content}
      </div>
    `;

    container.appendChild(item);
  });

  enableAccordion();
}

/* -------- ACCORDION TOGGLE -------- */
function enableAccordion() {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.onclick = () => {
      const content = header.nextElementSibling;
      const arrow = header.querySelector(".arrow");

      content.classList.toggle("show");
      arrow.classList.toggle("rotate");
    };
  });
}

/* -------- TAB SWITCH -------- */
function showTab(id, e) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  e.target.classList.add("active");
}

/* -------- LOGOUT -------- */
function logout() {
  window.location.href = "index.html";
}
