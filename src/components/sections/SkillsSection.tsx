import { useEffect } from "react";
import SectionProps from "./SectionProps";

function SkillsSection({ updateLoadingProgress }: SectionProps) {
  useEffect(() => {
    updateLoadingProgress(100, 2);
  }, [updateLoadingProgress]);

  return (
    <section
      id="skills-section"
      className="relative h-recommended overflow-hidden bg-green-500"
    >
      <h1 className="absolute bottom-10 right-16 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] text-white">
        Skills
      </h1>
    </section>
  );
}

export default SkillsSection;
