import React, { useCallback, useEffect, useRef } from "react";
import throttle from "../utils/throttle";
import ProfileSection from "./sections/ProfileSection";
import RecordsSection from "./sections/RecordsSection";
import SkillsSection from "./sections/SkillsSection";
import WorksSection from "./sections/WorksSection";
import ContactsSection from "./sections/ContactSection";

function PBody({
  setCurrentSection,
}: {
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}) {
  const sectionRefs = useRef<HTMLElement[] | null>([]);

  const handleScroll = useCallback(
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

  useEffect(() => {
    const throttledFunc = throttle(handleScroll, 50);
    window.addEventListener("scroll", throttledFunc);

    return () => {
      window.removeEventListener("scroll", throttledFunc);
    };
  }, [handleScroll]);

  return (
    <main className={`w-recommended bg-white`}>
      <ProfileSection
        ref={(el: HTMLElement) => (sectionRefs.current![0] = el)}
      />
      <RecordsSection
        ref={(el: HTMLElement) => (sectionRefs.current![1] = el)}
      />
      <SkillsSection
        ref={(el: HTMLElement) => (sectionRefs.current![2] = el)}
      />
      <WorksSection ref={(el: HTMLElement) => (sectionRefs.current![3] = el)} />
      <ContactsSection
        ref={(el: HTMLElement) => (sectionRefs.current![4] = el)}
      />
    </main>
  );
}

export default PBody;
