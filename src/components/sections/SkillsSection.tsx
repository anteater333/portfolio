import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import useIntersection from "../../hooks/useIntersection";
import throttle from "../../utils/throttle";

import rightArrow from "../../resources/images/skills/img_s3_00_arrow_button_right.svg";
import leftArrow from "../../resources/images/skills/img_s3_01_arrow_button_left.svg";

import imgSkill00 from "../../resources/images/skills/img_s3_02_skill_node.png";
import imgSkill01 from "../../resources/images/skills/img_s3_03_skill_deno.png";
import imgSkill02 from "../../resources/images/skills/img_s3_04_skill_db.png";
import imgSkill03 from "../../resources/images/skills/img_s3_05_skill_js.png";
import imgSkill04 from "../../resources/images/skills/img_s3_06_skill_react.png";
import imgSkill05 from "../../resources/images/skills/img_s3_07_skill_vue.png";
import imgSkill06 from "../../resources/images/skills/img_s3_08_skill_html_css.png";
import imgSkill07 from "../../resources/images/skills/img_s3_09_skill_python.png";
import imgSkill08 from "../../resources/images/skills/img_s3_10_skill_infra.png";
import imgSkill09 from "../../resources/images/skills/img_s3_11_skill_idea.png";
import { useImageLoader } from "../../hooks/useImageLoader";

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
  {
    title: "Node",
    description: [
      "Express, NestJS 프레임워크 사용 API 서버 개발",
      "멀티 프로세싱 구현 및 IPC 구현",
      "대규모 File IO 처리 에이전트 프로그램 개발",
    ],
  },
  {
    title: "Deno",
    description: [
      "개인 프로젝트 용도 메일 인증 서버 프로그램 개발",
      "크롤링 프로그램 개발",
      "소규모 토이 프로젝트에 적용",
    ],
  },
  {
    title: "Database",
    description: [
      "MongoDB 사용 경험 다수",
      "구축된 RDBMS에 대한 SQL 질의 사용 가능",
    ],
  },
  {
    title: "Javascript",
    description: [
      "주력 프로그래밍 언어",
      "Node.js, Deno, Web Browser 등 다양한 실행 환경에서 사용 가능",
      "React, Vue, NestJS 등 다수의 프레임워크 사용 경험",
      "Typescript 사용",
    ],
  },
  {
    title: "React",
    description: [
      "다수의 개인 프로젝트에 사용",
      "포트폴리오 사이트 제작",
      "React Native 사용 경험",
      "Next.js 적용 프로젝트 진행 중",
    ],
  },
  {
    title: "Vue",
    description: [
      "개인 프로젝트 및 팀 프로젝트에 사용",
      "유지 보수 및 신규 기능 개발 경력",
      "차트 라이브러리 ApexChart.js 적용 경험",
    ],
  },
  {
    title: "HTML/CSS",
    description: [
      "Jekyll 정적 사이트 생성기 사용 개인 블로그 운영 및 개발",
      "HTML/CSS 코드 작성 및 분석 가능",
      "Tailwind CSS 사용 경험",
    ],
  },
  {
    title: "Python",
    description: [
      "Pandas, numpy 활용 정형 데이터 분석 에이전트 개발",
      "업무 자동화 스크립트 작성",
      "Flask API 서버 개발 경험",
    ],
  },
  {
    title: "IT Infra/Linux",
    description: [
      "AWS, GCP 등 클라우드 인스턴스 사용 경험",
      "Firebase 활용 백엔드 구축 경험",
      "WSL 및 Docker 사용 개발 환경 구축 가능",
    ],
  },
  {
    title: "서비스 기획",
    description: [
      "Notion 및 Markdown 문법 활용 문서 작성",
      "Figma 활용 제품 프로토타이핑",
    ],
  },
];

/** 내부적으로 Skills는 3 영역으로 구분됨 */
const skillListSectionPos = [2, 6];

