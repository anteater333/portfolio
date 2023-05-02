import { useEffect, useState } from "react";
import SectionProps from "./SectionProps";

import rightArrow from "../../resources/images/skills/img_s3_00_arrow_button_right.svg";
import leftArrow from "../../resources/images/skills/img_s3_01_arrow_button_left.svg";

const bgBannerTextArray = [
  [
    "MONGO",
    "PYTHON",
    "DOCKER",
    "HTML",
    "SQL",
    "CSS",
    "JS/TS",
    "NODE",
    "GIT",
    "LINUX",
  ],
  [
    "DOCKER",
    "SQL",
    "GIT",
    "PYTHON",
    "NODE",
    "LINUX",
    "CSS",
    "HTML",
    "JS/TS",
    "MONGO",
  ],
  [
    "LINUX",
    "HTML",
    "GIT",
    "SQL",
    "PYTHON",
    "JS/TS",
    "MONGO",
    "CSS",
    "NODE",
    "DOCKER",
  ],
  [
    "SQL",
    "LINUX",
    "JS/TS",
    "GIT",
    "MONGO",
    "PYTHON",
    "HTML",
    "CSS",
    "DOCKER",
    "NODE",
  ],
  [
    "DOCKER",
    "LINUX",
    "GIT",
    "HTML",
    "MONGO",
    "JS/TS",
    "NODE",
    "PYTHON",
    "SQL",
    "CSS",
  ],
  [
    "PYTHON",
    "DOCKER",
    "SQL",
    "LINUX",
    "MONGO",
    "CSS",
    "JS/TS",
    "GIT",
    "NODE",
    "HTML",
  ],
  [
    "NODE",
    "PYTHON",
    "HTML",
    "JS/TS",
    "DOCKER",
    "GIT",
    "LINUX",
    "CSS",
    "MONGO",
    "SQL",
  ],
];

const skillsArray = [
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
  { tmp: 1 },
];

function SkillsSection({ updateLoadingProgress }: SectionProps) {
  useEffect(() => {
    updateLoadingProgress(100, 2);
  }, [updateLoadingProgress]);

  const [selectedItem, setSelectedItem] = useState(-1);

  return (
    <section
      id="skills-section"
      className="relative h-recommended snap-center overflow-hidden bg-green-500"
    >
      {/* 배경 화면 */}
      <div
        id="skills-background-banner"
        className="absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center gap-8"
      >
        {bgBannerTextArray.map((line, i) => {
          const isOdd = i % 2 === 1;
          return (
            <div
              key={`skill-bg-${i}`}
              className="relative  h-32 select-none font-galmuri7 text-9xl font-bold text-white opacity-10"
            >
              <div
                className="absolute flex"
                style={{
                  left: isOdd ? "0px" : "-4128px",
                }}
              >
                <div
                  className="flex gap-16 px-8 "
                  style={{
                    animation: `${
                      isOdd ? "bannermove-main" : "bannermove-sub"
                    } 240s linear infinite`,
                  }}
                >
                  {line.map((text, j) => {
                    return <span key={`skill-bg-${i}-${j}-0`}>{text}</span>;
                  })}
                </div>
                <div
                  className="flex gap-16 px-8"
                  style={{
                    animation: `${
                      isOdd ? "bannermove-main" : "bannermove-sub"
                    } 240s linear infinite`,
                  }}
                >
                  {line.map((text, j) => {
                    return <span key={`skill-bg-${i}-${j}-1`}>{text}</span>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="absolute bottom-10 right-16 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] text-white">
        {"Skills"}
      </h1>
      <div id="skills-content-area" className="absolute h-full w-full">
        {selectedItem < 0 ? (
          /* 1. 아이템 선택 이전 화면 */
          <div className="flex h-full items-center gap-80 overflow-y-scroll pb-20">
            <button className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white">
              1
            </button>
            <button
              className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white"
              onClick={() => setSelectedItem(1)}
            >
              2
            </button>
            <button className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white">
              3
            </button>
          </div>
        ) : (
          /* 2. 아이템 선택 후 화면 */
          <div className="flex h-full items-center justify-between px-12 pb-20">
            <img
              className="cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
              draggable="false"
              src={leftArrow}
              alt="left-arrow"
            />
            <div className="flex flex-1 px-12">
              <button
                className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white"
                onClick={() => setSelectedItem(-1)}
              >
                selected
              </button>
              <ul className="ml-16 flex flex-col justify-around gap-8 py-8 text-6xl font-bold text-white drop-shadow-lg">
                <li> - 다수의 개인 프로젝트에 적용</li>
                <li> - 다수의 개인 프로젝트에 적용</li>
                <li> - 다수의 개인 프로젝트에 적용</li>
                <li> - 다수의 개인 프로젝트에 적용</li>
              </ul>
            </div>
            <img
              className="cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
              draggable="false"
              src={rightArrow}
              alt="right-arrow"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
