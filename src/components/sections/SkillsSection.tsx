import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import useIntersection from "../../hooks/useIntersection";
import throttle from "../../utils/throttle";

import rightArrow from "../../resources/images/skills/img_s3_00_arrow_button_right.png";
import leftArrow from "../../resources/images/skills/img_s3_01_arrow_button_left.png";

import imgSkill00 from "../../resources/images/skills/img_s3_02_skill_node.png";
import imgSkill01 from "../../resources/images/skills/img_s3_03_skill_db.png";
import imgSkill02 from "../../resources/images/skills/img_s3_04_skill_html_css.png";
import imgSkill03 from "../../resources/images/skills/img_s3_05_skill_js.png";
import imgSkill04 from "../../resources/images/skills/img_s3_06_skill_react.png";
import imgSkill05 from "../../resources/images/skills/img_s3_07_skill_pm.png";
import imgSkill06 from "../../resources/images/skills/img_s3_08_skill_infra.png";
import imgSkill07 from "../../resources/images/skills/img_s3_09_skill_etc.png";
import { useImageLoader } from "../../hooks/useImageLoader";
import { useIsOnMobile } from "../../hooks/useIsOnMobile";
import { useSectionScrollable } from "../../hooks/useSectionScrollable";

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
    title: "Node.js & Back-end",
    description: [
      "Node.js 기반 웹 어플리케이션 서버 및 에이전트 프로그램 개발 경험 보유",
      "JS 기반 업무 자동화 스크립트 작성에 사용",
      "Express.js, NestJS 프레임워크 사용 경험 보유",
      "PM2 사용 경험 보유",
      "Node.js IPC 기반 멀티 프로세스 구조 설계 및 개발 경험 보유",
      "Node.js 비동기 IO 활용 에이전트 성능 향상 경험 보유",
      "Deno 기반 에이전트, 서버 개발 경험 보유",
    ],
  },
  {
    title: "Database",
    description: [
      "MongoDB 데이터베이스 설계 및 운용 경험 보유",
      "Mongoose ODM 사용 경험 보유",
      "구축된 데이터베이스에 대한 기초적인 SQL 질의문 작성 가능",
    ],
  },
  {
    title: "HTML/CSS",
    description: [
      "정적 사이트 생성기 Jekyll 블로그 운영 중\n(Liquid, SCSS 기반)",
      "CSS media query 기반 반응형 디자인 구현 경험 보유",
      "CSS flex 속성 기반 규격화된 보고서 형태의 웹 페이지 구현 경험 보유",
      "TailwindCSS 사용 경험 보유",
    ],
  },
  {
    title: "Javascript",
    description: [
      "주력 프로그래밍 언어",
      "JavaScript 기반 풀 스택 웹 서비스 개발 가능",
      "자바스크립트 비동기 처리 주제 블로그 article 작성",
      "JavaScript 관련 팁 블로그 article 다수 작성",
      "Web Browser, Node.js, Deno 다양한 JS 실행 환경 경험 보유",
      "TypeScript 적용 프로젝트 경험 보유",
    ],
  },
  {
    title: "React & Front-end",
    description: [
      "Functional Component 기반 컴포넌트 개발",
      "React 웹 어플리케이션 다수 운영 및 배포 중",
      "NPM, CRA 사용 프로젝트 진행 경험 보유",
      "yarn, vite, eslint, prettier 기반 프로젝트 환경 사용 중",
      "React Native 프로젝트 진행 경험 보유",
      "react-helmet, react-router, redux, recoil 사용 경험 보유",
      "OAuth 소셜로그인 기능 개발 경험 보유",
      "Vue.js 2.0 웹 어플리케이션 유지보수 및 신규 기능 개발 경험 보유",
      "데이터 시각화 라이브러리 ApexCharts.js 사용 경험 보유",
      "웹 성능 측정 도구 Lighthouse 사용 및 성능 개선 경험 보유",
      "URL 스키마 기반 웹 페이지의 클라이언트측 에이전트 프로그램 실행 기능 개발 경험 보유",
    ],
  },
  {
    title: "Project Management",
    description: [
      "Git 기반 프로젝트 형상 관리 경험 다수 보유",
      "개인 및 토이 프로젝트를 모두 원격 저장소 Github Public 공개 중",
      "컨벤션에 대한 이해 및 신규 프로젝트를 위한 컨벤션 계획 경험 보유",
      "Jira 및 Github Projects 활용 프로젝트 일정/이슈 관리 경험 보유",
      "프로젝트 팀장으로서 스크럼 기반 애자일 프로세스 주도 경험 보유",
    ],
  },
  {
    title: "IT Infra & DevOps",
    description: [
      "Windows/WSL 개발 환경에 대한 경험 다수 보유",
      "WSL 관련 블로그 Article 다수 작성",
      "macOS 환경 사용 가능",
      "개인 도메인 보유 중 (anteater-lab.link)",
      "Linux 기반 클라우드 인스턴스 및 Windows 홈서버 사용 다수의 서비스 운영 중",
      "백엔드 서버 프로그램, 크롤링 에이전트 프로그램, 블로그 개발 서버 등 개인 용도 Docker 컨테이너 다수 운용 중",
      "Firebase 활용 경험 보유",
    ],
  },
  {
    title: "etc.",
    description: [
      "Java(ExcelParser), C#(WinForm), Python(Numpy/Pandas, 웹 크롤링) 사용 경험 보유",
      "개인 일정 관리 및 회고를 위해 Notion 사용 중",
      "Figma 활용 개인 프로젝트 프로토타이핑 경험 보유",
      "비개발자 대상 웹 개발 주제 스터디 진행 경험 보유",
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
      ];

      const Selected = SkillImages[index];

      return (
        <Selected
          className="rounded-3xl"
          draggable="false"
          alt={skillsArray[index].title}
        />
      );
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
      ImgSkill07.progress;
    const length = 8;
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

  const { setIsSectionOnBottom, setIsSectionOnTop } = useSectionScrollable();

  const { isOnMobile } = useIsOnMobile();

  /** 자동 스크롤, 사용자 조작에 반응해야 해서 animation이 아닌 scroll을 직접 건드림 */
  useEffect(() => {
    if (selectedItem < 0 && isVisible && !isOnMobile) {
      const target = sideScrollRef.current;
      const intervalId = setInterval(() => {
        if (!isUserScrolling && target) {
          if (isToLeft) {
            // 왼쪽으로 자동 스크롤
            const before = target.scrollLeft;
            target.scrollTo(target.scrollLeft - 2, 0);
            const after = target.scrollLeft;

            if (before === after) {
              // 스크롤 재시도
              target.scrollTo(target.scrollLeft + 4, 0);
            }

            if (target.scrollLeft === 0) {
              // 방향 전환
              setIsToLeft(false);
            }
          } else {
            // 오른쪽으로  자동 스크롤
            const before = target.scrollLeft;
            target.scrollTo(target.scrollLeft + 2, 0);
            const after = target.scrollLeft;

            if (before === after) {
              // 스크롤 재시도
              target.scrollTo(target.scrollLeft + 4, 0);
            } // TBD 원인규명 및 코드 리펙토링

            if (
              target.clientWidth ===
              target.scrollWidth - Math.floor(target.scrollLeft)
            ) {
              // 방향 전환
              setIsToLeft(true);
            }
          }
        }
      }, 20);

      return () => clearInterval(intervalId);
    }
  }, [isToLeft, isUserScrolling, isVisible, selectedItem, isOnMobile]);

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

      setIsSectionOnBottom(false);
      setIsSectionOnTop(false);

      setIsFading(true);
      setIsUserScrolling(true);
      setTimeout(() => {
        setSelectedItem(selected);
        setIsFading(false);
        setIsUserScrolling(false);
      }, 500);
    },
    [setIsSectionOnBottom, setIsSectionOnTop]
  );
  const returnToList = useCallback(() => {
    setIsSectionOnBottom(true);
    setIsSectionOnTop(true);

    setIsFading(true);
    setIsUserScrolling(true);
    setTimeout(() => {
      setSelectedItem(-1);
      setTimeout(() => {
        setIsFading(false);
        setIsUserScrolling(false);
      }, 150);
    }, 150);
  }, [setIsSectionOnBottom, setIsSectionOnTop]);

  /** 이 섹션이 화면에 노출 시 행동 */
  useEffect(() => {
    if (!isVisible) {
      returnToList();
      sideScrollRef.current?.scrollTo({
        left: sideScrollRef.current?.scrollWidth / 2 - 960 * 1,
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
      className={`${"relative h-recommended snap-center snap-always overflow-hidden transition-all duration-700"} ${
        skillListSection === 0
          ? "bg-blue-500"
          : skillListSection === 1
          ? "bg-green-500"
          : "bg-indigo-500"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
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
              className="relative h-32 select-none font-galmuri7 text-9xl font-bold text-white opacity-10"
            >
              <div
                className="absolute flex whitespace-nowrap"
                style={{
                  left: isOdd ? "0px" : "-4128px",
                }}
              >
                <div
                  className="flex gap-16 px-8"
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

      <h1 className="absolute bottom-10 right-8 z-50 border-b-[1rem] border-b-white text-8xl font-bold text-white md:right-16 md:text-10xl md:leading-[10rem]">
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
                    className="custom-skill-button flex h-[40rem] w-[40rem] flex-shrink-0 items-center justify-center rounded-3xl bg-white"
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
                  className="custom-skill-button flex h-[33vw] max-h-[40rem] w-[33vw] max-w-[40rem] flex-shrink-0 items-center justify-center self-center overflow-hidden rounded-3xl bg-white p-[2.5%]"
                  onClick={returnToList}
                >
                  {SkillImageByIndex(selectedItem)}
                </button>
                <div className="w-full font-bold text-white drop-shadow-lg">
                  <div className="whitespace-nowrap pb-8 text-right text-5xl">
                    {skillsArray[selectedItem].title}
                  </div>
                  <ul className="flex h-[36rem] flex-col gap-8 overflow-scroll pb-8 text-2xl md:pl-16 md:text-3xl xl:pl-32 xl:text-4xl">
                    {skillsArray[selectedItem].description.map(
                      (desc, index) => {
                        return (
                          <li
                            className="list-disc whitespace-pre-line break-keep leading-tight"
                            key={`skills-description-list-${index}`}
                          >
                            {desc}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
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
