import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CostingList from "./pages/CostingList";
import CostingForm from "./pages/CostingForm";
import LeadTracker from "./pages/LeadTracker";
import SalesDatabase from "./pages/SalesDatabase";
import SalesPerformance from "./pages/SalesPerformance";
import Quotation from "./pages/Quotation";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-layout">
                <Sidebar />

                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/costings" element={<CostingList />} />
                        <Route path="/costing/new" element={<CostingForm />} />
                        <Route path="/leads" element={<LeadTracker />} />
                        <Route path="/sales-database" element={<SalesDatabase />} />
                        <Route path="/sales-performance" element={<SalesPerformance />} />
                        <Route path="/quotation" element={<Quotation />} />
                        <Route path="/lead-tracker" element={<LeadTracker />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
