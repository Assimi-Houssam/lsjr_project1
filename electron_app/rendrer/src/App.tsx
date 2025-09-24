import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./layout/Layouts";
import Thequiz from "./pages/Thequiz";
import CreateSession from "./pages/Createsession";
import Getsession from "./pages/Getsession";
import Login from "./components/Login";
import { DebugPanel } from "./components/DebugPanel";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [page, setPage] = useState("create");
  const [needlogin, setNeedlogin] = useState(false);
  const [pageKey, setPageKey] = useState(0); // counter to force remount
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [log_in_out , setLog_in_out] = useState(false);

  // Listen for debug panel keyboard shortcut from main process
  useEffect(() => {
    if (window.api?.onShowDebugPanel) {
      const unsubscribe = window.api.onShowDebugPanel(() => {
        setShowDebugPanel(true);
      });
      return unsubscribe;
    }
  }, []);

  // need useEffect for checking if he is logged in or not todo
  useEffect(() => {
    if ( window.api?.isloggedin ) {
      window.api.isloggedin().then((response) => {
        console.log("Login status:", response);
        if (response.logged_in) {
          setLog_in_out(true);
        }
      });
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
    if ( window.api?.server_info ) {
      window.api.server_info(serverUrl).then((response) => {
        if (response.success) {
          toast.success("Le serveur a été mis à jour avec succès.");
        } else {
            toast.error("Une erreur est survenue lors de la mise à jour du serveur.");
        }
      });
    }
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
    setNeedlogin(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    if (!log_in_out) {
      setNeedlogin(true);
      return;
    }
    if ( window.api?.loggedout ) {
      window.api.loggedout().then((response) => {
        if (response.success) {
          toast.success("Logged out successfully.");
          setLog_in_out(false);
        } else {
          toast.error("Logout failed.");
        }
      });
    }
  };

  return (
    <>
    <div className=" h-screen w-screen overflow-hidden bg-gradient-to-b from-gray-500/50 to-white">
      <Navbar
        onCreateSession={handleCreateSession}
        onDemoQuiz={handleDemoQuiz}
        onGetSession={handleGetSession}
        onChooseServer={handleChooseServer}
        onSyncNow={handleSyncNow}
        onLogout={handleLogout}
        isLoggedIn={log_in_out}
      >
        {needlogin && (
          <Login onLogin={handleLogin} onCancel={handleLoginCancel } />
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
      <Toaster
      position="bottom-right"
      reverseOrder={false} />
    </div>
    </>
  );
}

export default App;
