import logo1 from '../assets/logo1.png'
interface NavbarProps {
  onCreateSession?: () => void;
  onDemoQuiz?: () => void;
  onGetSession?: () => void;
  children?: React.ReactNode;
}

export default function Navbar({
  onCreateSession,
  onDemoQuiz,
  onGetSession,
  children,
}: NavbarProps) {
  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Fixed Sidebar */}
      <div className="fixed left-4 top-4 bottom-4 w-56 bg-gradient-to-b from-orange-500/80 to-orange-500/70 z-10 rounded-2xl shadow-lg  shadow-black/40 ">
        {/* Logo Section */}
        <div className="flex items-center justify-center">
          <img
            className="h-auto w-auto"
            src={logo1}
            alt="Logo"
          />
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

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex  items-center ">

        {/* Page Content */}
        <div className="flex-1 bg-orange-50/30 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
