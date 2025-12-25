import React from "react";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to VALOS internal panel.</p>

            <div style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px"
            }}>
                <div style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "250px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <h3>Sales Leads</h3>
                    <p>Track new & contacted client leads.</p>
                </div>

                <div style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "250px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <h3>Costing Engine</h3>
                    <p>Create costings & generate quotations.</p>
                </div>
            </div>
        </div>
    );
}
