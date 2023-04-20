import React, { useCallback, useEffect, useRef, useState } from "react";
import throttle from "../utils/throttle";
import ProfileSection from "./sections/ProfileSection";
import RecordsSection from "./sections/RecordsSection";
import SkillsSection from "./sections/SkillsSection";
import WorksSection from "./sections/WorksSection";
import ContactsSection from "./sections/ContactSection";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";

function PBody({
  setCurrentSection,
}: {
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}) {
  const sectionRefs = useRef<HTMLElement[] | null>([]);
  const { hideLoading, setPercentage, showLoading } = useLoadingIndicator(0);

  const [sectionProgressList, setSectionProgressList] = useState<number[]>(
    Array(5).fill(0)
  );

  /**
   *  페이지 최초 로딩 시 로딩화면 표시
   */
  useEffect(() => {
    window.scrollTo(0, 0);
    showLoading();
  }, [showLoading]);

  /** 각 섹션 로딩 진행률에 따라 전체 진행률 계산해 로딩 컴포넌트에 반영 */
  useEffect(() => {
    const totalProgress =
      (100 * sectionProgressList.reduce((pv, cv) => pv + cv, 0)) / 500;

    setPercentage(totalProgress);

    if (totalProgress >= 100) {
      hideLoading();
    }
  }, [hideLoading, sectionProgressList, setPercentage]);

  /** 각 섹션별 진행률을 부모 컴포넌트로 전달하는 이벤트 핸들러 */
  const updateSectionProgress = useCallback(
    (progress: number, sectionIndex: number) => {
      setSectionProgressList((prev) => {
        const newArray = [...prev];
        newArray[sectionIndex] = progress;
        return newArray;
      });
    },
    []
  );

  /** 현재 스크롤 위치에 따라 현재 섹션을 계산 */
  const selectCurrentSectionByScroll = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      const scroll = window.scrollY;
      const sectionElements = sectionRefs.current;
      const currentSectionIndex = sectionElements?.findIndex(
        (section: HTMLElement) => {
          return (
            scroll > section.offsetTop - window.outerHeight / 3 &&
            scroll <
              section.offsetTop - window.outerHeight / 3 + section.offsetHeight
          );
        }
      );

      setCurrentSection(currentSectionIndex ? currentSectionIndex : 0);
    },
    [setCurrentSection]
  );

  /** 페이지 로드 시 스크롤 이벤트 리스너 등록 */
  useEffect(() => {
    const throttledFunc = throttle(selectCurrentSectionByScroll, 50);
    window.addEventListener("scroll", throttledFunc);

    return () => {
      window.removeEventListener("scroll", throttledFunc);
    };
  }, [selectCurrentSectionByScroll]);

  return (
    <main className={`w-recommended bg-white`}>
      <ProfileSection
        ref={(el: HTMLElement) => (sectionRefs.current![0] = el)}
        updateLoadingProgress={updateSectionProgress}
      />
      <RecordsSection
        ref={(el: HTMLElement) => (sectionRefs.current![1] = el)}
        updateLoadingProgress={updateSectionProgress}
      />
      <SkillsSection
        ref={(el: HTMLElement) => (sectionRefs.current![2] = el)}
        updateLoadingProgress={updateSectionProgress}
      />
      <WorksSection
        ref={(el: HTMLElement) => (sectionRefs.current![3] = el)}
        updateLoadingProgress={updateSectionProgress}
      />
      <ContactsSection
        ref={(el: HTMLElement) => (sectionRefs.current![4] = el)}
        updateLoadingProgress={updateSectionProgress}
      />
    </main>
  );
}

export default PBody;
