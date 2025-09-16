import React, { useState } from "react";
import QRCodeDisplay from "../components/Qrcode";
import SessionForm from "../components/Sessionform";

// Parent Component
const CreateSession: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [sessionData, setSessionData] = useState<{
    sessionName: string;
    sessionId: string;
    serverUrl?: string;
  } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCreateSession = (sessionName: string) => {
    // Generate a unique session ID (in real app, this would come from the API)

    // TODO: Send data to electron service
    if (window.api && typeof window.api.createSession === "function") {
      window.api.createSession(sessionName).then((response) => {
        console.log("response", response);
        setShowQRCode(true);
        setSessionData({
          sessionName,
          sessionId: response.sessionId,
          serverUrl: response.serverUrl,
        });
      }).catch((error) => {
        console.error("Error creating session:", error);
        alert("Failed to create session. Please try again.");
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={` min-h-screen  p-4 transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : " flex items-center"
      }`}
    >
      <div
        className={`mx-auto w-full ${
          isFullscreen
            ? "h-full flex items-center justify-center"
            : "max-w-2xl pt-8"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen
              ? "w-full h-full max-w-4xl"
              : "shadow-lg hover:shadow-xl"
          }`}
        >
          {/* Header */}
          {!isFullscreen && (
            <div className="bg-orange-400 px-6 py-4">
              <h1 className="text-2xl font-bold text-white text-center">
                Créer une session
              </h1>
            </div>
          )}

          {/* Content */}
          <div className={`${isFullscreen ? "h-full flex flex-col" : "p-6"}`}>
            {!showQRCode ? (
              <SessionForm onCreateSession={handleCreateSession} />
            ) : (
              <QRCodeDisplay
                sessionData={sessionData!}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
