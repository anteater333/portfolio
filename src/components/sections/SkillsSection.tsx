import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import rightArrow from "../../resources/images/skills/img_s3_00_arrow_button_right.svg";
import leftArrow from "../../resources/images/skills/img_s3_01_arrow_button_left.svg";

import useIntersection from "../../hooks/useIntersection";
import throttle from "../../utils/throttle";

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

const skillsArray: {
  title: string;
  description: string[];
}[] = [
  { title: "Node", description: [] },
  { title: "Deno", description: [] },
  { title: "Database", description: [] },
  { title: "Javascript", description: [] },
  { title: "React", description: [] },
  { title: "Vue", description: [] },
  { title: "HTML/CSS", description: [] },
  { title: "Python", description: [] },
  { title: "IT Infra/Linux", description: [] },
  { title: "서비스 기획", description: [] },
];

/** 내부적으로 Skills는 3 영역으로 구분됨 */
const skillListSectionPos = [2, 6];

function SkillsSection({ updateLoadingProgress }: SectionProps) {
  /** Intersection Observer 사용 */
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const sideScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    updateLoadingProgress(100, 2);
  }, [updateLoadingProgress]);

  const [selectedItem, setSelectedItem] = useState(-1);

  const [isToLeft, setIsToLeft] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  /** 자동 스크롤, 사용자 조작에 반응해야 해서 animation이 아닌 scroll을 직접 건드림 */
  useEffect(() => {
    if (selectedItem < 0 && isVisible) {
      const target = sideScrollRef.current;
      const intervalId = setInterval(() => {
        if (!isUserScrolling && target) {
          if (isToLeft) {
            // 왼쪽으로 자동 스크롤
            target.scrollTo(target.scrollLeft - 2, 0);
            if (target.scrollLeft === 0) {
              // 방향 전환
              setIsToLeft(false);
            }
          } else {
            // 오른쪽으로  자동 스크롤
            target.scrollTo(target.scrollLeft + 2, 0);
            if (
              target.clientWidth ===
              target.scrollWidth - Math.floor(target.scrollLeft)
            ) {
              // 방향 전환
              setIsToLeft(true);
            }
          }
        }
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [isToLeft, isUserScrolling, isVisible, selectedItem]);

  /** Drag & Drop Scrolling */
  useEffect(() => {
    const target = sideScrollRef.current;
    let pos = { left: 0, x: 0 };
    /** - 마우스 이동하기 */
    const dragMouseMoveHandler = (event: MouseEvent) => {
      const dx = event.clientX - pos.x;
      target!.scrollLeft = pos.left - dx;
      setIsToLeft(dx > 0);
    };

    /** - 마우스 버튼 떼기 */
    const dragMouseUpHandler = () => {
      setIsUserScrolling(false);

      target?.removeEventListener("mousemove", dragMouseMoveHandler);
      target?.removeEventListener("mouseup", dragMouseUpHandler);
    };

    /** - 마우스 버튼 누르기 */
    const dragMouseDownHandler = (event: MouseEvent) => {
      setIsUserScrolling(true);

      // 현재 위치 계산
      pos = {
        left: target!.scrollLeft,
        x: event.clientX,
      };

      target?.addEventListener("mousemove", dragMouseMoveHandler);
      target?.addEventListener("mouseup", dragMouseUpHandler);
    };

    target?.addEventListener("mousedown", dragMouseDownHandler);

    return () => {
      target?.removeEventListener("mousedown", dragMouseDownHandler);
    };
  }, []);

  const [isFading, setIsFading] = useState(false);
  /** Skill 아이템 클릭 시 행동 */
  const skillItemClickHandler = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      selected: number
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setIsFading(true);
      setIsUserScrolling(true);
      setTimeout(() => {
        setSelectedItem(selected);
        setIsFading(false);
        setIsUserScrolling(false);
      }, 500);
    },
    []
  );
  const returnToList = useCallback(() => {
    setIsFading(true);
    setIsUserScrolling(true);
    setTimeout(() => {
      setSelectedItem(-1);
      setTimeout(() => {
        setIsFading(false);
        setIsUserScrolling(false);
      }, 150);
    }, 150);
  }, []);

  /** 이 섹션이 화면에 노출 시 행동 */
  useEffect(() => {
    if (!isVisible) {
      returnToList();
      sideScrollRef.current?.scrollTo({
        left: sideScrollRef.current?.scrollWidth / 2 - 960 * 2,
      });
    }
  }, [isVisible, returnToList]);

  const [skillListSection, setSkillListSection] = useState<0 | 1 | 2>(1);

  /** 스크롤에 따라 배경 색상 변경 */
  const changeBgColor = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      const first = skillListSectionPos[0] * 960;
      const second = skillListSectionPos[1] * 960;
      const scrollLeft = event.currentTarget.scrollLeft;
      setSkillListSection(scrollLeft < first ? 0 : scrollLeft < second ? 1 : 2);
    },
    []
  );
  useEffect(() => {
    if (selectedItem >= 0) {
      setSkillListSection(
        selectedItem <= skillListSectionPos[0]
          ? 0
          : selectedItem <= skillListSectionPos[1]
          ? 1
          : 2
      );
    }
  }, [selectedItem]);

  return (
    <section
      id="skills-section"
      className={`${"relative h-recommended snap-center overflow-hidden transition-colors duration-1000"} ${
        skillListSection === 0
          ? "bg-blue-500"
          : skillListSection === 1
          ? "bg-green-500"
          : "bg-indigo-500"
      }`}
      ref={ref}
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
          <div>
            <div
              id="skills-items-list"
              className="mb-10 mt-16 flex cursor-grab items-center gap-80 overflow-y-scroll px-40 pb-10 pt-16 transition-all duration-500 active:cursor-none"
              style={{
                opacity: isFading ? "0" : "100",
                transform: isFading ? "translateY(100%)" : "translateY(0%)",
              }}
              ref={sideScrollRef}
              onScroll={throttle(changeBgColor, 1000)}
            >
              {skillsArray.map((skill, i) => {
                return (
                  <button
                    key={`skill-button-${i}`}
                    className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white"
                    onClick={(event) => skillItemClickHandler(event, i)}
                  >
                    {`${skillsArray[i].title}`}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 2. 아이템 선택 후 화면 */
          <div className="flex h-full flex-col">
            <div
              className="mt-32 flex cursor-default items-center justify-between px-12 pb-10 opacity-100 transition-opacity"
              style={{
                opacity: isFading ? "0" : "100",
              }}
            >
              <img
                className="w-14 cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
                draggable="false"
                src={leftArrow}
                alt="left-arrow"
              />
              <div className="flex flex-1 px-12">
                <button
                  className="custom-skill-button h-[40rem] w-[40rem] flex-shrink-0 rounded-[4rem] bg-white"
                  onClick={returnToList}
                >
                  {skillsArray[selectedItem].title}
                </button>
                <ul className="ml-16 flex flex-col justify-around gap-8 py-8 text-6xl font-bold text-white drop-shadow-lg">
                  <li> - 다수의 개인 프로젝트에 적용</li>
                  <li> - 다수의 개인 프로젝트에 적용</li>
                  <li> - 다수의 개인 프로젝트에 적용</li>
                  <li> - 다수의 개인 프로젝트에 적용</li>
                </ul>
              </div>
              <img
                className="w-14 cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
                draggable="false"
                src={rightArrow}
                alt="right-arrow"
              />
            </div>
            <div className="h-full" onClick={returnToList} />
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
