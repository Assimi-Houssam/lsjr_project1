import { useState } from "react";
import "./App.css";
import Navbar from "./layout/navbar";
import Quiz from "./pages/quiz";
import LanguageSelector from "./pages/laguage";


export type Answer = boolean | null;

function App() {

  const [chosenLanguage, setChosenLanguage] = useState('');

  const handleLanguageSelect = (language: string) => {
    setChosenLanguage(language);
  }
  

  return (
    <>
      <Navbar />
      {chosenLanguage.length == 0 ? <LanguageSelector  onLanguageSelection={handleLanguageSelect}/> : <Quiz langue={chosenLanguage} />}
    </>
  );
}

export default App;
