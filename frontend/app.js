/* =====================================================
   FleetFlow — app.js
   Enterprise Fleet & Logistics Management Platform
   ===================================================== */

// ======================== CURRENCY SYSTEM ========================

let selectedCurrency = localStorage.getItem('currency') || 'INR';

const exchangeRates = {
  INR: 1,
  USD: 0.012,
  PHP: 0.67
};

const currencySymbols = {
  INR: '₹',
  USD: '$',
  PHP: '₱'
};

function formatCurrency(amountInINR) {
  const rate = exchangeRates[selectedCurrency];
  const converted = amountInINR * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedCurrency,
    minimumFractionDigits: 2
  }).format(converted);
}

function changeCurrency(newCurrency) {
  selectedCurrency = newCurrency;
  localStorage.setItem('currency', newCurrency);

  // Force reload of current page
  document.querySelectorAll('.page').forEach(p => {
    p.dataset.loaded = '';
  });

  navigateTo(currentPage);

  showToast(`Currency switched to ${newCurrency}`, 'success');
}


// ======================== STATE ========================
let currentRole = 'admin';
let currentPage = 'dashboard';
let currentUser = { name: 'Rajesh Kumar', role: 'Administrator', initials: 'RK' };

const ROLES = {
  admin: {
    label: 'Administrator',
    name: 'Rajesh Kumar',
    initials: 'RK',
    menu: [
      { id: 'dashboard', icon: '⊞', label: 'Command Centre' },
      { id: 'vehicles', icon: '🚛', label: 'Vehicles' },
      { id: 'trips', icon: '📦', label: 'Trips' },
      { id: 'drivers', icon: '👤', label: 'Drivers' },
      { id: 'maintenance', icon: '🔧', label: 'Maintenance', badge: '3' },
      { id: 'fuel', icon: '⛽', label: 'Fuel & Expenses' },
      { id: 'analytics', icon: '📊', label: 'Analytics' },
      { id: 'users', icon: '👥', label: 'Users Mgmt' },
      { id: 'settings', icon: '⚙️', label: 'Settings' },
    ]
  },
  fleet_manager: {
    label: 'Fleet Manager',
    name: 'Suresh Nair',
    initials: 'SN',
    menu: [
      { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
      { id: 'vehicles', icon: '🚛', label: 'Vehicles' },
      { id: 'maintenance', icon: '🔧', label: 'Maintenance', badge: '3' },
      { id: 'drivers', icon: '👤', label: 'Drivers' },
      { id: 'analytics', icon: '📊', label: 'Analytics' },
    ]
  },
  dispatcher: {
    label: 'Dispatcher',
    name: 'Priya Mehta',
    initials: 'PM',
    menu: [
      { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
      { id: 'trips', icon: '📦', label: 'Trip Dispatcher' },
      { id: 'drivers', icon: '👤', label: 'Drivers' },
      { id: 'vehicles', icon: '🚛', label: 'Fleet Status' },
    ]
  },
  safety_officer: {
    label: 'Safety Officer',
    name: 'Anil Verma',
    initials: 'AV',
    menu: [
      { id: 'compliance', icon: '🛡️', label: 'Compliance' },
      { id: 'drivers', icon: '👤', label: 'Driver Profiles' },
      { id: 'analytics', icon: '📊', label: 'Safety Analytics' },
    ]
  },
  financial_analyst: {
    label: 'Financial Analyst',
    name: 'Deepa Iyer',
    initials: 'DI',
    menu: [
      { id: 'expenses', icon: '💰', label: 'Expense Logs' },
      { id: 'fuel', icon: '⛽', label: 'Fuel Logs' },
      { id: 'analytics', icon: '📊', label: 'ROI Reports' },
    ]
  },
  driver: {
    label: 'Driver',
    name: 'Ramesh Yadav',
    initials: 'RY',
    menu: [
      { id: 'driver-view', icon: '🚗', label: 'My Trips' },
      { id: 'fuel', icon: '⛽', label: 'Fuel Log' },
    ]
  }
};

// ======================== AUTH ========================
function showAuth() {
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('landing').style.display = 'none';
}

function hidAuth() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('landing').style.display = 'block';
}

function quickLogin(role) {
  document.getElementById('login-role').value = role;
  doLogin();
}

function doLogin() {
  const role = document.getElementById('login-role').value;
  currentRole = role;
  currentUser = ROLES[role];

  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('landing').style.display = 'none';

  document.getElementById('user-name-display').textContent = currentUser.name;
  document.getElementById('user-role-display').textContent = currentUser.label;
  document.getElementById('user-avatar').textContent = currentUser.initials;
  document.getElementById('topbar-avatar').textContent = currentUser.initials;

  buildSidebar();

  const firstPage = currentUser.menu[0].id;
  navigateTo(firstPage);

  showToast(`Welcome back, ${currentUser.name.split(' ')[0]}!`, 'success');
}

function doLogout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('landing').style.display = 'block';
  showToast('You have been signed out.', 'success');
}

// ======================== REGISTRATION ========================

function showRegister() {
  document.getElementById('login-panel').style.display = 'none';
  document.getElementById('register-panel').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-panel').style.display = 'none';
  document.getElementById('login-panel').style.display = 'block';
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const mobile = document.getElementById('reg-mobile').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const role = document.getElementById('reg-role').value;
  const terms = document.getElementById('reg-terms').checked;

  // Validation
  if (!name || !email || !mobile || !password || !role) {
    showToast('Please fill in all required fields.', 'danger'); return;
  }
  if (password !== confirm) {
    showToast('Passwords do not match.', 'danger'); return;
  }
  if (password.length < 8) {
    showToast('Password must be at least 8 characters.', 'warning'); return;
  }
  if (!terms) {
    showToast('Please accept the Terms & Conditions.', 'warning'); return;
  }
  if (!/^[6-9]\d{9}$/.test(mobile.replace(/[\s+\-]/g, ''))) {
    showToast('Please enter a valid Indian mobile number.', 'warning'); return;
  }

  // Success — auto-login with registered role
  showToast(`Welcome to TranifyFlow, ${name.split(' ')[0]}! 🎉`, 'success');
  setTimeout(() => {
    document.getElementById('login-role').value = role;
    doLogin();
  }, 1200);
}
// ======================== NAVIGATION ========================
function buildSidebar() {
  const menu = currentUser.menu;
  let html = '<div class="sidebar-section"><div class="sidebar-section-label">Navigation</div>';
  menu.forEach(item => {
    html += `<div class="nav-item" id="nav-${item.id}" onclick="navigateTo('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      ${item.label}
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
    </div>`;
  });
  html += '</div>';
  document.getElementById('sidebar-menu').innerHTML = html;
}

