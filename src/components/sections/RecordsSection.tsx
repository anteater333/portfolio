import React from "react";
import SectionProps from "./SectionProps";

const RecordsSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section id="records-section" ref={ref} className={`h-recommended`}>
        <h2>Records</h2>
      </section>
    );
  }
);

export default RecordsSection;
