import React, { useCallback, useRef, useState } from "react";

function PHeader({ selected = 0 }: { selected: number }) {
  const [showHeader, setShowHeader] = useState(false);

  const headerRef = useRef(null);

  const scrollToSection = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const sectionId = `#${
        (event.target as HTMLAnchorElement).href.split("#")[1]
      }`;
      const section = document.querySelector(sectionId);

      section!.scrollIntoView({ behavior: "smooth" });

      window.history.pushState({}, "", sectionId);
    },
    []
  );

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={`fixed z-40 w-full overflow-hidden bg-sky-50 bg-opacity-80 px-16 pt-2 transition-all ${
        showHeader || selected !== 0 ? "top-0" : "-top-8 opacity-0"
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
            selected === 0 && showHeader ? "!border-b-black" : ""
          }`}
          onClick={scrollToSection}
          href="#profile-section"
        >
          Profile
        </a>
        <a
          className={`transition-all ${
            selected === 1 ? "!border-b-black" : ""
          }`}
          onClick={scrollToSection}
          href="#records-section"
        >
          Records
        </a>
        <a
          className={`transition-all ${
            selected === 2 ? "!border-b-black" : ""
          }`}
          onClick={scrollToSection}
          href="#skills-section"
        >
          Skills
        </a>
        <a
          className={`transition-all ${
            selected === 3 ? "!border-b-black" : ""
          }`}
          onClick={scrollToSection}
          href="#works-section"
        >
          Works
        </a>
        <a
          className={`transition-all ${
            selected === 4 ? "!border-b-black" : ""
          }`}
          onClick={scrollToSection}
          href="#contacts-section"
        >
          Contacts
        </a>
      </nav>
    </header>
  );
}

export default PHeader;
