import { useCallback } from "react";

function PHeader() {
  const scrollToSection = useCallback(
    /**
     * @param {Event} event
     */
    (event) => {
      event.preventDefault();
      const section = document.querySelector(
        `#${event.target.href.split("#")[1]}`
      );

      section.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <header id="site-header">
      <nav id="site-nav-bar">
        <a onClick={scrollToSection} href="#section-1">
          Profile
        </a>
        <a onClick={scrollToSection} href="#section-2">
          Records
        </a>
        <a onClick={scrollToSection} href="#section-3">
          Skills
        </a>
        <a onClick={scrollToSection} href="#section-4">
          Projects
        </a>
        <a onClick={scrollToSection} href="#section-5">
          Contacts
        </a>
      </nav>
    </header>
  );
}

export default PHeader;
