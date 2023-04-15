import React from "react";
import SectionProps from "./SectionProps";

const WorksSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section id="works-section" ref={ref} className={`h-recommended`}>
        <h2>Works</h2>
      </section>
    );
  }
);

export default WorksSection;
