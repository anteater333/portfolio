import { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";
import { useImageLoader } from "../../hooks/useImageLoader";

import imgMeCharacter from "../../resources/images/records/img_s2_00_me_character_no_bg.png";
import imgReflection from "../../resources/images/records/img_s2_01_reflection.png";
import imgTVNoise from "../../resources/images/records/img_s2_02_tv_noise.gif";
import useIntersection from "../../hooks/useIntersection";

import { easeInBack, easeOutBack } from "../../utils/easeFunctions";

type RecordSpecItemProp = { text: string; emoji?: string; big?: boolean };

function RecordSpecItem({ text, emoji, big }: RecordSpecItemProp) {
  return (
    <span key={text} className={big ? "text-5xl" : ""}>
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
    title: "Scroll down to see",
    lines: [],
    year: "",
  },
  {
    year: 1995,
    title: "대구 출생",
    lines: [
      [RecordSpecItem({ text: "달서구 용산동의 소심한 아이", big: true })],
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
  { year: "현재", title: "구직 중", lines: [] },
  { year: "And", title: "Anteater will return...", lines: [] },
];

/** 레코드 수 */
const numberOfRecords = recordsArray.length;
/** 레코드 당 스크롤 길이 */
const scrollPerRecord = 3000;
/** 다음 레코드로 넘어가는 것을 미리 알리는 스크롤 임계값 */
const threshold = 2500;

function RecordsSection({ updateLoadingProgress }: SectionProps) {
  const {
    isLoaded: isLoadedMeCharacter,
    progress: prgMeCharacter,
    ImageComponent: ImgMeCharacter,
  } = useImageLoader(imgMeCharacter);
  const ImgTVNoise = useImageLoader(imgTVNoise);

  const [recordScroll, setRecordScroll] = useState(0);
  const [calcedRecordScroll, setCalcedRecordScroll] = useState(
    recordScroll % scrollPerRecord
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    updateLoadingProgress(prgMeCharacter / 1, 1);
  }, [prgMeCharacter, updateLoadingProgress]);

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
    setIsNoiseOn(calculated > threshold); // 일정 threshold 이상 넘어가면 노이즈 표시
    setRecordIndex(
      Math.min(Math.floor(recordScroll / scrollPerRecord), numberOfRecords - 2)
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

  return (
    <section
      id="records-section"
      className={`${"transition-{opacity} h-recommended snap-start overflow-scroll duration-[1000ms]"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onScroll={calcCurrentPosition}
      ref={ref}
    >
      <div className="-scroll-pb-0 h-[22000px] -scroll-mt-6">
        <div className="sticky top-0 h-recommended">
          <h1 className="absolute right-16 top-40 z-50 border-b-[1rem] border-b-blue-500 text-10xl font-bold leading-[10rem] text-blue-500">
            Records
          </h1>
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
                    <ImgMeCharacter alt="me-character" />
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
