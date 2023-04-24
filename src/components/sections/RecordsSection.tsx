import React, { useEffect } from "react";
import SectionProps from "./SectionProps";

const RecordsSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    useEffect(() => {
      updateLoadingProgress(100, 1);
    }, [updateLoadingProgress]);

    return (
      <section
        id="records-section"
        ref={ref}
        className="relative h-recommended overflow-hidden"
      >
        <h1 className="absolute right-16 top-10 border-b-[1rem] border-b-blue-500 text-10xl font-bold leading-[10rem] text-blue-500">
          Records
        </h1>
      </section>
    );
  }
);

export default RecordsSection;
