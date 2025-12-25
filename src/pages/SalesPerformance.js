import React, { useEffect, useState } from "react";
import { getSalesLeads } from "../api/api";

export default function SalesPerformance() {
    const [stats, setStats] = useState({
        total: 0,
        contacted: 0,
        newLeads: 0
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const data = await getSalesLeads();
        const contacted = data.filter(l => l.email).length;

        setStats({
            total: data.length,
            contacted: contacted,
            newLeads: data.length - contacted
        });
    };

    return (
        <div>
            <h1>Sales Performance</h1>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div style={{ background: "#fff", padding: "20px", width: "200px" }}>
                    <h3>Total Leads</h3>
                    <p>{stats.total}</p>
                </div>

                <div style={{ background: "#fff", padding: "20px", width: "200px" }}>
                    <h3>Contacted</h3>
                    <p>{stats.contacted}</p>
                </div>

                <div style={{ background: "#fff", padding: "20px", width: "200px" }}>
                    <h3>New Leads</h3>
                    <p>{stats.newLeads}</p>
                </div>
            </div>
        </div>
    );
}
