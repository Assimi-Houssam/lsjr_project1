import { useState } from "react";
import SessionTable from "../components/SessionTable";
import LsjrTable from "../components/LsjrTable";

type Motif = "" | "Famille" | "Santé" | "Autre";

interface sessiontable {
  id: string;
  sessionName: string;
  date: string;
}

interface table {
  name: string;
  company: string;
  cin: string;
  motif: Motif;
  lsgr1: boolean;
  lsgr2: boolean;
  lsgr3: boolean;
  lsgr4: boolean;
  lsgr5: boolean;
  lsgr6: boolean;
  lsgr7: boolean;
  lsgr8: boolean;
  lsgr9: boolean;
  lsgr10: boolean;
}

// Mock data for demonstration
const mockSessions: sessiontable[] = [
  { id: "001", sessionName: "Morning Session", date: "2024-01-15" },
  { id: "002", sessionName: "Afternoon Session", date: "2024-01-15" },
  { id: "003", sessionName: "Evening Session", date: "2024-01-16" },
  { id: "004", sessionName: "Weekend Session", date: "2024-01-20" },
  { id: "005", sessionName: "Monday Training", date: "2024-01-22" },
  { id: "006", sessionName: "Tuesday Workshop", date: "2024-01-23" },
  { id: "007", sessionName: "Wednesday Meeting", date: "2024-01-24" },
  { id: "008", sessionName: "Thursday Presentation", date: "2024-01-25" },
  { id: "009", sessionName: "Friday Discussion", date: "2024-01-26" },
  { id: "010", sessionName: "Weekend Conference", date: "2024-01-27" },
  { id: "011", sessionName: "Monthly Review", date: "2024-02-01" },
  { id: "012", sessionName: "Quarterly Planning", date: "2024-02-05" },
  { id: "013", sessionName: "Team Building", date: "2024-02-10" },
  { id: "014", sessionName: "Skills Assessment", date: "2024-02-15" },
  { id: "015", sessionName: "Performance Review", date: "2024-02-20" },
  { id: "016", sessionName: "Strategic Planning", date: "2024-02-25" },
  { id: "017", sessionName: "Innovation Session", date: "2024-03-01" },
  { id: "018", sessionName: "Quality Control", date: "2024-03-05" },
  { id: "019", sessionName: "Safety Training", date: "2024-03-10" },
  { id: "020", sessionName: "Leadership Workshop", date: "2024-03-15" },
  { id: "021", sessionName: "Customer Service", date: "2024-03-20" },
  { id: "022", sessionName: "Technical Training", date: "2024-03-25" },
  { id: "023", sessionName: "Project Kickoff", date: "2024-04-01" },
  { id: "024", sessionName: "Sprint Planning", date: "2024-04-05" },
  { id: "025", sessionName: "Code Review", date: "2024-04-10" },
];

const mockLsjrData: { [sessionId: string]: table[] } = {
  "001": [
    {
      name: "Ahmed Hassan",
      company: "Tech Corp",
      cin: "AB123456",
      motif: "Famille",
      lsgr1: true,
      lsgr2: true,
      lsgr3: false,
      lsgr4: true,
      lsgr5: true,
      lsgr6: false,
      lsgr7: true,
      lsgr8: true,
      lsgr9: false,
      lsgr10: true,
    },
    {
      name: "Sara Benali",
      company: "Design Studio",
      cin: "CD789012",
      motif: "Santé",
      lsgr1: true,
      lsgr2: false,
      lsgr3: true,
      lsgr4: true,
      lsgr5: false,
      lsgr6: true,
      lsgr7: true,
      lsgr8: false,
      lsgr9: true,
      lsgr10: true,
    },
    {
      name: "Mohammed Alami",
      company: "Finance Ltd",
      cin: "EF345678",
      motif: "Autre",
      lsgr1: false,
      lsgr2: true,
      lsgr3: true,
      lsgr4: false,
      lsgr5: true,
      lsgr6: true,
      lsgr7: false,
      lsgr8: true,
      lsgr9: true,
      lsgr10: false,
    },
  ],
  "002": [
    {
      name: "Fatima Zeroual",
      company: "Marketing Plus",
      cin: "GH901234",
      motif: "Famille",
      lsgr1: true,
      lsgr2: true,
      lsgr3: true,
      lsgr4: false,
      lsgr5: true,
      lsgr6: true,
      lsgr7: true,
      lsgr8: false,
      lsgr9: true,
      lsgr10: true,
    },
    {
      name: "Youssef Mansouri",
      company: "IT Solutions",
      cin: "IJ567890",
      motif: "Santé",
      lsgr1: false,
      lsgr2: false,
      lsgr3: true,
      lsgr4: true,
      lsgr5: true,
      lsgr6: false,
      lsgr7: true,
      lsgr8: true,
      lsgr9: false,
      lsgr10: false,
    },
  ],
  "003": [
    {
      name: "Aicha Berkani",
      company: "Consulting Group",
      cin: "KL123456",
      motif: "Autre",
      lsgr1: true,
      lsgr2: true,
      lsgr3: false,
      lsgr4: true,
      lsgr5: false,
      lsgr6: true,
      lsgr7: true,
      lsgr8: true,
      lsgr9: true,
      lsgr10: true,
    },
  ],
  "004": [],
};

export default function Getsession() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const handleSessionClick = (sessionId: string) => {
    console.log("Selected session ID:", sessionId);
    setSelectedSessionId(sessionId);
  };


  return (
    <div className="min-h-screen p-4 flex items-center">
      <div className="max-w-7xl mx-auto">
        {selectedSessionId ? (
          <LsjrTable
            sessionName={mockSessions.find(session => session.id === selectedSessionId)?.sessionName || ""}
            data={mockLsjrData[selectedSessionId] || []}
          />
        ) : (
          <SessionTable
            sessions={mockSessions}
            onSessionClick={handleSessionClick}
          />
        )}
      </div>
    </div>
  );
}
