import { useState } from "react";
import PBody from "../components/PBody";
import PFooter from "../components/PFooter";
import PHeader from "../components/PHeader";

function MainScreen() {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <>
      <PHeader selected={currentSection} />
      <PBody setCurrentSection={setCurrentSection} />
      <PFooter />
    </>
  );
}

export default MainScreen;
