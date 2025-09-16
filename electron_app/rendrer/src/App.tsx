
import { useState } from "react";
import "./App.css";
import Navbar from "./layout/Layouts";
import Thequiz from "./pages/Thequiz";
import CreateSession from "./pages/Createsession";
import Getsession from "./pages/Getsession";
// import Qrscanner from "./pages/camera";

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
    // <div>
    //   < Qrscanner />
    // </div>
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
