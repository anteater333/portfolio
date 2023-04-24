import React, { useEffect } from "react";
import SectionProps from "./SectionProps";

const SkillsSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    useEffect(() => {
      updateLoadingProgress(100, 2);
    }, [updateLoadingProgress]);

    return (
      <section id="skills-section" ref={ref} className={`h-recommended`}>
        <h2>Skills</h2>
      </section>
    );
  }
);

export default SkillsSection;
