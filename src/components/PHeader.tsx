import React, { useCallback, useRef, useState } from "react";
import { useCurrentSection } from "../hooks/useCurrentSection";

function PHeader() {
  const [currentSection, setCurrentSection] = useCurrentSection();

  const [showHeader, setShowHeader] = useState(false);

  const headerRef = useRef(null);

  const scrollToSection = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      event.preventDefault();
      const sectionId = `#${
        (event.target as HTMLAnchorElement).href.split("#")[1]
      }`;

      setCurrentSection(index);

      window.history.pushState({}, "", sectionId);
    },
    [setCurrentSection]
  );

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={`fixed z-40 w-recommended overflow-hidden bg-white bg-opacity-80 px-16 pt-2 transition-all ${
        showHeader || (currentSection !== 0 && currentSection !== 4)
          ? "opacity-100"
          : "opacity-0"
      }`}
      onMouseEnter={() => setShowHeader(true)}
      onMouseLeave={() => setShowHeader(false)}
    >
      <nav
        id="site-nav-bar"
        className="flex justify-evenly text-2xl [&>a]:flex [&>a]:h-16 [&>a]:w-48 [&>a]:items-center [&>a]:justify-center [&>a]:border-b-4 [&>a]:border-b-black/0"
      >
        <a
          className={`transition-all ${
            currentSection === 0 && showHeader ? "!border-b-black" : ""
          }`}
          onClick={(event) => scrollToSection(event, 0)}
          href="#profile-section"
        >
          Profile
        </a>
        <a
          className={`transition-all ${
            currentSection === 1 ? "!border-b-blue-500 !text-blue-500" : ""
          }`}
          onClick={(event) => scrollToSection(event, 1)}
          href="#records-section"
        >
          Records
        </a>
        <a
          className={`transition-all ${
            currentSection === 2 ? "!border-b-green-500 !text-green-500" : ""
          }`}
          onClick={(event) => scrollToSection(event, 2)}
          href="#skills-section"
        >
          Skills
        </a>
        <a
          className={`transition-all ${
            currentSection === 3 ? "!border-b-indigo-500 !text-indigo-500" : ""
          }`}
          onClick={(event) => scrollToSection(event, 3)}
          href="#works-section"
        >
          Works
        </a>
        <a
          className={`transition-all ${
            currentSection === 4 ? "!border-b-black" : ""
          }`}
          onClick={(event) => scrollToSection(event, 4)}
          href="#contacts-section"
        >
          Contacts
        </a>
      </nav>
    </header>
  );
}

export default PHeader;
