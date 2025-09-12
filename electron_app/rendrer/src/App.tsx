import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [capturedDataUrl, setCapturedDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to open camera automatically on mount (you can trigger this from a button instead)
    return () => {
      // cleanup on unmount: stop tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreamActive(true);
    } catch (err: any) {
      console.error("getUserMedia error:", err);
      setError(err?.message || "Camera error");
      setStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const s = videoRef.current.srcObject as MediaStream;
      s.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedDataUrl(dataUrl);
    // optionally stop camera after capture
    // stopCamera();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedDataUrl(reader.result as string);
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Camera capture (browser)</h1>
      </div>

      <div className="w-full max-w-xl">
        {/* Video preview */}
        <div className="bg-black rounded-lg overflow-hidden mb-3">
          <video
            ref={videoRef}
            className="w-full"
            playsInline
            muted
            style={{ maxHeight: 480, width: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="flex items-center space-x-2 mb-3">
          {!streamActive ? (
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Stop Camera
            </button>
          )}

          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={!streamActive}
          >
            Capture
          </button>

          {/* fallback file input for camera on devices that support capture attribute */}
          <label className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
            Use File Input
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
        </div>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        {/* captured image */}
        <div className="mb-4">
          {capturedDataUrl ? (
            <div className="space-y-2">
              <img
                src={capturedDataUrl}
                alt="captured"
                className="w-full rounded border"
              />
              <div className="flex space-x-2">
                <a
                  href={capturedDataUrl}
                  download={`capture-${Date.now()}.png`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Download
                </a>
                <button
                  onClick={() => setCapturedDataUrl(null)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No photo captured yet.</div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

export default App;







/**
 * 
 * import { useState } from "react";
import "./App.css";
import Navbar from "./layout/Layouts";
import Thequiz from "./pages/Thequiz";
import CreateSession from "./pages/Createsession";
import Getsession from "./pages/Getsession";

function App() {
  const [page, setPage] = useState("create");
  const [pageKey, setPageKey] = useState(0); // counter to force remount

  const handleCreateSession = () => {
    setPage("create");
    setPageKey((k) => k + 1); // bump to force remount/reload
  };

  const handleDemoQuiz = () => {
    setPage("demo");
    setPageKey((k) => k + 1);
  };

  const handleGetSession = () => {
    setPage("get");
    setPageKey((k) => k + 1);
  };

  return (
    <Navbar
      onCreateSession={handleCreateSession}
      onDemoQuiz={handleDemoQuiz}
      onGetSession={handleGetSession}
      >

      {page === "create" && <CreateSession key={`create-${pageKey}`} />}
      {page === "demo" && <Thequiz key={`demo-${pageKey}`} />}
      {page === "get" && <Getsession key={`get-${pageKey}`} />}
    </Navbar> 
  );
}

export default App;

 */