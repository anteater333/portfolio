import { useEffect, useState } from "react";
import PBody from "../components/PBody";
import PFooter from "../components/PFooter";
import PHeader from "../components/PHeader";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";

function MainScreen() {
  const [currentSection, setCurrentSection] = useState(0);
  const { showLoading, hideLoading } = useLoadingIndicator(0);

  useEffect(() => {
    showLoading();
  }, [showLoading]);

  return (
    <>
      <PHeader selected={currentSection} />
      <PBody setCurrentSection={setCurrentSection} />
      <PFooter />
    </>
  );
}

export default MainScreen;
