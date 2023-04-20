import React, { useEffect, useState } from "react";
import SectionProps from "./SectionProps";

const RecordsSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    /** Loading 동작 Mocking 코드 */
    const [count, setCount] = useState(0);
    useEffect(() => {
      const counter = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(counter);
            return 100;
          }
          return prev + 1;
        });
      }, 1);
      return () => {
        clearInterval(counter);
      };
    }, []);
    useEffect(() => {
      updateLoadingProgress(count, 1);
    }, [count, updateLoadingProgress]);
    ////////////////////////////////////////

    return (
      <section id="records-section" ref={ref} className={`h-recommended`}>
        <h2>Records</h2>
      </section>
    );
  }
);

export default RecordsSection;