function navigateTo(page) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) {
    pageEl.classList.add('active');
    if (!pageEl.dataset.loaded) {
      renderPage(page, pageEl);
      pageEl.dataset.loaded = '1';
    }
  }

  const titles = {
    dashboard: 'Command Center',
    vehicles: 'Vehicle Registry',
    trips: 'Trip Dispatcher',
    maintenance: 'Maintenance Logs',
    fuel: 'Fuel & Expense Log',
    drivers: 'Driver Management',
    analytics: 'Analytics & Reports',
    users: 'User Management',
    compliance: 'Compliance Dashboard',
    expenses: 'Expense Logs',
    'driver-view': 'My Trips',
    settings: 'System Settings'
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  currentPage = page;
  closeAllDropdowns();
}

// ======================== PAGE RENDERS ========================
function renderPage(page, el) {
  const renders = {
    dashboard: renderDashboard,
    vehicles: renderVehicles,
    trips: renderTrips,
    maintenance: renderMaintenance,
    fuel: renderFuel,
    drivers: renderDrivers,
    analytics: renderAnalytics,
    users: renderUsers,
    compliance: renderCompliance,
    expenses: renderExpenses,
    'driver-view': renderDriverView,
    settings: renderSettings,
  };
  if (renders[page]) renders[page](el);
}

function renderDashboard(el) {
  el.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header"><span class="kpi-label">Active Fleet</span><span class="kpi-icon">🚛</span></div>
        <div class="kpi-value">24</div>
        <div class="kpi-change kpi-up">↑ 2 from yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header"><span class="kpi-label">Maintenance Alerts</span><span class="kpi-icon">🔧</span></div>
        <div class="kpi-value">3</div>
        <div class="kpi-change kpi-down">↑ 1 new alert</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header"><span class="kpi-label">Utilization Rate</span><span class="kpi-icon">📊</span></div>
        <div class="kpi-value">78%</div>
        <div class="kpi-change kpi-up">↑ 4% this week</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header"><span class="kpi-label">Pending Cargo</span><span class="kpi-icon">📦</span></div>
        <div class="kpi-value">7</div>
        <div class="kpi-change" style="color:var(--warning)">3 urgent</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-header"><span class="kpi-label">Today's Cost</span><span class="kpi-icon">💰</span></div>
        <div class="kpi-value">₱48K</div>
        <div class="kpi-change kpi-down">↑ 12% vs yesterday</div>
      </div>
    </div>

    <div class="filter-bar">
      <select class="filter-select"><option>All Vehicle Types</option><option>Trucks</option><option>Vans</option></select>
      <select class="filter-select"><option>All Regions</option><option>North</option><option>South</option><option>Metro</option></select>
      <select class="filter-select"><option>All Statuses</option><option>Available</option><option>On Trip</option><option>In Shop</option></select>
      <button class="btn btn-primary btn-sm" onclick="showToast('Filters applied','success')">Apply</button>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Fleet Status Overview</div>
            <div class="card-sub">Live vehicle status</div>
          </div>
        </div>
        <div class="card">
  <div class="card-header">
    <div>
      <div class="card-title">Fleet Status Overview</div>
      <div class="card-sub">Live vehicle locations — GPS tracking</div>
    </div>
    <div style="display:flex; gap:8px; align-items:center;">
      <span class="pill pill-success" id="map-status-pill">● Live</span>
      <button class="btn btn-ghost btn-sm" onclick="centerMapOnIndia()">📍 Reset View</button>
    </div>
  </div>
  <!-- MAP CONTAINER -->
  <div id="fleet-map" style="height:320px; width:100%; border-radius:0 0 14px 14px;"></div>
</div>
      </div>
      <div class="card">
        <div class="card-header">
          <div><div class="card-title">Trip Activity</div><div class="card-sub">Last 7 days</div></div>
        </div>
        <div style="padding:16px 24px 8px;">
          <div class="mini-bar-chart" style="height:160px; align-items:flex-end; gap:8px; padding:0;">
            ${[65, 80, 55, 90, 70, 85, 60].map((h, i) => `<div class="mini-bar" style="height:${h}%; background:${i === 5 ? 'var(--accent)' : 'rgba(37,99,235,0.3)'}; border-radius:4px 4px 0 0; flex:1;" title="${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}: ${h}%"></div>`).join('')}
          </div>
          <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:11px; color:var(--text3);">
            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<span>${d}</span>`).join('')}
          </div>
        </div>
        <div style="padding:8px 24px 20px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; text-align:center; border-top:1px solid var(--border); margin-top:8px;">
          <div><div style="font-family:'Space Mono',monospace; font-weight:700; font-size:18px;">42</div><div style="font-size:11px; color:var(--text3); margin-top:4px;">Total Trips</div></div>
          <div><div style="font-family:'Space Mono',monospace; font-weight:700; font-size:18px; color:var(--success);">38</div><div style="font-size:11px; color:var(--text3); margin-top:4px;">Completed</div></div>
          <div><div style="font-family:'Space Mono',monospace; font-weight:700; font-size:18px; color:var(--danger);">2</div><div style="font-size:11px; color:var(--text3); margin-top:4px;">Cancelled</div></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Live Fleet Table</div><div class="card-sub">All vehicles — click to view details</div></div>
        <input class="search-input" placeholder="Search vehicles..." oninput="filterTable(this,'fleet-table')">
      </div>
      <table id="fleet-table">
        <thead><tr>
          <th>Vehicle ID</th><th>Type</th><th>Driver</th><th>Region</th><th>Status</th><th>Odometer</th><th>Last Update</th>
        </tr></thead>
        <tbody>
          ${[
      ['MH-12-AB-1234', 'Truck', 'Amit Sharma', 'Mumbai', 'On Trip', '45,210 km', '2 min ago'],
      ['DL-01-CD-5678', 'Truck', 'Vikram Singh', 'Delhi', 'Available', '62,100 km', '5 min ago'],
      ['KA-03-EF-9012', 'Van', 'Ravi Pillai', 'Bengaluru', 'Available', '18,450 km', '12 min ago'],
      ['GJ-05-GH-3456', 'Truck', '—', 'Ahmedabad', 'In Shop', '88,300 km', '1 hr ago'],
      ['TN-09-IJ-7890', 'Pickup', 'Sunita Devi', 'Chennai', 'On Trip', '34,780 km', '1 min ago'],
      ['RJ-14-KL-2345', 'Van', 'Mohan Patel', 'Jaipur', 'Suspended', '91,200 km', '3 hr ago'],
    ].map(([id, type, driver, region, status, odo, updated]) => `
            <tr>
              <td class="td-bold td-mono">${id}</td>
              <td>${type}</td>
              <td>${driver}</td>
              <td>${region}</td>
              <td>${statusPill(status)}</td>
              <td class="td-mono">${odo}</td>
              <td class="td-sub">${updated}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
   setTimeout(() => {
    initFleetMap();
  }, 100);

}        


