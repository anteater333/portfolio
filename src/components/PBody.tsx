import React, { useCallback, useEffect, useRef } from "react";
import throttle from "../utils/throttle";

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
    <div className="bg-white">
      <section
        ref={(el: HTMLElement) => (sectionRefs.current![0] = el)}
        id="profile"
        style={{ height: 1024 }}
      >
        <h2>Profile</h2>
      </section>
      <section
        ref={(el: HTMLElement) => (sectionRefs.current![1] = el)}
        id="records"
        style={{ height: 1024 }}
      >
        <h2>Records</h2>
      </section>
      <section
        ref={(el: HTMLElement) => (sectionRefs.current![2] = el)}
        id="skills"
        style={{ height: 1024 }}
      >
        <h2>Skills</h2>
      </section>
      <section
        ref={(el: HTMLElement) => (sectionRefs.current![3] = el)}
        id="projects"
        style={{ height: 1024 }}
      >
        <h2>Projects</h2>
      </section>
      <section
        ref={(el: HTMLElement) => (sectionRefs.current![4] = el)}
        id="contacts"
        style={{ height: 1024 }}
      >
        <h2>Contacts</h2>
      </section>
    </div>
  );
}

export default PBody;
