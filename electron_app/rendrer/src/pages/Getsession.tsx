import { useState } from "react";
import SessionTable from "../components/SessionTable";
import LsjrTable from "../components/LsjrTable";


export default function Getsession() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
;

  const handleSessionClick = (sessionId: string) => {
    console.log("Selected session ID:", sessionId);
    setSelectedSessionId(sessionId);
  };


  return (
    <div className="min-h-screen p-4 flex items-center">
      <div className="max-w-7xl mx-auto">
        {selectedSessionId ? (
          <LsjrTable
            sessionId={selectedSessionId}
          />
        ) : (
          <SessionTable
            onSessionClick={handleSessionClick}
          />
        )}
      </div>
    </div>
  );
}