function renderVehicles(el) {
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Vehicle Registry</div><div class="card-sub">Manage your entire fleet</div></div>
        <div style="display:flex; gap:8px;">
          <input class="search-input" placeholder="Search..." oninput="filterTable(this,'vehicles-table')">
          <button class="btn btn-primary btn-sm" onclick="openPanel('add-vehicle-panel')">+ Add Vehicle</button>
        </div>
      </div>
      <table id="vehicles-table">
        <thead><tr>
          <th>Plate / ID</th><th>Make & Model</th><th>Capacity</th><th>Odometer</th><th>Status</th><th>Region</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${// REPLACE the vehicles array in renderVehicles():
    [
      ['MH-12-AB-1234', 'Tata LPT 1618', '3,000 kg', '45,210 km', 'On Trip', 'Mumbai'],
      ['DL-01-CD-5678', 'Ashok Leyland Dost', '2,500 kg', '62,100 km', 'Available', 'Delhi'],
      ['KA-03-EF-9012', 'Mahindra Bolero Pik-Up', '1,200 kg', '18,450 km', 'Available', 'Bengaluru'],
      ['GJ-05-GH-3456', 'Eicher Pro 2049', '2,000 kg', '88,300 km', 'In Shop', 'Ahmedabad'],
      ['TN-09-IJ-7890', 'Tata Ace Gold', '1,000 kg', '34,780 km', 'On Trip', 'Chennai'],
      ['RJ-14-KL-2345', 'Force Traveller', '1,500 kg', '91,200 km', 'Suspended', 'Jaipur'],
    ].map(([id, plate, model, cap, odo, status, region]) => `
            <tr>
              <td><div class="td-bold">${id}</div><div class="td-sub td-mono">${plate}</div></td>
              <td>${model}</td>
              <td class="td-mono">${cap}</td>
              <td class="td-mono">${odo}</td>
              <td>${statusPill(status)}</td>
              <td>${region}</td>
              <td><div class="action-btns">
                <button class="tbl-btn tbl-btn-blue" onclick="showToast('Editing vehicle...','success')">Edit</button>
                <button class="tbl-btn" onclick="confirmAction('Set to Available?','This will make the vehicle available for dispatch.', 'Set Available')">Status</button>
                ${currentRole === 'admin' ? '<button class="tbl-btn tbl-btn-red" onclick="confirmAction(\'Delete Vehicle?\',\'This cannot be undone.\',\'Delete\')">Delete</button>' : ''}
              </div></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderTrips(el) {
  const lifecycle = ['Draft', 'Dispatched', 'In Transit', 'Completed', 'Cancelled'];
  el.innerHTML = `
    <div class="alert alert-warning">🔒 Validation active: Trips with expired driver licenses, over-capacity cargo, or vehicles in maintenance will be blocked.</div>

    <div class="card" style="margin-bottom:20px;">
      <div class="card-header">
        <div><div class="card-title">Trip Lifecycle</div></div>
      </div>
      <div style="display:flex; gap:0; padding:20px 24px;">
        ${lifecycle.map((stage, i) => `
          <div style="flex:1; text-align:center; position:relative;">
            <div style="width:36px; height:36px; border-radius:50%; background:${i < 3 ? 'var(--accent)' : 'var(--border)'}; color:${i < 3 ? 'white' : 'var(--text3)'}; display:flex; align-items:center; justify-content:center; margin:0 auto 8px; font-size:14px; font-weight:700; position:relative; z-index:1;">${i + 1}</div>
            <div style="font-size:12px; font-weight:600; color:${i < 3 ? 'var(--navy)' : 'var(--text3)'};">${stage}</div>
            ${i < lifecycle.length - 1 ? `<div style="position:absolute; top:18px; left:50%; right:-50%; height:2px; background:${i < 2 ? 'var(--accent)' : 'var(--border)'};"></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Trip Dispatcher</div><div class="card-sub">All trips — current & historical</div></div>
        <div style="display:flex; gap:8px;">
          <input class="search-input" placeholder="Search trips...">
          <button class="btn btn-primary btn-sm" onclick="openPanel('add-trip-panel')">+ Create Trip</button>
        </div>
      </div>
      <table>
        <thead><tr>
          <th>Trip ID</th><th>Route</th><th>Vehicle</th><th>Driver</th><th>Cargo</th><th>Status</th><th>Scheduled</th><th>Actions</th>
        </tr></thead>
        <tbody>
          ${[
      ['TRP-0085', 'Mumbai → Delhi', 'MH-12-AB-1234', 'Amit Sharma', '2,200 kg', 'In Transit', '21 Feb, 08:00'],
      ['TRP-0086', 'Chennai → Bengaluru', 'TN-09-IJ-7890', 'Sunita Devi', '800 kg', 'In Transit', '21 Feb, 09:30'],
      ['TRP-0087', 'Delhi → Jaipur', 'DL-01-CD-5678', 'Vikram Singh', '1,100 kg', 'Dispatched', '21 Feb, 14:00'],
      ['TRP-0088', 'Bengaluru → Hyderabad', 'KA-03-EF-9012', 'Ravi Pillai', '500 kg', 'Completed', '20 Feb, 07:00'],
      ['TRP-0089', 'Jaipur → Ahmedabad', 'RJ-14-KL-2345', '—', '—', 'Cancelled', '20 Feb, 12:00'],
    ].map(([id, route, veh, driver, cargo, status, sched]) => `
            <tr>
              <td class="td-bold td-mono">${id}</td>
              <td style="font-weight:600;">${route}</td>
              <td class="td-mono">${veh}</td>
              <td>${driver}</td>
              <td class="td-mono">${cargo}</td>
              <td>${tripStatusPill(status)}</td>
              <td class="td-sub">${sched}</td>
              <td><div class="action-btns">
                <button class="tbl-btn tbl-btn-blue">View</button>
                ${status === 'Dispatched' || status === 'In Transit' ? '<button class="tbl-btn" onclick="showToast(\'Trip status updated!\',\'success\')">Update</button>' : ''}
              </div></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderMaintenance(el) {
  el.innerHTML = `
    <div class="alert alert-danger">🔧 3 vehicles are overdue for maintenance and have been removed from dispatch selection.</div>
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Maintenance Logs</div><div class="card-sub">Service records — adding a record sets vehicle to "In Shop"</div></div>
        <button class="btn btn-primary btn-sm" onclick="showToast('Maintenance form opened','success')">+ Log Service</button>
      </div>
      <table>
        <thead><tr><th>Vehicle</th><th>Service Type</th><th>Date</th><th>Cost</th><th>Technician</th><th>Status</th><th>Next Due</th></tr></thead>
        <tbody>
          ${[
      ['GJ-05-GH-3456', 'Full Service + Oil Change', '15 Feb 2025', '₹8,500', 'Tata Authorised Service', 'In Progress', '15 Mar 2025'],
      ['MH-12-AB-1234', 'Tyre Replacement', '10 Feb 2025', '₹12,000', 'Apollo Tyres Mumbai', 'Completed', '—'],
      ['RJ-14-KL-2345', 'Engine Overhaul', '08 Feb 2025', '₹55,000', 'Ashok Leyland Workshop', 'In Progress', '—'],
      ['KA-03-EF-9012', 'Brake Pad Replacement', '01 Feb 2025', '₹3,200', 'Bosch Service Bengaluru', 'Completed', '01 Aug 2025'],
      ['DL-01-CD-5678', 'Air Filter + Belts', '22 Jan 2025', '₹1,800', 'Leyland Service Delhi', 'Completed', '22 Jul 2025'],
    ].map(([veh, type, date, cost, tech, status, next]) => `
            <tr>
              <td class="td-bold td-mono">${veh}</td>
              <td>${type}</td>
              <td class="td-sub">${date}</td>
              <td class="td-mono" style="color:var(--danger); font-weight:600;">${cost}</td>
              <td>${tech}</td>
              <td>${maintenanceStatusPill(status)}</td>
              <td class="td-sub">${next}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderFuel(el) {
  el.innerHTML = `
    <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Fuel Cost</span><span>⛽</span></div><div class="kpi-value">Rs. 284K</div><div class="kpi-change kpi-down">↑ 8% this month</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Avg Cost/km</span><span>📏</span></div><div class="kpi-value">Rs. 12.4</div><div class="kpi-change kpi-up">↓ 3% improved</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Fuel Efficiency</span><span>🌿</span></div><div class="kpi-value">8.2</div><div class="kpi-change" style="color:var(--text3)">km per liter avg</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Liters</span><span>🪣</span></div><div class="kpi-value">22,900</div><div class="kpi-change kpi-down">This month</div></div>
    </div>
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Fuel & Expense Log</div></div>
        <button class="btn btn-primary btn-sm" onclick="showToast('Fuel log form opened','success')">+ Log Fuel</button>
      </div>
      <table>
        <thead><tr><th>Date</th><th>Vehicle</th><th>Driver</th><th>Liters</th><th>Cost</th><th>Station</th><th>Receipt</th></tr></thead>
        <tbody>
          ${// REPLACE the fuel array:
    [
      ['21 Feb', 'MH-12-AB-1234', 'Amit Sharma', '65L', '₹5,720', 'HP Petrol Pump, Andheri', '✅'],
      ['21 Feb', 'TN-09-IJ-7890', 'Sunita Devi', '40L', '₹3,520', 'Indian Oil, T.Nagar', '✅'],
      ['20 Feb', 'KA-03-EF-9012', 'Ravi Pillai', '55L', '₹4,840', 'BPCL, Koramangala', '✅'],
      ['20 Feb', 'DL-01-CD-5678', 'Vikram Singh', '70L', '₹6,160', 'HP Petrol Pump, Rohini', '⬆️ Upload'],
      ['19 Feb', 'MH-12-AB-1234', 'Amit Sharma', '60L', '₹5,280', 'Indian Oil, Thane', '✅'],
    ].map(([date, veh, driver, liters, cost, station, receipt]) => `
            <tr>
              <td class="td-sub">${date}</td>
              <td class="td-mono td-bold">${veh}</td>
              <td>${driver}</td>
              <td class="td-mono">${liters}</td>
              <td class="td-mono" style="font-weight:600;">${cost}</td>
              <td>${station}</td>
              <td><span style="cursor:pointer;" onclick="showToast('Receipt viewed','success')">${receipt}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderDrivers(el) {
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">Driver Management</div><div class="card-sub">Performance, compliance, and status</div></div>
        <div style="display:flex;gap:8px;">
          <input class="search-input" placeholder="Search drivers...">
          <button class="btn btn-primary btn-sm" onclick="openPanel('add-driver-panel')">+ Add Driver</button>
        </div>
      </div>
      <table>
        <thead><tr><th>Driver</th><th>License</th><th>Expiry</th><th>Safety Score</th><th>Trips</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
      ['Amit Sharma', 'DL-MH-20180012', 'Feb 2027', '92/100', '142', 'On Duty'],
      ['Vikram Singh', 'DL-DL-20190456', 'Oct 2026', '87/100', '98', 'On Duty'],
      ['Ravi Pillai', 'DL-KA-20170789', 'Dec 2024', '71/100', '56', 'Off Duty'],
      ['Sunita Devi', 'DL-TN-20201012', 'Aug 2026', '95/100', '203', 'On Duty'],
      ['Mohan Patel', 'DL-RJ-20151345', 'Jan 2024', '45/100', '78', 'Suspended'],
    ].map(([name, lic, expiry, score, trips, status]) => {
      const expired = expiry.includes('2024');
      const expiringSoon = expiry.includes('2025') && !expiry.includes('Aug') && !expiry.includes('Oct');
      return `<tr>
              <td><div style="font-weight:600;">${name}</div><div class="td-sub td-mono">${lic}</div></td>
              <td class="td-mono">${lic}</td>
              <td class="td-mono" style="color:${expired ? 'var(--danger)' : expiringSoon ? 'var(--warning)' : 'inherit'}">${expiry} ${expired ? '⚠️' : ''}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="progress-bar" style="width:60px;"><div class="progress-fill" style="width:${score.split('/')[0]}%;background:${parseInt(score) > 80 ? 'var(--success)' : parseInt(score) > 60 ? 'var(--warning)' : 'var(--danger)'}"></div></div>
                  <span class="td-mono" style="font-size:12px;">${score}</span>
                </div>
              </td>
              <td class="td-mono">${trips}</td>
              <td>${driverStatusPill(status)}</td>
              <td><div class="action-btns">
                <button class="tbl-btn tbl-btn-blue" onclick="showToast('Driver profile opened','success')">View</button>
                <button class="tbl-btn" onclick="confirmAction('Change Driver Status?','Update the duty status for this driver.','Update')">Status</button>
              </div></td>
            </tr>`;
    }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAnalytics(el) {
  el.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Fuel Efficiency</div><div class="card-sub">km/L by vehicle</div></div><button class="btn btn-ghost btn-sm" onclick="showToast('Exporting CSV...','success')">📤 Export CSV</button></div>
        <div style="padding:0 24px;">
          ${[['TRK-001', 8.2, 10], ['TRK-002', 9.1, 10], ['TRK-003', 7.4, 10], ['TRK-004', 6.1, 10], ['TRK-005', 8.8, 10]].map(([v, val, max]) => `
            <div class="metric-row">
              <div class="metric-label">${v}</div>
              <div style="display:flex;align-items:center;gap:12px;flex:1;margin:0 16px;">
                <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${val / max * 100}%"></div></div>
              </div>
              <div class="metric-value">${val} km/L</div>
            </div>
          `).join('')}
        </div>
        <div style="padding:16px 24px; background:var(--bg); border-top:1px solid var(--border); font-size:13px; color:var(--text2);">Fleet Average: <strong>7.9 km/L</strong></div>
      </div>

      <div class="card">
        <div class="card-header"><div><div class="card-title">Operational Cost</div><div class="card-sub">By vehicle — this month</div></div><button class="btn btn-ghost btn-sm" onclick="showToast('Exporting PDF...','success')">📄 Export PDF</button></div>
        <div style="padding:0 24px;">
          ${[['TRK-001', '₱42,800', 85], ['TRK-002', '₱31,200', 62], ['TRK-003', '₱18,500', 37], ['TRK-004', '₱71,000', 100], ['TRK-005', '₱24,100', 48]].map(([v, cost, pct]) => `
            <div class="metric-row">
              <div class="metric-label">${v}</div>
              <div style="display:flex;align-items:center;gap:12px;flex:1;margin:0 16px;">
                <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${pct}%;background:${pct > 80 ? 'var(--danger)' : pct > 60 ? 'var(--warning)' : 'var(--success)'}"></div></div>
              </div>
              <div class="metric-value">${cost}</div>
            </div>
          `).join('')}
        </div>
        <div style="padding:16px 24px; background:var(--bg); border-top:1px solid var(--border); font-size:13px; color:var(--text2);">Total Fleet Cost: <strong>₱187,600</strong></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div><div class="card-title">Vehicle ROI</div><div class="card-sub">Revenue vs Cost ratio</div></div></div>
        <div style="padding:0 24px;">
          ${[['TRK-001', '3.2x', '↑ Excellent'], ['TRK-002', '2.8x', '↑ Good'], ['TRK-003', '1.9x', '→ Average'], ['TRK-004', '0.4x', '↓ Poor (In Shop)'], ['TRK-005', '2.5x', '↑ Good']].map(([v, roi, trend]) => `
            <div class="metric-row">
              <div class="metric-label">${v}</div>
              <div class="metric-value">${roi} <span style="font-size:11px; font-weight:400; color:var(--text3);">${trend}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div><div class="card-title">Maintenance Frequency</div><div class="card-sub">Services per vehicle per month</div></div></div>
        <div style="padding:0 24px;">
          ${[['TRK-001', 1, 'Low'], ['TRK-002', 2, 'Normal'], ['TRK-003', 1, 'Low'], ['TRK-004', 4, 'High ⚠️'], ['TRK-005', 1, 'Low']].map(([v, freq, label]) => `
            <div class="metric-row">
              <div class="metric-label">${v}</div>
              <div class="metric-value">${freq}x / month <span style="font-size:11px; color:${freq > 2 ? 'var(--danger)' : 'var(--success)'}; font-weight:600;">${label}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:4px;">
      <div class="card-header">
        <div><div class="card-title">Future: Predictive Maintenance AI</div></div>
        <span class="pill pill-blue">Coming Soon</span>
      </div>
      <div style="padding:24px; color:var(--text2); font-size:14px; line-height:1.7;">
        AI-powered predictive maintenance will analyze odometer readings, maintenance history, and telematics data to predict failures before they happen — reducing unplanned downtime by up to 40%.
      </div>
    </div>
  `;
}

function renderUsers(el) {
  el.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div><div class="card-title">User Management</div><div class="card-sub">All system users and role assignments</div></div>
        <button class="btn btn-primary btn-sm" onclick="showToast('Add user form opened','success')">+ Add User</button>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
      ['Rajesh Kumar', 'rajesh@fleetflow.in', 'Administrator', '2 min ago', 'Active'],
      ['Suresh Nair', 'suresh@fleetflow.in', 'Fleet Manager', '1 hr ago', 'Active'],
      ['Priya Mehta', 'priya@fleetflow.in', 'Dispatcher', '30 min ago', 'Active'],
      ['Anil Verma', 'anil@fleetflow.in', 'Safety Officer', '3 hr ago', 'Active'],
      ['Deepa Iyer', 'deepa@fleetflow.in', 'Financial Analyst', 'Yesterday', 'Active'],
      ['Ramesh Yadav', 'ramesh@fleetflow.in', 'Driver', '1 day ago', 'Active'],
      ['Sunil Tiwari', 'sunil@fleetflow.in', 'Driver', '5 days ago', 'Suspended'],
    ].map(([name, email, role, login, status]) => `
            <tr>
              <td><div style="font-weight:600;">${name}</div></td>
              <td class="td-sub">${email}</td>
              <td><span class="pill pill-blue">${role}</span></td>
              <td class="td-sub">${login}</td>
              <td><span class="pill ${status === 'Active' ? 'pill-success' : 'pill-danger'}">${status}</span></td>
              <td><div class="action-btns">
                <button class="tbl-btn tbl-btn-blue" onclick="showToast('Edit user','success')">Edit</button>
                <button class="tbl-btn" onclick="showToast('Role updated','success')">Role</button>
                <button class="tbl-btn tbl-btn-red" onclick="confirmAction('Delete User?','Remove this user from the system. This cannot be undone.','Delete')">Delete</button>
              </div></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderCompliance(el) {
  el.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Compliant Drivers</span><span>✅</span></div><div class="kpi-value">8</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Expiring (30 days)</span><span>⏰</span></div><div class="kpi-value" style="color:var(--warning);">2</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Expired Licenses</span><span>🚫</span></div><div class="kpi-value" style="color:var(--danger);">1</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Fleet Safety Score</span><span>🛡️</span></div><div class="kpi-value">82/100</div></div>
    </div>
    <div class="alert alert-danger">🚨 Rico Manalo's license expired January 2024. Driver has been suspended from dispatch.</div>
    <div class="alert alert-warning">⚠️ Pedro Reyes's license expires December 2024 — renewal reminder sent.</div>
    <div class="card">
      <div class="card-header"><div><div class="card-title">License Expiry Tracker</div></div></div>
      <table>
        <thead><tr><th>Driver</th><th>License</th><th>Expiry</th><th>Days Left</th><th>Status</th></tr></thead>
        <tbody>
          ${[
      ['Amit Sharma', 'DL-MH-20180012', '15 Feb 2027', 360, 'Valid'],
      ['Vikram Singh', 'DL-DL-20190456', '30 Oct 2026', 250, 'Valid'],
      ['Sunita Devi', 'DL-TN-20201012', '12 Aug 2026', 172, 'Valid'],
      ['Ravi Pillai', 'DL-KA-20170789', '20 Dec 2024', 30, 'Expiring Soon'],]
    ['Mohan Patel', 'DL-RJ-20151345', '15 Jan 2024', -200, 'Expired'].map(([name, lic, expiry, days, status]) => `
            <tr>
              <td style="font-weight:600;">${name}</td>
              <td class="td-mono">${lic}</td>
              <td>${expiry}</td>
              <td class="td-mono" style="color:${days < 0 ? 'var(--danger)' : days < 60 ? 'var(--warning)' : 'var(--success)'}; font-weight:700;">${days < 0 ? `${Math.abs(days)}d overdue` : `${days} days`}</td>
              <td>${days < 0 ? '<span class="pill pill-danger">Expired</span>' : days < 60 ? '<span class="pill pill-warning">Expiring Soon</span>' : '<span class="pill pill-success">Valid</span>'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderExpenses(el) {
  el.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Total Expenses</span><span>💸</span></div><div class="kpi-value">₱512K</div><div class="kpi-change kpi-down">↑ 6% vs last month</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Fuel</span><span>⛽</span></div><div class="kpi-value">₱284K</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Maintenance</span><span>🔧</span></div><div class="kpi-value">₱187K</div></div>
      <div class="kpi-card"><div class="kpi-header"><span class="kpi-label">Other</span><span>📋</span></div><div class="kpi-value">₱41K</div></div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:20px;">
      <button class="btn btn-primary btn-sm" onclick="showToast('Exporting CSV...','success')">📊 Export CSV</button>
      <button class="btn btn-ghost btn-sm" onclick="showToast('Exporting PDF...','success')">📄 Export PDF</button>
    </div>
    <div class="card">
      <div class="card-header"><div><div class="card-title">Expense Log</div></div><input class="search-input" placeholder="Search expenses..."></div>
      <table>
        <thead><tr><th>Date</th><th>Category</th><th>Vehicle</th><th>Description</th><th>Amount</th><th>Approved By</th></tr></thead>
        <tbody>
          ${[
      ['Feb 21', 'Fuel', 'TRK-001', 'Petron EDSA – 65L', '₱4,420', 'Auto-approved'],
      ['Feb 20', 'Maintenance', 'TRK-004', 'Engine overhaul – AutoCare PH', '₱45,000', 'Carlos Mendoza'],
      ['Feb 20', 'Fuel', 'TRK-002', 'Shell Quezon – 70L', '₱4,760', 'Auto-approved'],
      ['Feb 19', 'Toll/Misc', 'TRK-005', 'NLEX + SCTEX tolls', '₱850', 'Rosa Jimenez'],
      ['Feb 19', 'Maintenance', 'TRK-006', 'Engine parts – AutoCare PH', '₱28,500', 'Carlos Mendoza'],
    ].map(([date, cat, veh, desc, amount, by]) => `
            <tr>
              <td class="td-sub">${date}</td>
              <td><span class="pill ${cat === 'Fuel' ? 'pill-blue' : cat === 'Maintenance' ? 'pill-warning' : 'pill-gray'}">${cat}</span></td>
              <td class="td-mono td-bold">${veh}</td>
              <td>${desc}</td>
              <td class="td-mono" style="font-weight:700;">${amount}</td>
              <td class="td-sub">${by}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderDriverView(el) {
  el.innerHTML = `
    <div class="alert alert-success">✅ You have 1 active trip. Mark complete when you arrive at your destination.</div>

    <div class="driver-card">
      <div class="driver-trip-header">
        <div>
          <div class="driver-trip-id">TRP-0085</div>
          <div class="driver-trip-route">Mumbai → Delhi </div>
        </div>
        <span class="pill pill-blue">In Transit</span>
      </div>
      <div class="trip-detail">🚛 Vehicle: TRK-001 (Isuzu NPR 300)</div>
      <div class="trip-detail">📦 Cargo: FMCG Goods — 2,200 kg</div>
      <div class="trip-detail">📍 Pickup: Bhiwandi Warehouse, Maharashtra</div>
      <div class="trip-detail">📍 Delivery: Naraina Industrial Area, Delhi</div>
      <div class="trip-detail">⏰ Scheduled: Feb 21, 2025 — 08:00 AM</div>
      <div class="timeline" style="margin-top:16px;">
        <div class="timeline-item"><div class="timeline-dot timeline-dot-active"></div><div class="timeline-text"><div class="timeline-label">Trip Started</div><div class="timeline-time">Feb 21 — 08:14 AM</div></div></div>
        <div class="timeline-item"><div class="timeline-dot timeline-dot-active"></div><div class="timeline-text"><div class="timeline-label">Checkpoint: NLEX</div><div class="timeline-time">Feb 21 — 09:22 AM</div></div></div>
        <div class="timeline-item"><div class="timeline-dot timeline-dot-pending"></div><div class="timeline-text"><div class="timeline-label">Arrival at Destination</div><div class="timeline-time">Pending</div></div></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button class="btn btn-success btn-sm" onclick="showToast('Trip marked as complete! Great job! 🎉','success')" style="flex:1;justify-content:center;">✅ Mark Complete</button>
        <button class="btn btn-ghost btn-sm" onclick="showToast('Status updated','success')">Update Status</button>
      </div>
    </div>

    <div class="driver-card">
      <div style="font-weight:700; font-size:16px; margin-bottom:16px;">⛽ Log Fuel Stop</div>
      <div class="form-group"><label class="form-label">Liters Filled</label><input class="form-input" type="number" placeholder="e.g. 40"></div>
      <div class="form-group"><label class="form-label">Total Cost (₱)</label><input class="form-input" type="number" placeholder="e.g. 2720"></div>
      <div class="form-group"><label class="form-label">Gas Station</label><input class="form-input" placeholder="e.g. Petron NLEX"></div>
      <div class="form-group"><label class="form-label">Receipt Photo</label><input class="form-input" type="file" accept="image/*"></div>
      <button class="btn btn-primary btn-sm w-full" style="justify-content:center;" onclick="showToast('Fuel log submitted!','success')">Submit Fuel Log</button>
    </div>

    <div class="driver-card">
      <div style="font-weight:700; font-size:16px; margin-bottom:16px;">📏 Final Odometer</div>
      <div class="form-group"><label class="form-label">Current Odometer Reading (km)</label><input class="form-input" type="number" placeholder="e.g. 45450"></div>
      <button class="btn btn-primary btn-sm w-full" style="justify-content:center;" onclick="showToast('Odometer logged!','success')">Submit Reading</button>
    </div>
  `;
}

function renderSettings(el) {
  el.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">System Configuration</div></div>
        <div style="padding:24px;">
          <div class="form-group"><label class="form-label">Company Name</label><input class="form-input" value="FleetFlow Operations Inc."></div>
          <div class="form-group"><label class="form-label">Default Currency</label><select class="form-select"><option>PHP (₱)</option><option>USD ($)</option></select></div>
          <div class="form-group"><label class="form-label">Timezone</label><select class="form-select"><option>Asia/Manila (PHT +8)</option></select></div>
          <div class="form-group"><label class="form-label">License Expiry Alert (days before)</label><input class="form-input" type="number" value="60"></div>
          <button class="btn btn-primary btn-sm" onclick="showToast('Settings saved!','success')">Save Settings</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Integration Placeholders</div></div>
        <div style="padding:24px; display:flex; flex-direction:column; gap:12px;">
          ${[
      ['🗺️', 'GPS / Telematics', 'Connect live GPS hardware'],
      ['📱', 'SMS Notifications', 'Twilio or local SMS gateway'],
      ['💼', 'Accounting Integration', 'QuickBooks / SAP'],
      ['🏢', 'Multi-Branch Support', 'Multi-location management'],
      ['🤖', 'Predictive Maintenance AI', 'ML failure prediction'],
      ['🌙', 'Dark Mode', 'UI theme toggle'],
    ].map(([icon, name, desc]) => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:10px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:18px;">${icon}</span>
                <div><div style="font-size:14px;font-weight:600;">${name}</div><div style="font-size:12px;color:var(--text3);">${desc}</div></div>
              </div>
              <span class="pill pill-gray">Coming Soon</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ======================== HELPERS ========================
function statusPill(s) {
  const map = {
    'On Trip': 'pill-blue', 'Available': 'pill-success',
    'In Shop': 'pill-warning', 'Suspended': 'pill-danger', 'Retired': 'pill-gray'
  };
  return `<span class="pill ${map[s] || 'pill-gray'}">${s}</span>`;
}

function tripStatusPill(s) {
  const map = {
    'Draft': 'pill-gray', 'Dispatched': 'pill-blue',
    'In Transit': 'pill-blue', 'Completed': 'pill-success', 'Cancelled': 'pill-danger'
  };
  return `<span class="pill ${map[s] || 'pill-gray'}">${s}</span>`;
}

function maintenanceStatusPill(s) {
  return s === 'Completed'
    ? `<span class="pill pill-success">${s}</span>`
    : `<span class="pill pill-warning">${s}</span>`;
}

function driverStatusPill(s) {
  const map = { 'On Duty': 'pill-success', 'Off Duty': 'pill-gray', 'Suspended': 'pill-danger' };
  return `<span class="pill ${map[s] || 'pill-gray'}">${s}</span>`;
}

function filterTable(input, tableId) {
  const q = input.value.toLowerCase();
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ======================== MAP ========================
let fleetMap = null;
let vehicleMarkers = [];

// Indian vehicle locations (lat, lng, details)
const INDIAN_VEHICLES = [
  {
    reg: 'MH-12-AB-1234',
    driver: 'Amit Sharma',
    lat: 19.0760,
    lng: 72.8777,
    city: 'Mumbai',
    status: 'On Trip',
    cargo: 'FMCG Goods — 2,200 kg',
    speed: '62 km/h'
  },
  {
    reg: 'DL-01-CD-5678',
    driver: 'Vikram Singh',
    lat: 28.6139,
    lng: 77.2090,
    city: 'Delhi',
    status: 'Available',
    cargo: '—',
    speed: '0 km/h'
  },
  {
    reg: 'KA-03-EF-9012',
    driver: 'Ravi Pillai',
    lat: 12.9716,
    lng: 77.5946,
    city: 'Bengaluru',
    status: 'Available',
    cargo: '—',
    speed: '0 km/h'
  },
  {
    reg: 'GJ-05-GH-3456',
    driver: '—',
    lat: 23.0225,
    lng: 72.5714,
    city: 'Ahmedabad',
    status: 'In Shop',
    cargo: '—',
    speed: '0 km/h'
  },
  {
    reg: 'TN-09-IJ-7890',
    driver: 'Sunita Devi',
    lat: 13.0827,
    lng: 80.2707,
    city: 'Chennai',
    status: 'On Trip',
    cargo: 'Auto Parts — 800 kg',
    speed: '55 km/h'
  },
  {
    reg: 'RJ-14-KL-2345',
    driver: 'Mohan Patel',
    lat: 26.9124,
    lng: 75.7873,
    city: 'Jaipur',
    status: 'Suspended',
    cargo: '—',
    speed: '0 km/h'
  }
];

function getMarkerColor(status) {
  const colors = {
    'On Trip': '#2563EB',
    'Available': '#10B981',
    'In Shop': '#F59E0B',
    'Suspended': '#EF4444'
  };
  return colors[status] || '#94A3B8';
}

function createVehicleIcon(status) {
  const color = getMarkerColor(status);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="${color}" stroke="white" stroke-width="3" opacity="0.95"/>
      <text x="18" y="23" text-anchor="middle" font-size="14" fill="white">🚛</text>
    </svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
    className: ''
  });
}

function initFleetMap() {
  // Avoid re-initializing
  if (fleetMap) {
    fleetMap.invalidateSize();
    return;
  }

  const mapEl = document.getElementById('fleet-map');
  if (!mapEl) return;

  // Initialize centered on India
  fleetMap = L.map('fleet-map', {
    center: [20.5937, 78.9629],
    zoom: 5,
    zoomControl: true,
    scrollWheelZoom: true
  });

  // OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(fleetMap);

  // Place vehicle markers
  INDIAN_VEHICLES.forEach(vehicle => {
    const marker = L.marker([vehicle.lat, vehicle.lng], {
      icon: createVehicleIcon(vehicle.status)
    }).addTo(fleetMap);

    // Popup content
    marker.bindPopup(`
      <div style="font-family:'DM Sans',sans-serif; min-width:200px; padding:4px;">
        <div style="font-weight:700; font-size:14px; margin-bottom:6px;">🚛 ${vehicle.reg}</div>
        <div style="font-size:12px; color:#475569; margin-bottom:2px;">👤 Driver: <strong>${vehicle.driver}</strong></div>
        <div style="font-size:12px; color:#475569; margin-bottom:2px;">📍 Location: <strong>${vehicle.city}</strong></div>
        <div style="font-size:12px; color:#475569; margin-bottom:2px;">📦 Cargo: ${vehicle.cargo}</div>
        <div style="font-size:12px; color:#475569; margin-bottom:8px;">⚡ Speed: ${vehicle.speed}</div>
        <span style="
          display:inline-flex; align-items:center; gap:4px;
          padding:3px 10px; border-radius:100px; font-size:11px; font-weight:700;
          background:${getMarkerColor(vehicle.status)}20;
          color:${getMarkerColor(vehicle.status)};
        ">● ${vehicle.status}</span>
      </div>
    `);

    vehicleMarkers.push(marker);
  });

  // Add legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div');
    div.style.cssText = `
      background:white; padding:10px 14px; border-radius:10px;
      font-family:'DM Sans',sans-serif; font-size:12px;
      box-shadow:0 2px 12px rgba(0,0,0,0.15); line-height:2;
    `;
    div.innerHTML = `
      <div style="font-weight:700; margin-bottom:4px; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8;">Fleet Status</div>
      <div><span style="color:#2563EB;">●</span> On Trip</div>
      <div><span style="color:#10B981;">●</span> Available</div>
      <div><span style="color:#F59E0B;">●</span> In Shop</div>
      <div><span style="color:#EF4444;">●</span> Suspended</div>
    `;
    return div;
  };
  legend.addTo(fleetMap);

  // Add user's own GPS location (your original code)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const youIcon = L.divIcon({
          html: `<div style="
            width:14px; height:14px; border-radius:50%;
            background:#2563EB; border:3px solid white;
            box-shadow:0 0 0 3px rgba(37,99,235,0.3);
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          className: ''
        });

        L.marker([lat, lng], { icon: youIcon })
          .addTo(fleetMap)
          .bindPopup('<div style="font-family:DM Sans,sans-serif; font-size:13px; font-weight:600;">📍 Your Location</div>');

        document.getElementById('map-status-pill').textContent = '● Live · GPS Active';
      },
      function (error) {
        console.warn('GPS not available:', error.message);
        document.getElementById('map-status-pill').textContent = '● Live · No GPS';
      }
    );
  }
}

function centerMapOnIndia() {
  if (fleetMap) {
    fleetMap.setView([20.5937, 78.9629], 5);
  }
}
// ======================== PANELS ========================
function openPanel(id) {
  closeAllDropdowns();
  document.getElementById(id).classList.add('open');
}

function closePanel(id) {
  document.getElementById(id).classList.remove('open');
}

// Click outside panel to close
document.addEventListener('click', e => {
  document.querySelectorAll('.panel-overlay.open').forEach(p => {
    if (e.target === p) p.classList.remove('open');
  });
});

// ======================== MODAL ========================
function confirmAction(title, text, confirmLabel) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-text').textContent = text;
  document.getElementById('modal-confirm-btn').textContent = confirmLabel;
  document.getElementById('confirm-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('confirm-modal').classList.remove('open');
}

document.getElementById('confirm-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('confirm-modal')) closeModal();
});

// ======================== TOAST ========================
let toastTimers = [];

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', danger: '❌', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ======================== DROPDOWNS ========================
function toggleDropdown(id) {
  const dd = document.getElementById(id);
  const isOpen = dd.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) dd.classList.add('open');
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu.open').forEach(d => d.classList.remove('open'));
}

document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown') && !e.target.closest('.icon-btn')) {
    closeAllDropdowns();
  }
});
