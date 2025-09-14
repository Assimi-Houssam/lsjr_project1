import { useState } from "react";

interface SessionFormProps {
  onCreateSession: (sessionName: string) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ onCreateSession }) => {
  const [sessionName, setSessionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionName.trim()) return;
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onCreateSession(sessionName.trim());
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Start a New Session
        </h2>
        <p className="text-gray-600">
          Enter a name for your session to generate a QR code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="sessionName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Session Name
          </label>
          <input
            type="text"
            id="sessionName"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Enter session name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            required
            disabled={isLoading}
          />
        </div>

        <button
            type="submit"
            disabled={!sessionName.trim() || isLoading}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
        >
            {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Session...</span>
                </div>
            ) : (
                "Create Session"
            )}
        </button>
      </form>
    </div>
  );
};

export default SessionForm;