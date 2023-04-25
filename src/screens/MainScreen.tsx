import React, { useCallback, useState } from "react";
import PBody from "../components/PBody";
import PFooter from "../components/PFooter";
import PHeader from "../components/PHeader";
import throttle from "../utils/throttle";

function MainScreen() {
  const [currentSection, setCurrentSection] = useState(0);

  let lastScroll = 0;

  /** 현재 스크롤 위치에 따라 현재 섹션을 계산 */
  const selectCurrentSectionByScroll = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      const scroll = event.currentTarget.scrollTop;

      let sectionIndex = Math.floor((scroll + 100) / 1000);

      console.log(lastScroll - scroll < 0 ? "down" : "up"); // TMP, 기능 가능성 증명

      setCurrentSection(sectionIndex > 0 ? sectionIndex : 0);
      lastScroll = scroll;
    },
    []
  );

  return (
    <>
      <div
        id="app-main-screen"
        className="relative h-recommended w-recommended overflow-scroll"
        onScroll={throttle(selectCurrentSectionByScroll, 10)}
      >
        <PHeader selected={currentSection} />
        <PBody />
      </div>
      <PFooter />
    </>
  );
}

export default MainScreen;
