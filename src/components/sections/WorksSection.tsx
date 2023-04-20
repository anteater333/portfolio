import React, { useEffect } from "react";
import SectionProps from "./SectionProps";

const WorksSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    useEffect(() => {
      updateLoadingProgress(100, 3);
    }, [updateLoadingProgress]);

    return (
      <section id="works-section" ref={ref} className={`h-recommended`}>
        <h2>Works</h2>
      </section>
    );
  }
);

export default WorksSection;
