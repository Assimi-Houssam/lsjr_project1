import { useState, useMemo } from "react";

interface sessiontable {
  id: string;
  sessionName: string;
  date: string;
}

interface Props {
  sessions: sessiontable[];
  onSessionClick: (sessionId: string) => void;
}

export default function SessionTable({ sessions, onSessionClick }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter sessions based on search term and date range
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesSearch = session.sessionName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const sessionDate = new Date(session.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const matchesDateRange =
        (!fromDate || sessionDate >= fromDate) &&
        (!toDate || sessionDate <= toDate);

      return matchesSearch && matchesDateRange;
    });
  }, [sessions, searchTerm, dateFrom, dateTo]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFilterChange();
  };

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    handleFilterChange();
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    handleFilterChange();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;
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
            onChange={(e) => handleSearchChange(e.target.value)}
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

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedSessions.length} of {filteredSessions.length}{" "}
          sessions
        </p>
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
            </tr>
          </thead>
          <tbody>
            {paginatedSessions.map((session, index) => (
              <tr
                key={session.id}
                onClick={() => onSessionClick(session.id)}
                className={`cursor-pointer transition-all duration-200 hover:bg-orange-50 hover:shadow-md ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                  {session.sessionName}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                  {new Date(session.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Results Message */}
      {filteredSessions.length === 0 && (
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
    </div>
  );
}
