// Booster Club MVP Demo JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role-select");
  const navMenu = document.getElementById("nav-menu");
  const pages = document.querySelectorAll(".page");

  // Define which nav pages each role can access
  const rolePages = {
    Admin: ["home", "events", "finance", "concessions", "sponsorships", "ticketing", "volunteers", "teams", "governance", "reports", "admin"],
    Board: ["home", "events", "finance", "sponsorships", "volunteers", "governance", "reports"],
    Treasurer: ["home", "finance", "events", "concessions", "sponsorships", "ticketing", "teams", "reports", "admin"],
    Concessions: ["home", "concessions", "events", "reports"],
    Sponsorships: ["home", "sponsorships", "events", "finance", "reports"],
    Volunteer: ["home", "volunteers", "events", "reports"],
    Coach: ["home", "teams", "events", "volunteers", "finance"],
    Parent: ["home", "volunteers", "ticketing", "events"],
    Auditor: ["home", "reports", "finance", "governance"],
    Sponsor: ["home", "sponsorships"]
  };

  // Sample data for dashboard
  const sampleData = {
    events: [
      { id: 1, name: "Football vs. Rivals", date: "2025-09-05", team: "Varsity", venue: "Stadium" },
      { id: 2, name: "Basketball Doubleheader", date: "2025-12-12", team: "Varsity", venue: "Gym" }
    ],
    budgets: [
      { team: "Varsity Football", fund: "General", amount: 10000, spent: 4500 },
      { team: "JV Basketball", fund: "Travel", amount: 5000, spent: 800 }
    ],
    products: [
      { sku: "HOTDOG", name: "Hot Dog", qty: 120, par: 50 },
      { sku: "SODA", name: "Soda", qty: 80, par: 40 }
    ],
    sponsors: [
      { name: "ABC Bank", tier: "Gold", contact: "sponsor@abc.com" },
      { name: "XYZ Auto", tier: "Silver", contact: "info@xyzauto.com" }
    ],
    tickets: [
      { event: "Football vs. Rivals", type: "General", sold: 150, capacity: 300 },
      { event: "Basketball Doubleheader", type: "Student", sold: 80, capacity: 200 }
    ],
    volunteerShifts: [
      { event: "Football vs. Rivals", role: "Concession Cashier", filled: 3, needed: 5 },
      { event: "Basketball Doubleheader", role: "Ticket Scanner", filled: 2, needed: 2 }
    ],
    teams: [
      { name: "Varsity Football", budget: 10000, spent: 4500, events: 8 },
      { name: "JV Basketball", budget: 5000, spent: 800, events: 6 }
    ],
    governance: {
      bylaws: 3,
      meetings: 2,
      disclosuresDue: 1
    },
    reports: [
      { title: "Concessions Margin", description: "Margin by event and item." },
      { title: "Budget vs Actuals", description: "Comparison of planned vs. spent." },
      { title: "Volunteer Coverage", description: "Shift coverage and no‑show rate." }
    ]
  };

  // Initialize page based on role
  function initRole() {
    const role = roleSelect.value;
    // Clear existing nav
    navMenu.innerHTML = "";
    const pagesForRole = rolePages[role] || [];
    pagesForRole.forEach((pageId) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = pageId.charAt(0).toUpperCase() + pageId.slice(1);
      a.dataset.page = pageId;
      li.appendChild(a);
      navMenu.appendChild(li);
    });
    // Set first page active
    const firstPage = pagesForRole[0] || "home";
    showPage(firstPage);
    // Render data for pages
    renderHome();
    renderEvents();
    renderFinance();
    renderConcessions();
    renderSponsorships();
    renderTicketing();
    renderVolunteers();
    renderTeams();
    renderGovernance();
    renderReports();
    // Add nav click listeners
    Array.from(navMenu.querySelectorAll("a")).forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showPage(link.dataset.page);
      });
    });
  }

  // Show the selected page and hide others
  function showPage(pageId) {
    pages.forEach((p) => {
      if (p.id === pageId) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
    // Update active nav highlight
    Array.from(navMenu.querySelectorAll("a")).forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });
  }

  // Render Home dashboard widgets
  function renderHome() {
    const container = document.getElementById("home-dashboard");
    container.innerHTML = "";
    // Show KPI cards: cash on hand (mock), upcoming events, low stock
    const kpis = [
      { title: "Cash on Hand", value: "$15,200" },
      { title: "Upcoming Events", value: `${sampleData.events.length}` },
      { title: "Low Stock Items", value: `${sampleData.products.filter((p) => p.qty < p.par).length}` }
    ];
    kpis.forEach((kpi) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${kpi.title}</h3><p>${kpi.value}</p>`;
      container.appendChild(card);
    });
  }

  function renderEvents() {
    const list = document.getElementById("events-list");
    list.innerHTML = "";
    sampleData.events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${event.name}</h3><p>Date: ${event.date}<br/>Team: ${event.team}<br/>Venue: ${event.venue}</p>`;
      list.appendChild(card);
    });
  }

  function renderFinance() {
    const container = document.getElementById("finance-overview");
    container.innerHTML = "";
    sampleData.budgets.forEach((b) => {
      const percent = ((b.spent / b.amount) * 100).toFixed(1);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${b.team}</h3><p>Fund: ${b.fund}<br/>Budget: $${b.amount.toLocaleString()}<br/>Spent: $${b.spent.toLocaleString()} (${percent}%)</p>`;
      container.appendChild(card);
    });
  }

  function renderConcessions() {
    const container = document.getElementById("concessions-overview");
    container.innerHTML = "";
    sampleData.products.forEach((p) => {
      const low = p.qty < p.par;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${p.name}</h3><p>SKU: ${p.sku}<br/>Qty on Hand: ${p.qty}<br/>Par Level: ${p.par} ${low ? '<br/><span style=\"color:red;\">Low Stock!</span>' : ''}</p>`;
      container.appendChild(card);
    });
  }

  function renderSponsorships() {
    const container = document.getElementById("sponsorships-overview");
    container.innerHTML = "";
    sampleData.sponsors.forEach((s) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${s.name}</h3><p>Tier: ${s.tier}<br/>Contact: ${s.contact}</p>`;
      container.appendChild(card);
    });
  }

  function renderTicketing() {
    const container = document.getElementById("ticketing-overview");
    container.innerHTML = "";
    sampleData.tickets.forEach((t) => {
      const percent = ((t.sold / t.capacity) * 100).toFixed(1);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${t.event} - ${t.type}</h3><p>Sold: ${t.sold}<br/>Capacity: ${t.capacity}<br/>Pace: ${percent}%</p>`;
      container.appendChild(card);
    });
  }

  function renderVolunteers() {
    const container = document.getElementById("volunteer-overview");
    container.innerHTML = "";
    sampleData.volunteerShifts.forEach((shift) => {
      const percent = ((shift.filled / shift.needed) * 100).toFixed(1);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${shift.event} - ${shift.role}</h3><p>Filled: ${shift.filled} / ${shift.needed} (${percent}%)</p>`;
      container.appendChild(card);
    });
  }

  function renderTeams() {
    const container = document.getElementById("teams-overview");
    container.innerHTML = "";
    sampleData.teams.forEach((t) => {
      const percent = ((t.spent / t.budget) * 100).toFixed(1);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${t.name}</h3><p>Budget: $${t.budget.toLocaleString()}<br/>Spent: $${t.spent.toLocaleString()} (${percent}%)<br/>Events: ${t.events}</p>`;
      container.appendChild(card);
    });
  }

  function renderGovernance() {
    const container = document.getElementById("governance-overview");
    container.innerHTML = "";
    const cards = [
      { title: "Bylaw Versions", value: sampleData.governance.bylaws },
      { title: "Upcoming Meetings", value: sampleData.governance.meetings },
      { title: "Disclosures Due", value: sampleData.governance.disclosuresDue }
    ];
    cards.forEach((c) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${c.title}</h3><p>${c.value}</p>`;
      container.appendChild(card);
    });
  }

  function renderReports() {
    const container = document.getElementById("reports-overview");
    container.innerHTML = "";
    sampleData.reports.forEach((r) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${r.title}</h3><p>${r.description}</p>`;
      container.appendChild(card);
    });
  }

  // Listen for role change
  roleSelect.addEventListener("change", () => {
    initRole();
  });
  // Initialize on first load
  initRole();
});
