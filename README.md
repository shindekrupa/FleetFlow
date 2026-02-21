<<<<<<< HEAD
# Transify - ALL IN ONE LOGISTIC PLATFORM
# 🚛 FleetFlow

**Smart Fleet & Logistics Management Platform**

A full-stack web application for managing fleets, drivers, trips, maintenance, and operational costs — with role-based access control for every stakeholder in your logistics operation.



## ✨ Features

### 🌐 Public Landing Page
- Professional SaaS landing page (no login required)
- Feature highlights, how-it-works walkthrough, and role overview
- Call-to-action for login and demo requests

### 🔐 Role-Based Authentication
Six distinct roles, each with a tailored dashboard and permissions:

| Role | Access Level |
|---|---|
| **Administrator** | Full system access — users, vehicles, trips, analytics, settings |
| **Fleet Manager** | Vehicles, maintenance, drivers, analytics |
| **Dispatcher** | Trip creation, vehicle & driver assignment, cargo validation |
| **Safety Officer** | Driver compliance, license expiry alerts, safety scores |
| **Financial Analyst** | Expense logs, fuel logs, ROI reports, CSV/PDF export |
| **Driver** | View assigned trips, log fuel, mark trip complete, upload receipts |

### 📊 Command Center Dashboard
- KPI cards: Active Fleet, Maintenance Alerts, Utilization Rate, Pending Cargo
- Live fleet table with search & filters (Vehicle Type, Region, Status)
- Status pills: Available · On Trip · In Shop · Suspended
- Trip activity charts

### 🚛 Vehicle Registry
- Add, edit, and manage vehicles with capacity and odometer tracking
- Status toggle: Available / In Shop / Retired

### 📦 Trip Dispatcher
- Full trip lifecycle: `Draft → Dispatched → In Transit → Completed → Cancelled`
- Smart validation blocks:
  - ❌ Cargo weight exceeds vehicle capacity
  - ❌ Driver license expired
  - ❌ Vehicle currently in maintenance

### 🔧 Maintenance Logs
- Log service records per vehicle
- Adding a record automatically sets vehicle to **In Shop**
- Removes vehicle from dispatcher selection during service

### ⛽ Fuel & Expense Logging
- Log liters, cost, date, and station per trip
- Receipt upload support
- Auto-calculates: Total Operational Cost · Cost per KM

### 👤 Driver Management
- License expiry countdown with colour-coded alerts
- Safety score with visual progress bars
- Trip completion rate tracking
- Status toggle: On Duty · Off Duty · Suspended

### 📈 Analytics & Reports
- Fuel efficiency (km/L) per vehicle
- Vehicle ROI comparison
- Maintenance frequency analysis
- Operational cost breakdown
- Export to **CSV** and **PDF**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Python (`app.py`) |
| Database | Python DB layer (`db.py`) |
| UI Design | Custom design system — DM Sans + Space Mono |
| Auth | Role-Based Access Control (RBAC) |

---

---

## 🗺️ Roadmap

- [ ] Real-time GPS map integration (Telematics API)
- [ ] SMS / Push notifications (via webhook)
- [ ] Accounting system integration (QuickBooks / SAP)
- [ ] Multi-branch / multi-location support
- [ ] Predictive maintenance AI (ML-based failure prediction)
- [ ] Dark mode toggle
- [ ] Native mobile app (Driver interface)


## 📄 License

This project is for internal/educational use. See `LICENSE` for details.
=======

# FleetFlow Backend (Flask + MySQL)

## Setup

1. Create MySQL DB
   CREATE DATABASE fleetflow;

2. Update config.py with MySQL username/password

3. Install dependencies
   pip install -r requirements.txt

4. Run server
   python run.py
>>>>>>> 810d4d5bd1eb13d2cf3463a2b04d7e44dc60cc8f
