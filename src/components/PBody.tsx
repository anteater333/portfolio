import { useCallback, useEffect, useState } from "react";
import ProfileSection from "./sections/ProfileSection";
import RecordsSection from "./sections/RecordsSection";
import SkillsSection from "./sections/SkillsSection";
import WorksSection from "./sections/WorksSection";
import ContactsSection from "./sections/ContactSection";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";

function PBody() {
  const [isAllSectionLoaded, setIsAllSectionLoaded] = useState(false);

  const { hideLoading, setPercentage, showLoading } = useLoadingIndicator(0);

  const [sectionProgressList, setSectionProgressList] = useState<number[]>(
    Array(5).fill(0)
  );

  /**
   *  페이지 최초 로딩 시 로딩화면 표시
   */
  useEffect(() => {
    showLoading();
  }, [showLoading]);

  /** 각 섹션 로딩 진행률에 따라 전체 진행률 계산해 로딩 컴포넌트에 반영 */
  useEffect(() => {
    const totalProgress =
      (100 * sectionProgressList.reduce((pv, cv) => pv + cv, 0)) / 500;

    setPercentage(totalProgress);

    if (totalProgress >= 100) {
      hideLoading();
      setIsAllSectionLoaded(true);
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

  return (
    <main className={`flex w-full max-w-recommended flex-col`}>
      <ProfileSection
        updateLoadingProgress={updateSectionProgress}
        isAllSectionLoaded={isAllSectionLoaded}
      />
      <RecordsSection updateLoadingProgress={updateSectionProgress} />
      <SkillsSection updateLoadingProgress={updateSectionProgress} />
      <WorksSection updateLoadingProgress={updateSectionProgress} />
      <ContactsSection updateLoadingProgress={updateSectionProgress} />
    </main>
  );
}

export default PBody;
