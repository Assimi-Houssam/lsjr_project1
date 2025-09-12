import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

interface QRCodeDisplayProps {
  sessionData: { sessionName: string; sessionId: string, serverUrl?: string };
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  sessionData,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const QRCode = (await import("qrcode")).default;

        // Create the link data for the QR code
        const qrData = `${sessionData.serverUrl}/${encodeURIComponent(sessionData.sessionId)}`;

        const dataUrl = await QRCode.toDataURL(qrData, {
          width: isFullscreen ? 400 : 300,
          margin: 2,
          color: {
            dark: "#1f2937",
            light: "#ffffff",
          },
        });

        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [sessionData, isFullscreen]);

  return (
    <div
      className={`${
        isFullscreen
          ? "flex-1 flex flex-col justify-center items-center p-8"
          : "text-center space-y-6"
      }`}
    >
      {/* Header Controls */}
      <div
        className={`flex justify-end items-center ${
          isFullscreen ? "absolute top-4 left-4 right-4" : "mb-4"
        }`}
      >
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <MdFullscreenExit size={24} />
          ) : (
            <MdFullscreen size={24} />
          )}
        </button>
      </div>

      {/* Session Info */}
      <div className={`${isFullscreen ? "text-center mb-8" : "space-y-2"}`}>
        <h2
          className={`font-bold text-gray-800 ${
            isFullscreen ? "text-3xl" : "text-xl"
          }`}
        >
          Session Created!
        </h2>
        <p
          className={`text-gray-600 ${isFullscreen ? "text-xl" : "text-base"}`}
        >
          {sessionData.sessionName}
        </p>
        <p
          className={`text-gray-500 font-mono ${
            isFullscreen ? "text-lg" : "text-sm"
          }`}
        >
          ID: {sessionData.sessionId}
        </p>
      </div>

      {/* QR Code */}
      <div
        className={`bg-white p-6 rounded-xl shadow-lg ${
          isFullscreen ? "scale-125" : ""
        }`}
      >
        {qrCodeDataUrl ? (
          <img
            src={qrCodeDataUrl}
            alt="Session QR Code"
            className={`mx-auto ${isFullscreen ? "w-96 h-96" : "w-64 h-64"}`}
          />
        ) : (
          <div
            className={`bg-gray-100 rounded-lg flex items-center justify-center ${
              isFullscreen ? "w-96 h-96" : "w-64 h-64"
            }`}
          >
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-500">Generating QR Code...</p>
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default QRCodeDisplay;