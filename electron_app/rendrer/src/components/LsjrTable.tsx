import { useEffect, useState } from "react";

type Motif = "" | "Famille" | "Santé" | "Autre";

interface result {
  id: string;
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
interface table {
  id: string;
  name: string;
  company: string;
  cin: string;
  motif: Motif;
  results: result;
}

interface Props {
  sessionName: string;
  data: table[];
}

export default function LsjrTable({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<Props>();
  const lsjrColumns = [
    "lsgr1",
    "lsgr2",
    "lsgr3",
    "lsgr4",
    "lsgr5",
    "lsgr6",
    "lsgr7",
    "lsgr8",
    "lsgr9",
    "lsgr10",
  ] as const;

  const getCellStyle = (value: boolean) => {
    return value ? "bg-green-500 text-white" : "bg-red-500 text-white";
  };

  useEffect(() => {
    async function fetchLsjrData() {
      console.log("Fetching LSGR data for session:", sessionId);
      if (!sessionId) return;
      try {
        if (window.api && window.api.getParticipant) {
          const response = await window.api.getParticipant(sessionId);
          console.log("Fetched LSGR data:", response);
          setData(response);
        }
      } catch (error) {
        console.error("Error fetching LSGR data:", error);
      }
    }

    fetchLsjrData();
  }, []);

  useEffect(() => {
    console.log("LSGR Data updated:", data);
  }, [data]);

  return (
    <div className="bg-orange-100 rounded-lg shadow-lg p- relative">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-2xl font-bold text-orange-400 text-center">
          {data && data.sessionName} - LSGR Results
        </h2>
      </div>

      <div className="overflow-auto max-h-[470px] border border-gray-800 rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-orange-400 text-white sticky top-0 z-10">
              <th className="border border-orange-300 px-3 py-2 text-left font-semibold sticky left-0 bg-orange-400">
                Name
              </th>
              <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                Company
              </th>
              <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                CIN
              </th>
              <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                Motif
              </th>
              {lsjrColumns.map((col) => (
                <th
                  key={col}
                  className="border border-orange-300 px-3 py-2 text-center font-semibold"
                >
                  {col.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data &&
              data.data.map((row, index) => (
                <tr
                  key={`${row.cin}-${index}`}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-orange-50 transition-all duration-200`}
                >
                  <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700 sticky left-0 bg-inherit">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">
                    {row.company}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">
                    {row.cin}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">
                    <span className="px-2 py-1 text-xs text-gray-700">
                      {row.motif || "N/A"}
                    </span>
                  </td>
                  {row.results &&
                    lsjrColumns.map((col) => (
                      <td
                        key={col}
                        className="border border-gray-300 px-3 py-2 text-center"
                      >
                        <div
                          className={`px-2 py-1 rounded text-xs font-bold ${getCellStyle(
                            row.results[col]
                          )}`}
                        >
                          {row.results[col] ? "OK" : "NO"}
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {data && data.data && data.data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available for this session
        </div>
      )}
    </div>
  );
}
