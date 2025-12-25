import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeadTracker.css";

const STATUSES = [
    { key: "new", label: "New" },
    { key: "contacted", label: "Contacted" },
    { key: "qualified", label: "Qualified" },
    { key: "converted", label: "Converted" },
    { key: "lost", label: "Lost" },
];

export default function LeadTracker() {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        const res = await axios.get("http://127.0.0.1:8000/leads/");
        setLeads(res.data);
    };

    const onDrop = async (leadId, newStatus) => {
        await axios.patch(
            `http://127.0.0.1:8000/leads/${leadId}/status/`,
            { status: newStatus }
        );

        setLeads(
            leads.map((l) =>
                l.id === leadId ? { ...l, status: newStatus } : l
            )
        );
    };

    return (
        <div className="kanban">
            {STATUSES.map((col) => (
                <div
                    key={col.key}
                    className="kanban-column"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        const leadId = e.dataTransfer.getData("leadId");
                        onDrop(Number(leadId), col.key);
                    }}
                >
                    <h3>{col.label}</h3>

                    {leads
                        .filter((l) => l.status === col.key)
                        .map((lead) => (
                            <div
                                key={lead.id}
                                className="kanban-card"
                                draggable
                                onDragStart={(e) =>
                                    e.dataTransfer.setData(
                                        "leadId",
                                        lead.id
                                    )
                                }
                            >
                                <strong>{lead.company_name}</strong>
                                <div className="owner">{lead.owner}</div>
                                <div className="email">{lead.email}</div>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
