import { useState, useEffect } from "react";
import QRCodeDisplay from "./Qrcode";

interface sessiontable {
  id: string;
  name: string;
  createdAt?: string | Date;
}

interface Props {
  onSessionClick: (sessionId: string) => void;
}

export default function SessionTable({ onSessionClick }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [showQR, setShowQRCode] = useState(false);
  const [sessionData, _setSessionData] = useState<{
    sessionName: string;
    sessionId: string;
    serverUrl?: string;
  } | null>({
    sessionId: "sadadas",
    sessionName: "asdasd",
    serverUrl: "http://localhost:3000",
  });
  const [sessions, setSessions] = useState<sessiontable[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset selected session when component mounts
    const fetchSessions = async () => {
      if (window.api && typeof window.api.getSessions === "function") {
        try {
          const sessions = await window.api.getSessions({});
          console.log("Fetched sessions:", sessions);
          setSessions(sessions.sessions || []);
          setTotalPages(sessions.totalPages || 1);
          console.log("Fetched sessions on mount:", sessions);
        } catch (error) {
          console.error("Error fetching sessions:", error);
        }
      }
    };

    fetchSessions();
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Reset to first page when filters change
  const handleFilterChange = async () => {
    if (window.api && typeof window.api.getSessions === "function") {
      try {
        const sessions = await window.api.getSessions({
          page: 1,
          search: searchTerm || undefined,
          from: dateFrom || null,
          to: dateTo || null,
        });
        console.log("Fetched  in filter:", sessions);
        setCurrentPage(1);
        setSessions(sessions.sessions || []);
        setTotalPages(sessions.totalPages || 1);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
  };

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);

    handleFilterChange();
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    handleFilterChange();
  };

  const handlePageChange = async (page: number) => {
    if (window.api && typeof window.api.getSessions === "function") {
      try {
        const sessions = await window.api.getSessions({
          page,
          search: searchTerm || undefined,
          from: dateFrom || null,
          to: dateTo || null,
        });
        console.log("Fetched sessions:", sessions);
        setSessions(sessions.sessions || []);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    setCurrentPage(page);
  };

  const showQRCode = (_sessionId: string) => {
    if (!sessions) return;
    if (window.api && typeof window.api.getSession === "function") {
      window.api
        .getSession(_sessionId)
        .then((data) => {
          if (!data.ok)
            throw new Error( "Failed to fetch session data");
          _setSessionData({
            sessionName:
              sessions.find((s) => s.id === _sessionId)?.name || "Unknown",
            sessionId: data.sessionId,
            serverUrl: data.serverUrl,
          });
          setShowQRCode(true);
        })
        .catch((error) => {
          console.error("Error fetching session data for QR code:", error);
        });
    }
  };

  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 7;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  useEffect(() => {
    if (!showQR) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowQRCode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showQR]);

  useEffect(() => {
    const delay = 500;
    const id = setTimeout(() => {
      handleFilterChange();
    }, delay);
    return () => clearTimeout(id);
  }, [searchTerm, dateFrom, dateTo]);

  // safe date formatter
  const formatDate = (v?: string | Date | null) => {
    if (!v) return "N/A";
    const d = v instanceof Date ? v : new Date(String(v));
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 ">
      <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
        Session Management
      </h2>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Sessions
          </label>
          <input
            type="text"
            placeholder="Search by session name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateFromChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => handleDateToChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-400 text-white">
              <th className="border border-orange-300 px-4 py-3 text-left font-semibold">
                Session Name
              </th>
              <th className="border border-orange-300 px-4 py-3 text-left font-semibold">
                Date
              </th>
              <th className="border border-orange-300 px-4 py-3 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr
                key={session.id}
                onClick={() => onSessionClick(session.id)}
                className={`cursor-pointer transition-all duration-200 hover:bg-orange-50 hover:shadow-md ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                  {session.name}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                  {formatDate(session.createdAt)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showQRCode(session.id);
                    }}
                    className="px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition-all duration-200"
                  >
                    show QR Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results Message */}
      {sessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {sessions.length === 0
            ? "No sessions available"
            : "No sessions match your filters"}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              } transition-all duration-200`}
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            {getPaginationRange().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-orange-100"
                } transition-all duration-200`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              } transition-all duration-200`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {showQR && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowQRCode(false)} // clicking overlay closes modal
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // prevent inner clicks from closing
          >
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">Session QR Code</h3>

            <QRCodeDisplay
              sessionData={sessionData!}
              isFullscreen={true}
              onToggleFullscreen={toggleFullscreen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
