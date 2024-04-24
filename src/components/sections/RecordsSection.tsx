import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionProps from "./SectionProps";
import { useImageLoader } from "../../hooks/useImageLoader";

import imgMeCharacter from "../../resources/images/records/img_s2_00_me_character_no_bg.png";
import imgReflection from "../../resources/images/records/img_s2_01_reflection.png";
import imgTVNoise from "../../resources/images/records/img_s2_02_tv_noise.gif";
import imgMe00 from "../../resources/images/records/img_s2_03_me_00.png";
import imgMe01 from "../../resources/images/records/img_s2_04_me_01.png";
import imgMe02 from "../../resources/images/records/img_s2_05_me_02.png";
import imgMe03 from "../../resources/images/records/img_s2_06_me_03.png";
import imgMe04 from "../../resources/images/records/img_s2_07_me_04.png";
import imgMe05 from "../../resources/images/records/img_s2_08_me_05.png";
import imgMe06 from "../../resources/images/records/img_s2_09_me_06.png";

import useIntersection from "../../hooks/useIntersection";

import { easeInBack, easeOutBack } from "../../utils/easeFunctions";

type RecordSpecItemProp = { text: string; emoji?: string; big?: boolean };

/** 레코드 데이터 상세 정보를 담게 될 자식 span 아이템 컴포넌트, 해시태그 효과 */
function RecordSpecItem({ text, emoji, big }: RecordSpecItemProp) {
  /** 버튼 클릭 시 파티클 효과 */
  const particleOnClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    function createParticle(x: number, y: number) {
      const particle = document.createElement("particle");
      document.body.appendChild(particle);

      let destinationX = (Math.random() - 0.5) * 300;
      let destinationY = (Math.random() - 0.5) * 300;
      let rotation = Math.random() * 520;
      let delay = Math.random() * 200;

      particle.innerHTML = emoji!;
      particle.style.fontSize = `${Math.random() * 24 + 40}px`;

      const animation = particle.animate(
        [
          {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1,
          },
          {
            transform: `translate(-50%, -50%) translate(${
              x + destinationX
            }px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 1,
          },
        ],
        {
          duration: Math.random() * 1000 + 500,
          easing: "cubic-bezier(0, .9, .57, 1)",
          delay: delay,
        }
      );
      animation.addEventListener("finish", (ev) => {
        particle.remove();
      });
    }
    const amount = Math.random() * 8 + 4;

    for (let i = 0; i < amount; i++) {
      createParticle(event.clientX, event.clientY);
    }
  };

  return (
    <span
      key={text}
      className={`${!!emoji ? "cursor-pointer" : ""} ${
        big ? "text-5xl" : ""
      } select-none`}
      onClick={emoji ? particleOnClick : undefined}
    >
      #{text.replaceAll(" ", "_")}
    </span>
  );
}

/**
 * 생애/이력 데이터
 */
const recordsArray: {
  year: number | string;
  title: string;
  lines: JSX.Element[][];
}[] = [
  {
    title: "Records",
    lines: [],
    year: "My",
  },
  {
    year: 1995,
    title: "대구 출생",
    lines: [
      [RecordSpecItem({ text: "1남 1녀 중 둘째" })],
      [RecordSpecItem({ text: "달서구 용산동의 소심한 아이", emoji: "😳" })],
    ],
  },
  {
    year: 2002,
    title: "대구 장산초등학교 입학",
    lines: [
      [RecordSpecItem({ text: "워드 컴활 등 IT 자격증(2급) 취득" })],
      [RecordSpecItem({ text: "ITQ OA Master 취득" })],
      [RecordSpecItem({ text: "교내 정보검색 대회 우승" })],
      [RecordSpecItem({ text: "정보 올림피아드 지역 예선 탈락", emoji: "😭" })],
    ],
  },
  {
    year: 2008,
    title: "대구 성서중학교 입학",
    lines: [
      [RecordSpecItem({ text: "프로그래밍 첫 경험" })],
      [RecordSpecItem({ text: "스타크래프트 유즈맵 제작", emoji: "🎮" })],
    ],
  },
  {
    year: 2011,
    title: "대구 성산고등학교 입학",
    lines: [
      [
        RecordSpecItem({
          text: "2012 학생 창의력 챔피언 대회 대상",
          emoji: "🏆",
        }),
      ],
      [RecordSpecItem({ text: "교내 영자신문 동아리 활동" })],
      [RecordSpecItem({ text: "정보 올림피아드 지역 본선 탈락", emoji: "😂" })],
    ],
  },
  {
    year: 2014,
    title: "부경대학교 컴퓨터공학과 입학",
    lines: [
      [RecordSpecItem({ text: "프로그래밍 동아리 WAP 18기 활동" })],
      [
        RecordSpecItem({ text: "Java" }),
        RecordSpecItem({ text: "C_Sharp" }),
        RecordSpecItem({ text: "Unity 등등" }),
      ],
      [RecordSpecItem({ text: "다양한 소규모 프로젝트 진행", emoji: "⌨️" })],
      [RecordSpecItem({ text: "K-해커톤 (비대면) 본선 탈락", emoji: "😷" })],
    ],
  },
  {
    year: 2021,
    title: "소프트웨어 마에스트로 12기 활동",
    lines: [
      [
        RecordSpecItem({
          text: "SOMA 미니 프로젝트 3rd",
        }),
      ],
      [
        RecordSpecItem({
          text: "SOMA 해커톤 2nd",
          emoji: "💤",
        }),
      ],
      [
        RecordSpecItem({
          text: "팀 프로젝트 AIQA",
        }),
      ],
    ],
  },
  {
    year: 2023,
    title: "프리랜서 생활",
    lines: [
      [
        RecordSpecItem({
          text: "AIHub 데이터 구축사업 참여",
          emoji: "🛠️",
        }),
      ],
      [
        RecordSpecItem({
          text: "다수의 개인 프로젝트 배포",
          emoji: "🍅",
        }),
      ],
    ],
  },
  { year: "현재", title: "일할 곳을 찾는 중", lines: [] },
  { year: "And", title: "Anteater will return...", lines: [] },
];

/** 레코드 수 */
const numberOfRecords = recordsArray.length;
/** 레코드 당 스크롤 길이 */
const scrollPerRecord = 3000;
/** 다음 레코드로 넘어가는 것을 미리 알리는 스크롤 임계값 */
const threshold = 2500;
const lowerThreshold = 250;

function RecordsSection({ updateLoadingProgress }: SectionProps) {
  const ImgMeCharacter = useImageLoader(imgMeCharacter);
  const ImgTVNoise = useImageLoader(imgTVNoise);

  const ImgMe00 = useImageLoader(imgMe00);
  const ImgMe01 = useImageLoader(imgMe01);
  const ImgMe02 = useImageLoader(imgMe02);
  const ImgMe03 = useImageLoader(imgMe03);
  const ImgMe04 = useImageLoader(imgMe04);
  const ImgMe05 = useImageLoader(imgMe05);
  const ImgMe06 = useImageLoader(imgMe06);

  const [recordScroll, setRecordScroll] = useState(0);
  const [calcedRecordScroll, setCalcedRecordScroll] = useState(
    recordScroll % scrollPerRecord
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;
  const [isDisappeared, setIsDisappeared] = useState(false);

  /** 이 섹션이 화면에 표시될 때의 행동 */
  useEffect(() => {
    if (!isVisible) {
      // ref.current?.scrollTo({ top: 0 });
      setIsDisappeared(false);
    } else {
      let timeoutId = setTimeout(() => {
        setIsDisappeared(true);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    const total =
      ImgMeCharacter.progress +
      ImgTVNoise.progress +
      ImgMe00.progress +
      ImgMe01.progress +
      ImgMe02.progress +
      ImgMe03.progress +
      ImgMe04.progress +
      ImgMe05.progress +
      ImgMe06.progress;
    const length = 9;
    updateLoadingProgress(total / length, 1);
  }, [
    ImgMeCharacter.progress,
    ImgTVNoise.progress,
    ImgMe00.progress,
    ImgMe01.progress,
    ImgMe02.progress,
    ImgMe03.progress,
    ImgMe04.progress,
    ImgMe05.progress,
    ImgMe06.progress,
    updateLoadingProgress,
  ]);

  /**
   * 현재 섹션의 위치 계산 함수
   */
  const calcCurrentPosition = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      setRecordScroll(event.currentTarget.scrollTop);
    },
    []
  );

  /**
   * 현재 표시될 Record
   */
  const [currentRecord, setCurrentRecord] = useState(0);

  /** 사진 영역에 노이즈 GIF 표시 여부 */
  const [isNoiseOn, setIsNoiseOn] = useState(false);
  const [recordIndex, setRecordIndex] = useState(0);

  useEffect(() => {
    const calculated = recordScroll % scrollPerRecord;
    setIsNoiseOn(calculated > threshold || calculated < lowerThreshold); // 일정 threshold 이상 넘어가면 노이즈 표시
    setRecordIndex(
      Math.min(
        Math.max(Math.floor(recordScroll / scrollPerRecord), 0),
        numberOfRecords - 2
      )
    );
    setCalcedRecordScroll(calculated);
  }, [recordScroll]);

  const [recordPosition, setRecordPosition] = useState(0);
  const [subRecordPosition, setSubRecordPosition] = useState(0);

  useEffect(() => {
    setCurrentRecord(Math.min(recordIndex, numberOfRecords - 3));
  }, [recordIndex]);

  /** 좌측 메인 Record 위치 변경 */
  useEffect(() => {
    if (
      recordIndex !== 0 &&
      calcedRecordScroll < 1000 &&
      recordIndex < numberOfRecords - 2
    ) {
      // 밑에서 본위치로 (from 400)
      setRecordPosition(400 - 400 * easeOutBack(calcedRecordScroll / 1000));
    } else if (
      recordIndex < numberOfRecords - 3 &&
      calcedRecordScroll >= 2000
    ) {
      // 본위치에서 위로 (to -400)
      setRecordPosition(
        0 - 400 * easeInBack((calcedRecordScroll - 2000) / 1000)
      );
    } else {
      setRecordPosition(0);
    }
  }, [calcedRecordScroll, recordIndex]);

  /** 우측 서브 Record 위치 변경 */
  useEffect(() => {
    if (
      recordIndex !== 0 &&
      calcedRecordScroll < 1300 &&
      recordIndex < numberOfRecords - 2
    ) {
      // 밑에서 본위치로 (from 800)
      setSubRecordPosition(
        800 - 800 * easeOutBack((calcedRecordScroll - 300) / 1000)
      );
    } else if (
      recordIndex < numberOfRecords - 3 &&
      calcedRecordScroll >= 2300
    ) {
      // 본위치에서 위로 (to -800)
      setSubRecordPosition(
        0 - 800 * easeInBack((calcedRecordScroll - 2300) / 700)
      );
    } else {
      setSubRecordPosition(0);
    }
  }, [calcedRecordScroll, recordIndex]);

  /** currentRecord의 값에 따라 화면에 표시될 사진 선택 */
  const CurrentImage = useMemo(() => {
    /** RecordIndex로 이미지에 접근 가능하도록 배열 선언 */
    const RecordImages = [
      ImgMeCharacter.ImageComponent,
      ImgMe00.ImageComponent,
      ImgMe01.ImageComponent,
      ImgMe02.ImageComponent,
      ImgMe03.ImageComponent,
      ImgMe04.ImageComponent,
      ImgMe05.ImageComponent,
      ImgMe06.ImageComponent,
    ];

    return RecordImages[currentRecord];
  }, [
    ImgMe00.ImageComponent,
    ImgMe01.ImageComponent,
    ImgMe02.ImageComponent,
    ImgMe03.ImageComponent,
    ImgMe04.ImageComponent,
    ImgMe05.ImageComponent,
    ImgMe06.ImageComponent,
    ImgMeCharacter.ImageComponent,
    currentRecord,
  ]);

  return (
    <section
      id="records-section"
      className={`${"transition-{opacity} h-recommended snap-start snap-always overflow-scroll duration-[1000ms]"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onScroll={calcCurrentPosition}
      ref={ref}
    >
      <div className="-scroll-pb-0 h-[25000px] -scroll-mt-6">
        <div className="sticky top-0 h-recommended">
          <h1 className="absolute right-16 top-40 z-50 border-b-[1rem] border-b-blue-500 text-10xl font-bold leading-[10rem] text-blue-500">
            Records
          </h1>
          <div
            className="transition-{opacity} absolute bottom-40 z-50 w-full select-none text-center text-3xl font-bold ease-in"
            style={{
              transitionDelay: isVisible ? "500ms" : "0ms",
              transitionDuration: isVisible ? "2000ms" : "0ms",
              opacity: isVisible ? 0 : 100,
              display: isDisappeared ? "none" : "block",
            }}
          >
            휠 클릭으로 스크롤해 보세요.
          </div>
          <div
            id="records-content-area"
            className={`flex h-full origin-bottom font-bold`}
          >
            <div id="records-content-left" className="w-2/3">
              <div className="flex h-full w-full flex-col pl-28 pt-36">
                <div className="z-20 flex w-full justify-start bg-white">
                  <div
                    id="records-picture-area"
                    className="flex h-[27.5rem] w-[27.5rem] justify-center overflow-hidden rounded-[6.25rem] bg-gradient-to-t from-sky-400 to-blue-500"
                  >
                    <CurrentImage className="p-6" alt="me-picture" />
                    <ImgTVNoise.ImageComponent
                      className={`${"absolute h-[27.5rem] w-[27.5rem] overflow-hidden rounded-[6.25rem] transition-opacity"} ${
                        isNoiseOn || recordIndex > numberOfRecords - 3
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      alt="tv-noise"
                    />
                    <div className="absolute h-[27.5rem] w-[27.5rem] overflow-hidden rounded-[6.25rem] border-[24px] border-black bg-transparent">
                      <img
                        className="absolute opacity-75"
                        src={imgReflection}
                        alt="records-reflection"
                        style={{
                          bottom:
                            650 * Math.tanh(calcedRecordScroll / 1200 - 1) -
                            100,
                        }}
                      />
                    </div>
                    <div
                      className="absolute h-[27.5rem] w-[27.5rem] rounded-[6.25rem]"
                      style={{
                        background: "radial-gradient(#00000000 60%, #00000099)",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="h-full flex-1">
                  <div
                    className="absolute -ml-4 flex flex-col text-5xl"
                    style={{
                      transform: `translateY(${recordPosition}px)`,
                    }}
                  >
                    <div className="flex space-x-6 pt-6">
                      <div className="flex w-44 items-center justify-end text-[4rem]">
                        <span>{recordsArray[currentRecord].year}</span>
                      </div>
                      <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                      <div className="flex items-center justify-center">
                        <span>{recordsArray[currentRecord].title}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex h-64 flex-col justify-center space-y-8 pl-[18.5rem] text-4xl">
                      {recordsArray[currentRecord].lines.map((line, index) => {
                        return (
                          <span
                            key={`record-context-${currentRecord}-${index}`}
                            className="space-x-4"
                          >
                            {line}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="ml-52 h-full w-6 bg-black" />
                </div>
              </div>
            </div>
            <div
              id="records-content-right"
              className="flex h-full w-1/3 flex-col justify-end font-bold"
            >
              <div className="z-30 h-full flex-grow-0 bg-white"></div>
              <div className="mt-6 h-[37.5rem] flex-shrink-0">
                <div className="absolute flex flex-col space-y-28">
                  {/* Next Data #1 */}
                  {currentRecord < numberOfRecords - 1 ? (
                    <div
                      className="flex space-x-6 pt-[3.75rem]"
                      style={{
                        transform: `translateY(${subRecordPosition}px)`,
                      }}
                    >
                      <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                      <div>
                        <div className="flex w-44 items-center text-5xl text-[4rem]">
                          <span>{recordsArray[currentRecord + 1].year}</span>
                        </div>
                        <div className="mt-2 flex items-center text-4xl">
                          <span>{recordsArray[currentRecord + 1].title}</span>
                        </div>
                      </div>
                    </div>
                  ) : undefined}
                  {/* Next Data #2 */}
                  {currentRecord < numberOfRecords - 2 ? (
                    <div
                      className="flex space-x-6 pt-[3.75rem]"
                      style={{
                        transform: `translateY(${subRecordPosition}px)`,
                      }}
                    >
                      <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                      <div>
                        <div className="flex w-44 items-center text-5xl text-[4rem]">
                          <span>{recordsArray[currentRecord + 2].year}</span>
                        </div>
                        <div className="mt-2 flex items-center text-4xl">
                          <span>{recordsArray[currentRecord + 2].title}</span>
                        </div>
                      </div>
                    </div>
                  ) : undefined}
                </div>
                <div className="ml-6 h-full w-6 rounded-t-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecordsSection;
