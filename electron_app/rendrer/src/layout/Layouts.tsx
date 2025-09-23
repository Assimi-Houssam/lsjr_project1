import logo1 from "../assets/logo1.png";
import { useState } from "react";

interface NavbarProps {
  onCreateSession?: () => void;
  onDemoQuiz?: () => void;
  onGetSession?: () => void;
  onChooseServer?: (serverUrl: string) => void;
  onSyncNow?: () => void;
  onLogout?: () => void;
  children?: React.ReactNode;
}

export default function Navbar({
  onCreateSession,
  onDemoQuiz,
  onGetSession,
  onChooseServer,
  onSyncNow,
  onLogout,
  children,
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showServerInput, setShowServerInput] = useState(false);
  const [serverUrl, setServerUrl] = useState("");
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Fixed Sidebar */}
      <div className="fixed left-4 top-4 bottom-4 w-56 bg-gradient-to-b from-orange-500/80 to-orange-500/70 z-10 rounded-2xl shadow-lg  shadow-black/40 ">
        {/* Logo Section */}
        <div className="flex items-center justify-center">
          <img className="h-auto w-auto" src={logo1} alt="Logo" />
        </div>

        {/* Navigation Buttons */}
        <nav className="mt-8 px-4">
          <div className="space-y-4">
            <button
              onClick={onCreateSession}
              className="w-full flex items-center px-4 py-3 text-left text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Session
            </button>

            <button
              onClick={onDemoQuiz}
              className="w-full flex items-center px-4 py-3 text-left text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Demo Quiz
            </button>

            <button
              onClick={onGetSession}
              className="w-full flex items-center px-4 py-3 text-left text-white bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Get Session
            </button>
          </div>
        </nav>
      </div>

      {/* Settings Dropdown */}
      <div className="absolute right-4 top-4">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-20 h-10 rounded-2xl bg-orange-500/80 flex items-center justify-center hover:bg-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50 backdrop-blur-sm"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && !showServerInput && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
              <button
                onClick={() => {
                  setShowServerInput(true);
                }}
                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v4a2 2 0 01-2 2H5z"
                  />
                </svg>
                Choose Server
              </button>

              <button
                onClick={() => {
                  onSyncNow?.();
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Sync Now
              </button>

              <button
                onClick={() => {
                  onLogout?.();
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4 mr-3 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}

          {/* Server URL Input Form */}
          {isDropdownOpen && showServerInput && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4">
              <div className="mb-3">
                <label
                  htmlFor="server-url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Server URL
                </label>
                <input
                  id="server-url"
                  type="url"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="https://xxx.xxx.x.xxx:xxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (serverUrl.trim()) {
                      onChooseServer?.(serverUrl.trim());
                    }
                    setShowServerInput(false);
                    setIsDropdownOpen(false);
                    setServerUrl("");
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-150"
                >
                  Connect
                </button>
                <button
                  onClick={() => {
                    setShowServerInput(false);
                    setServerUrl("");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsDropdownOpen(false);
            setShowServerInput(false);
            setServerUrl("");
          }}
        />
      )}
      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex  items-center ">
        {/* Page Content */}
        <div className="flex-1 bg-orange-50/30 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
