import { useEffect } from "react";
import SectionProps from "./SectionProps";

function WorksSection({ updateLoadingProgress }: SectionProps) {
  useEffect(() => {
    updateLoadingProgress(100, 3);
  }, [updateLoadingProgress]);

  return (
    <section
      id="works-section"
      className="relative h-recommended overflow-hidden bg-slate-900" // 배경색상 임시
    >
      <div className="absolute bottom-10 left-16 rounded-3xl bg-white bg-opacity-80 p-5">
        <h1 className="border-b-[1rem] border-b-indigo-500 text-10xl font-bold leading-[10rem] text-indigo-500">
          Works
        </h1>
      </div>
    </section>
  );
}
export default WorksSection;
