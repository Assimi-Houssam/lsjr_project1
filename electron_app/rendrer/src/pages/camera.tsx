import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

function Qrscanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      // cleanup  on umount  teh component so there no leak 
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  // start the camera and qr scanner
  const startCamera = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") {
        setError("getUserMedia is not available. Use a modern browser and a secure origin (HTTPS).");
        return;
      }

      if (videoRef.current) {
        // Initialize QR Scanner
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            setQrResult(result.data);
            // Optionally stop scanning after finding a QR code
            stopScanning();
          },
          {
            onDecodeError: (err) => {
              // Handle decode errors silently or log them
              console.log("QR decode error:", err);
            },
            preferredCamera: 'environment', // Use back camera
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        await qrScannerRef.current.start();
        setStreamActive(true);
        setIsScanning(true);
      }
    } catch (err: any) {
      console.error("Camera/QR Scanner error:", err);
      setStreamActive(false);
    }
  };

  const stopScanning = () => { 
    if (qrScannerRef.current && isScanning) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    }
  };

  
  const stopCamera = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setStreamActive(false);
    setIsScanning(false);
  };

  const toggleScanning = () => {
    if (!qrScannerRef.current) return;
    
    if (isScanning) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    } else {
      qrScannerRef.current.start();
      setIsScanning(true);
    }
  };



  const clearResult = () => {
    setQrResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">QR Code Scanner</h1>
      </div>

      <div className="w-full max-w-xl">
        {/* Video preview */}
        <div className="bg-black rounded-lg overflow-hidden mb-3 relative">
          <video
            ref={videoRef}
            className="w-full"
            playsInline
            muted
            style={{ maxHeight: 480, width: "100%", objectFit: "cover" }}
          />
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-white rounded-lg w-64 h-64 opacity-50"></div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-3">
          {!streamActive ? (
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Start Scanner
            </button>
          ) : (
            <>
              <button
                onClick={stopCamera}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Stop Scanner
              </button>
              <button
                onClick={toggleScanning}
                className={`px-4 py-2 text-white rounded ${
                  isScanning ? 'bg-yellow-600' : 'bg-green-600'
                }`}
              >
                {isScanning ? 'Pause Scanning' : 'Resume Scanning'}
              </button>
            </>
          )}

        
        </div>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        {/* QR Result */}
        <div className="mb-4">
          {qrResult ? (
            <div className="space-y-2">
              <div className="p-4 bg-green-100 border border-green-400 rounded">
                <h3 className="font-bold text-green-800 mb-2">QR Code Found:</h3>
                <p className="text-green-700 break-all">{qrResult}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(qrResult)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={clearResult}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              {isScanning ? 'Scanning for QR codes...' : 'No QR code detected yet.'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Qrscanner;