function SkillsSection({ updateLoadingProgress }: SectionProps) {
  const ImgSkill00 = useImageLoader(imgSkill00);
  const ImgSkill01 = useImageLoader(imgSkill01);
  const ImgSkill02 = useImageLoader(imgSkill02);
  const ImgSkill03 = useImageLoader(imgSkill03);
  const ImgSkill04 = useImageLoader(imgSkill04);
  const ImgSkill05 = useImageLoader(imgSkill05);
  const ImgSkill06 = useImageLoader(imgSkill06);
  const ImgSkill07 = useImageLoader(imgSkill07);
  const ImgSkill08 = useImageLoader(imgSkill08);
  const ImgSkill09 = useImageLoader(imgSkill09);

  /** 이미지 배열 */
  const SkillImageByIndex = useCallback(
    (index: number) => {
      const SkillImages = [
        ImgSkill00.ImageComponent,
        ImgSkill01.ImageComponent,
        ImgSkill02.ImageComponent,
        ImgSkill03.ImageComponent,
        ImgSkill04.ImageComponent,
        ImgSkill05.ImageComponent,
        ImgSkill06.ImageComponent,
        ImgSkill07.ImageComponent,
        ImgSkill08.ImageComponent,
        ImgSkill09.ImageComponent,
      ];

      const Selected = SkillImages[index];

      return <Selected draggable="false" alt={skillsArray[index].title} />;
    },
    [
      ImgSkill00.ImageComponent,
      ImgSkill01.ImageComponent,
      ImgSkill02.ImageComponent,
      ImgSkill03.ImageComponent,
      ImgSkill04.ImageComponent,
      ImgSkill05.ImageComponent,
      ImgSkill06.ImageComponent,
      ImgSkill07.ImageComponent,
      ImgSkill08.ImageComponent,
      ImgSkill09.ImageComponent,
    ]
  );

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    const total =
      ImgSkill00.progress +
      ImgSkill01.progress +
      ImgSkill02.progress +
      ImgSkill03.progress +
      ImgSkill04.progress +
      ImgSkill05.progress +
      ImgSkill06.progress +
      ImgSkill07.progress +
      ImgSkill08.progress +
      ImgSkill09.progress;
    const length = 10;
    updateLoadingProgress(total / length, 2);
  }, [
    ImgSkill00.progress,
    ImgSkill01.progress,
    ImgSkill02.progress,
    ImgSkill03.progress,
    ImgSkill04.progress,
    ImgSkill05.progress,
    ImgSkill06.progress,
    ImgSkill07.progress,
    ImgSkill08.progress,
    ImgSkill09.progress,
    updateLoadingProgress,
  ]);

  /** Intersection Observer 사용 */
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const sideScrollRef = useRef<HTMLDivElement | null>(null);

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
        className={`${"absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center gap-8"} ${
          selectedItem < 0 ? "blur-[2px]" : "blur-sm"
        }`}
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

      <div
        id="skills-background-overlay"
        className="absolute h-full w-full bg-black transition-opacity duration-1000"
        style={{
          opacity: !isFading && selectedItem < 0 ? "0" : "50%",
        }}
      />

      <h1 className="absolute bottom-10 right-16 z-50 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] text-white">
        <a
          href="https://blog.anteater-lab.link"
          target="_blank"
          rel="noreferrer"
        >
          {"Skills"}
        </a>
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
                    className="custom-skill-button flex h-[40rem] w-[40rem] flex-shrink-0 items-center justify-center rounded-[4rem] bg-white"
                    onClick={(event) => skillItemClickHandler(event, i)}
                  >
                    {SkillImageByIndex(i)}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 2. 아이템 선택 후 화면 */
          <div className="flex h-full flex-col">
            <div
              className="mt-32 flex items-center justify-between px-12 pb-10 opacity-100 transition-opacity"
              style={{
                opacity: isFading ? "0" : "100",
              }}
            >
              <img
                className="w-14 cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
                draggable="false"
                src={leftArrow}
                alt="left-arrow"
                onClick={() => {
                  setSelectedItem(
                    (prev) =>
                      (prev - 1 + skillsArray.length) % skillsArray.length
                  );
                }}
              />
              <div className="flex flex-1 px-12">
                <button
                  className="custom-skill-button flex h-[40rem] w-[40rem] flex-shrink-0 items-center justify-center rounded-[4rem] bg-white"
                  onClick={returnToList}
                >
                  {SkillImageByIndex(selectedItem)}
                </button>
                <ul className="ml-32 flex flex-col justify-evenly gap-8 pb-8 text-6xl font-bold text-white drop-shadow-lg">
                  {skillsArray[selectedItem].description.map((desc, index) => {
                    return (
                      <li
                        className="list-disc break-keep leading-tight"
                        key={`skills-description-list-${index}`}
                      >
                        {desc}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <img
                className="w-14 cursor-pointer opacity-70 hover:opacity-100 active:opacity-30"
                draggable="false"
                src={rightArrow}
                alt="right-arrow"
                onClick={() => {
                  setSelectedItem((prev) => (prev + 1) % skillsArray.length);
                }}
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
