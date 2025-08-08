import React, { useState } from "react";

export default function Agents() {
  const [project, setProject] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!project.trim()) return alert("Please enter a project description");

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/agents/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Agents Playground</h1>
      <textarea
        placeholder="Describe your project..."
        value={project}
        onChange={(e) => setProject(e.target.value)}
        rows="5"
        style={{ width: "100%", padding: "10px" }}
      />
      <br />
      <button onClick={handleGeneratePlan} disabled={loading}>
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {response && (
        <pre
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f4f4f4",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
