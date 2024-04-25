import { useCallback, useEffect, useRef, useState } from "react";
import PBody from "../components/PBody";
import PFooter from "../components/PFooter";
import PHeader from "../components/PHeader";
import throttle from "../utils/throttle";
import { useCurrentSection } from "../hooks/useCurrentSection";

function MainScreen() {
  const mainScreenRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useCurrentSection();
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

      setCurrentSection(nextSection);
      setIsScrolling(true);
    },
    [currentSection, isScrolling, setCurrentSection]
  );

  /** Section에 맞게 현재 위치를 조정 */
  useEffect(() => {
    // NOTE : Safari 브라우저의 경우 smooth scroll이 제대로 동작하지 않음.
    // 관련 polyfill 사용 중이나 완벽하진 않은 탓에 메인 스크린의 스크롤에선 브라우저 종류 파악 후 스크롤 모드 설정
    const agent = window.navigator.userAgent.toLowerCase();
    const isSafari =
      agent.indexOf("safari") !== -1 && agent.indexOf("chrome") === -1;
    mainScreenRef.current?.scrollTo({
      top: currentSection * 1000,
      behavior: isSafari ? "auto" : "smooth",
    });
  }, [currentSection]);

  /** 스크롤에 의한 화면 전환이 중복해서 발동되는 것을 방지 */
  useEffect(() => {
    if (isScrolling) setTimeout(() => setIsScrolling(false), 1000);
  }, [isScrolling]);

  /** MainScreen 마운트 시 URL을 파싱해 URL에 ID가 포함된 섹션의 위치로 자동 스크롤 */
  useEffect(() => {
    const urlSection = window.location.href.split("#")[1];

    switch (urlSection) {
      case "profile-section":
        setCurrentSection(0);
        break;
      case "records-section":
        setCurrentSection(1);
        break;
      case "skills-section":
        setCurrentSection(2);
        break;
      case "works-section":
        setCurrentSection(3);
        break;
      case "contacts-section":
        setCurrentSection(4);
        break;
    }
  }, [setCurrentSection]);

  return (
    <>
      <div
        id="app-main-screen"
        className="relative h-recommended w-recommended snap-y snap-mandatory overflow-hidden overscroll-y-none"
        onWheel={throttle(changeSectionByScroll, 250)}
        ref={mainScreenRef}
      >
        <PHeader />
        <PBody />
      </div>
      <PFooter />
    </>
  );
}

export default MainScreen;
