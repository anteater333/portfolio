import React, { useEffect } from "react";
import SectionProps from "./SectionProps";

const RecordsSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    useEffect(() => {
      updateLoadingProgress(100, 1);
    }, [updateLoadingProgress]);

    return (
      <section id="records-section" ref={ref} className={`h-recommended`}>
        <h2>Records</h2>
      </section>
    );
  }
);

export default RecordsSection;
