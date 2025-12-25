// frontend/src/api/api.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// -------------------------------
// SALES LEADS
// -------------------------------
export async function getSalesLeads() {
    const res = await axios.get(`${API_BASE}/leads/`);
    return res.data;
}

// -------------------------------
// PACKAGING
// -------------------------------
export async function getPackaging() {
    const res = await axios.get(`${API_BASE}/packaging/`);
    return res.data;
}

// -------------------------------
// COSTINGS LIST
// -------------------------------
export async function getCostings(projectCode = "") {
    const res = await axios.get(`${API_BASE}/costings/`, {
        params: { project_code: projectCode }
    });
    return res.data;
}

// -------------------------------
// CREATE COSTING  ✅ FIXED
// -------------------------------
export async function createCosting(form) {
    const fd = new FormData();

    Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
            form[key].forEach(v => fd.append(key, v));
        } else if (form[key] !== null && form[key] !== undefined) {
            fd.append(key, form[key]);
        }
    });

    const res = await axios.post(
        `${API_BASE}/costing/new/`,
        fd,
        { withCredentials: true }
    );
    return res.data;
}
