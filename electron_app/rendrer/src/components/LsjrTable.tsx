import { useEffect, useState } from "react";

type Motif = "" | "motif1" | "motif2" | "motif3";

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
  result: boolean;
  createdAt: string;
}

interface otherqcm {
  id: string;
  qcm1: boolean;
  qcm2: boolean;
  qcm3: boolean;
  qcm4: boolean;
  qcm5: boolean;
  qcm6: boolean;
  qcm7: boolean;
  qcm8: boolean;
  qcm9: boolean;
  qcm10: boolean;
  result: boolean;
  createdAt: string;
}

interface table {
  id: string;
  name: string;
  company: string;
  cin: string;
  motif: Motif;
  results: result[];
  otherqcm: otherqcm[];
}

interface Props {
  sessionName: string;
  data: table[];
}

const mockdata: Props = {
  sessionName: "Session 1",
  data: [
    {
      id: "1",
      name: "John Doe",
      company: "Tech Corp",
      cin: "123456789",
      motif: "motif1",
      results: [
        {
          id: "res1",
          lsgr1: true,
          lsgr2: false,
          lsgr3: true,
          lsgr4: false,
          lsgr5: true,
          lsgr6: true,
          lsgr7: false,
          lsgr8: true,
          lsgr9: false,
          lsgr10: true,
          result: false,
          createdAt: "2023-10-01T12:00:00Z",
        },
        {
          id: "res2",
          lsgr1: true,
          lsgr2: false,
          lsgr3: true,
          lsgr4: false,
          lsgr5: true,
          lsgr6: true,
          lsgr7: false,
          lsgr8: true,
          lsgr9: false,
          lsgr10: true,
          result: false,
          createdAt: "2023-10-01T12:00:00Z",
        },
      ],
      otherqcm: [
        {
          id: "other1",
          qcm1: true,
          qcm2: false,
          qcm3: true,
          qcm4: false,
          qcm5: true,
          qcm6: true,
          qcm7: false,
          qcm8: true,
          qcm9: false,
          qcm10: true,
          result: false,
          createdAt: "2023-10-01T12:00:00Z",
        },
      ],
    },
  ],
};

export default function LsjrTable({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<Props>(
    mockdata // Replace with mockdata for testing
  );
  const [showLSGDetails, setShowLSGDetails] = useState(false);
  const [showOtherQCMDetails, setShowOtherQCMDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
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
  const otherqcmColumns = [
    "qcm1",
    "qcm2",
    "qcm3",
    "qcm4",
    "qcm5",
    "qcm6",
    "qcm7",
    "qcm8",
    "qcm9",
    "qcm10",
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
          setData(mockdata);
        }
      } catch (error) {
        console.error("Error fetching LSGR data:", error);
      }
    }

    fetchLsjrData();
  }, []);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-400 to-white rounded-xl shadow-xl p-6 relative">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          {data && data.sessionName} - LSGR Results
        </h2>
      </div>

      <div className="overflow-auto  border-2 border-gray-500 rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse text-base min-w-[900px]">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-orange-300 text-white sticky top-0 shadow-md">
              <th className="border border-orange-300 px-6 py-4 text-left font-bold sticky left-0  min-w-[200px]">
                Name
              </th>
              <th className="border border-orange-300 px-6 py-4 text-left font-bold min-w-[180px]">
                Company
              </th>
              <th className="border border-orange-300 px-6 py-4 text-left font-bold min-w-[120px]">
                CIN
              </th>
              <th className="border border-orange-300 px-6 py-4 text-left font-bold min-w-[100px]">
                Motif
              </th>
              <th className="border border-orange-300 px-6 py-4 text-center font-bold min-w-[120px]">
                LSGR
              </th>
              <th className="border border-orange-300 px-6 py-4 text-center font-bold min-w-[120px]">
                Other QCM
              </th>
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
                  } transition-all duration-200`}
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
                    <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 font-medium">
                      {row.motif || "N/A"}
                    </span>
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-2 text-center cursor-pointer hover:bg-orange-100"
                    onClick={() => {
                      setShowLSGDetails(true);
                      setSelectedRow(row.id);
                    }}
                  >
                    <div
                      className={`px-2 py-1 rounded text-xs font-bold   ${getCellStyle(
                        row.results[0].result
                      )}`}
                    >
                      {row.results[0].result ? "OK" : "NO"}
                    </div>
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-2 text-center cursor-pointer hover:bg-orange-100"
                    onClick={() => {
                      setShowOtherQCMDetails(true);
                      setSelectedRow(row.id);
                    }}
                  >
                    <div
                      className={`px-2 py-1 rounded text-xs font-bold  ${getCellStyle(
                        row.otherqcm[0].result
                      )}`}
                    >
                      {row.otherqcm[0].result ? "OK" : "NO"}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showLSGDetails && selectedRow && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setShowLSGDetails(false);
            setSelectedRow("");
          }}
        >
          <div className="absolute w-fit  bg-gradient-to-b from-gray-300 to-white border border-gray-300 rounded-lg p-4 mt-6 text-center"
          onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-orange-200 pb-3">
              LSGR Details -{" "}
              {data.data.find((item) => item.id === selectedRow)?.name}
            </h3>
            <div className="overflow-auto max-h-[70vh] border border-gray-200 rounded-lg shadow-inner">
              <table className="w-full border-collapse text-sm bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-400 to-orange-500 text-white sticky top-0 shadow-md">
                    {lsjrColumns.map((col) => (
                      <th
                        key={col}
                        className="border border-orange-200 px-4 py-3 text-left font-bold text-sm"
                      >
                        {col.toUpperCase()}
                      </th>
                    ))}
                    <th className="border border-orange-200 px-4 py-3 text-left font-bold text-sm">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data
                    .find((item) => item.id === selectedRow)
                    ?.results.map((res, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        {lsjrColumns.map((col) => (
                          <td
                            key={col}
                            className={`border border-gray-300 px-3 py-2 ${getCellStyle(
                              res[col]
                            )}`}
                          >
                            {res[col] ? "Yes" : "No"}
                          </td>
                        ))}
                        <td className="border border-gray-300 px-3 py-2 bg-gray-200">
                          {formatDate(res.createdAt)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showOtherQCMDetails && selectedRow && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setShowOtherQCMDetails(false);
            setSelectedRow("");
          }}
        >
          <div className=" absolute w-fit  bg-gradient-to-b from-gray-300 to-white border border-gray-300 rounded-lg p-4 mt-6 text-center "
          onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-orange-200 pb-3">
              otherqcm Details for{" "}
              {data.data.find((item) => item.id === selectedRow)?.name}
            </h3>
            <div className="overflow-auto max-h-[560px] border border-gray-800 rounded-lg">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-orange-400 text-white sticky top-0 ">
                    {otherqcmColumns.map((col) => (
                      <th
                        key={col}
                        className="border border-orange-300 px-3 py-2 text-left font-semibold"
                      >
                        {col.toUpperCase()}
                      </th>
                    ))}
                    <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data
                    .find((item) => item.id === selectedRow)
                    ?.otherqcm.map((res, idx) => (
                      <tr
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        {otherqcmColumns.map((col) => (
                          <td
                            key={col}
                            className={`border border-gray-300 px-3 py-2 ${getCellStyle(
                              res[col]
                            )}`}
                          >
                            {res[col] ? "Yes" : "No"}
                          </td>
                        ))}
                        <td className="border border-gray-300 px-3 py-2 bg-gray-200">
                          {new Date(res.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {data && data.data && data.data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available for this session
        </div>
      )}
    </div>
  );
}
