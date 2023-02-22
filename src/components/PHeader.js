import { useCallback, useState } from "react";

/**
 *
 * @param {{selected: number}} props
 * @returns
 */
function PHeader({ selected = 0 }) {
  const scrollToSection = useCallback(
    /**
     * @param {Event} event
     */
    (event) => {
      event.preventDefault();
      console.log(event.target);
      const sectionId = `#${event.target.href.split("#")[1]}`;
      const section = document.querySelector(sectionId);

      section.scrollIntoView({ behavior: "smooth" });

      window.history.pushState({}, null, sectionId);
    },
    []
  );

  return (
    <header
      id="site-header"
      className="sticky top-0 bg-white bg-opacity-80 px-16 pt-2"
    >
      <nav
        id="site-nav-bar"
        className="flex justify-center text-2xl [&>a]:flex [&>a]:h-16 [&>a]:w-48 [&>a]:items-center [&>a]:justify-center [&>a]:border-b-4 [&>a]:border-b-black/0"
      >
        <a
          className={selected === 0 ? "!border-b-black" : ""}
          onClick={scrollToSection}
          href="#profile"
        >
          Profile
        </a>
        <a
          className={selected === 1 ? "!border-b-black" : ""}
          onClick={scrollToSection}
          href="#history"
        >
          Records
        </a>
        <a
          className={selected === 2 ? "!border-b-black" : ""}
          onClick={scrollToSection}
          href="#skills"
        >
          Skills
        </a>
        <a
          className={selected === 3 ? "!border-b-black" : ""}
          onClick={scrollToSection}
          href="#projects"
        >
          Projects
        </a>
        <a
          className={selected === 4 ? "!border-b-black" : ""}
          onClick={scrollToSection}
          href="#contacts"
        >
          <span>Contacts</span>
        </a>
      </nav>
    </header>
  );
}

export default PHeader;
