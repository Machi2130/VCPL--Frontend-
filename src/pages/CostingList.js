// frontend/src/pages/CostingList.js
import React, { useEffect, useState } from "react";
import { getCostings } from "../api/api";

export default function CostingList() {
    const [projectCode, setProjectCode] = useState("");
    const [items, setItems] = useState([]);

    // Load list
    const loadCostings = async () => {
        try {
            const data = await getCostings(projectCode);
            setItems(data || []);
        } catch (err) {
            console.error("Error loading costings:", err);
        }
    };

    useEffect(() => {
        loadCostings();
    }, []);

    const duplicateCosting = (id) => {
        window.location.href = `http://127.0.0.1:8000/costing/${id}/duplicate/`;
    };

    const openQuotation = (code) => {
        window.location.href = `http://127.0.0.1:8000/quotation/${code}/`;
    };

    return (
        <div>
            <h1>Costings</h1>

            {/* Search */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search by Project Code"
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button onClick={loadCostings}>Search</button>
            </div>

            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th>ID</th>
                        <th>Project Code</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Unit Price (INR)</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No costings found
                            </td>
                        </tr>
                    )}

                    {items.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.project_code}</td>
                            <td>{c.product_name}</td>
                            <td>{c.status}</td>
                            <td>
                                {c.computed?.["Final unit price (INR)"] ??
                                    c.computed?.unit_price ??
                                    "--"}
                            </td>
                            <td>{c.created_at?.slice(0, 10)}</td>
                            <td>
                                <button
                                    onClick={() => duplicateCosting(c.id)}
                                    style={{ marginRight: "8px" }}
                                >
                                    Duplicate
                                </button>
                                <button onClick={() => openQuotation(c.project_code)}>
                                    Quotation
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
