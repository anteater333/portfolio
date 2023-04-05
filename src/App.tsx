import { useState } from "react";
import "./App.css";
import PBody from "./components/PBody";
import PFooter from "./components/PFooter";
import PHeader from "./components/PHeader";

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <>
      <PHeader selected={currentSection} />
      <PBody setCurrentSection={setCurrentSection} />
      <PFooter />
    </>
  );
}

export default App;
