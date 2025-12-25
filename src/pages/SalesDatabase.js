// frontend/src/pages/SalesDatabase.js
import React, { useEffect, useState } from "react";
import { getSalesLeads } from "../api/api";
import "./SalesDatabase.css";

export default function SalesDatabase() {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const data = await getSalesLeads();
                setLeads(data || []);
            } catch (err) {
                console.error("Failed to load leads", err);
            }
        }
        load();
    }, []);

    const filteredLeads = leads.filter(l =>
        l.company_name?.toLowerCase().includes(search.toLowerCase()) ||
        l.owner?.toLowerCase().includes(search.toLowerCase()) ||
        l.email?.toLowerCase().includes(search.toLowerCase()) ||
        l.location?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="sales-db">
            <h1>Sales Database</h1>

            {/* Search */}
            <input
                className="sales-search"
                type="text"
                placeholder="Search by company, owner, email, location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Table */}
            <div className="table-wrapper">
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company</th>
                            <th>Owner</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Location</th>
                            <th>Segment</th>
                            <th>POC</th>
                            <th>Notes</th>
                            <th>Created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredLeads.length === 0 && (
                            <tr>
                                <td colSpan="11" className="empty">
                                    No leads found
                                </td>
                            </tr>
                        )}

                        {filteredLeads.map((l) => (
                            <tr key={l.id}>
                                <td>{l.id}</td>
                                <td className="strong">{l.company_name}</td>
                                <td>{l.owner}</td>
                                <td>{l.email}</td>
                                <td>{l.phone}</td>
                                <td>
                                    {l.website ? (
                                        <a href={l.website} target="_blank" rel="noreferrer">
                                            Visit
                                        </a>
                                    ) : "--"}
                                </td>
                                <td>{l.location}</td>
                                <td>{l.segment}</td>
                                <td>{l.poc}</td>
                                <td className="notes">{l.notes}</td>
                                <td>
                                    {l.created_at
                                        ? new Date(l.created_at).toLocaleDateString()
                                        : "--"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
