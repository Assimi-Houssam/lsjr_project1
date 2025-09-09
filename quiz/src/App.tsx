import "./App.css";
import Navbar from "./layout/navbar";
import Quiz from "./pages/quiz";


export type Answer = boolean | null;

function App() {
  

  return (
    <>
      <Navbar />
      <Quiz />
    </>
  );
}

export default App;
