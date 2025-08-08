export const metadata = {
    title: "Agent Lab",
    robots: { index: false, follow: false },
  };
  
  export default function AgentPage() {
    return (
      <main style={{ padding: 24 }}>
        <h1>Agent Lab</h1>
        <p>Experiments go here.</p>
        {/* Example:
        <button onClick={async () => {
          const r = await fetch("/api/agent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ping: true }),
          });
          console.log(await r.json());
        }}>Test API</button> */}
      </main>
    );
  }
  