import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./layout/Layouts";
import Thequiz from "./pages/Thequiz";
import CreateSession from "./pages/Createsession";
import Getsession from "./pages/Getsession";
import Login from "./components/Login";
import { DebugPanel } from "./components/DebugPanel";

function App() {
  const [page, setPage] = useState("create");
  const [needlogin, setNeedlogin] = useState(true);
  const [pageKey, setPageKey] = useState(0); // counter to force remount
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // Listen for debug panel keyboard shortcut from main process
  useEffect(() => {
    if (window.api?.onShowDebugPanel) {
      const unsubscribe = window.api.onShowDebugPanel(() => {
        setShowDebugPanel(true);
      });
      return unsubscribe;
    }
  }, []);

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+D to show debug panel
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        setShowDebugPanel(true);
      }
      // Escape to close debug panel
      if (event.key === "Escape" && showDebugPanel) {
        event.preventDefault();
        setShowDebugPanel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDebugPanel]);

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

  const handleChooseServer = (serverUrl: string) => {
    console.log("Chosen server URL:", serverUrl);
  
  };
  const handleSyncNow = () => {
    setNeedlogin(true);
  };

  const handleLogin = async (email: string, password: string) => {
    console.log("Login attempt:", email, password);
    // Here you would typically make an API call to authenticate
    // For now, we'll just simulate a successful login
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password
      console.log("Login successful");
      setNeedlogin(false);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (show message, etc.)
    }
  };

  const handleLoginCancel = () => {
    console.log("Login cancelled");
    setNeedlogin(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <>
      <Navbar
        onCreateSession={handleCreateSession}
        onDemoQuiz={handleDemoQuiz}
        onGetSession={handleGetSession}
        onChooseServer={handleChooseServer}
        onSyncNow={handleSyncNow}
        onLogout={handleLogout}
      >
        {needlogin && (
          <Login onLogin={handleLogin} onCancel={handleLoginCancel} />
        )}
        {page === "create" && <CreateSession key={`create-${pageKey}`} />}
        {page === "demo" && <Thequiz key={`demo-${pageKey}`} />}
        {page === "get" && <Getsession key={`get-${pageKey}`} />}
      </Navbar>

      {/* Debug Panel */}
      <DebugPanel
        isVisible={showDebugPanel}
        onClose={() => setShowDebugPanel(false)}
      />

      {/* Debug hint for users */}
      {!showDebugPanel && (
        <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-black bg-opacity-50 px-2 py-1 rounded">
          Press Ctrl+Shift+D for debug panel
        </div>
      )}
    </>
  );
}

export default App;
