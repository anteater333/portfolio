import React from "react";
import SectionProps from "./SectionProps";

const SkillsSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section id="skills-section" ref={ref} className={`h-recommended`}>
        <h2>Skills</h2>
      </section>
    );
  }
);

export default SkillsSection;
