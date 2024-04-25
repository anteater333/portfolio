import React, { useCallback, useEffect, useRef, useState } from "react";
import PBody from "../components/PBody";
import PFooter from "../components/PFooter";
import PHeader from "../components/PHeader";
import throttle from "../utils/throttle";

function MainScreen() {
  const mainScreenRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  /** 사용자의 스크롤 입력을 인식해 섹션 전환 */
  const changeSectionByScroll = useCallback(
    (event: WheelEvent) => {
      if (isScrolling) return;

      /** 스크롤 방향에 따라 계산한 다음 섹션 번호 (0 ~ 4) */
      let nextSection = Math.min(
        Math.max(0, currentSection + (event.deltaY > 0 ? 1 : -1)),
        4
      );

      mainScreenRef.current?.scrollTo({
        top: nextSection * 1000,
        behavior: "smooth",
      });

      setCurrentSection(nextSection);
      setIsScrolling(true);
    },
    [currentSection, isScrolling]
  );

  /** 스크롤에 의한 화면 전환이 중복해서 발동되는 것을 방지 */
  useEffect(() => {
    if (isScrolling) setTimeout(() => setIsScrolling(false), 1000);
  }, [isScrolling]);

  return (
    <>
      <div
        id="app-main-screen"
        className="relative h-recommended w-recommended snap-y snap-mandatory overflow-hidden"
        onWheel={throttle(changeSectionByScroll, 250)}
        ref={mainScreenRef}
      >
        <PHeader selected={currentSection} />
        <PBody />
      </div>
      <PFooter />
    </>
  );
}

export default MainScreen;
