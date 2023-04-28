import { useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";
import { useImageLoader } from "../../hooks/useImageLoader";

import imgMeCharacter from "../../resources/images/records/img_s2_00_me_character_no_bg.png";
import imgReflection from "../../resources/images/records/img_s2_01_reflection.svg";
import useIntersection from "../../hooks/useIntersection";

type RecordSpecItemProp = { text: string; emoji?: string };

function RecordSpecItem({ text, emoji }: RecordSpecItemProp) {
  return <span>#{text.replaceAll(" ", "_")}</span>;
}

/**
 * 생애/이력 데이터
 */
const recordsArray: {
  year: number;
  title: string;
  lines: JSX.Element[][];
}[] = [
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
    year: 2014,
    title: "부경대학교 컴퓨터공학과 입학",
    lines: [
      [RecordSpecItem({ text: "프로그래밍 동아리 WAP 18기 활동" })],
      [
        RecordSpecItem({ text: "Java" }),
        RecordSpecItem({ text: "C#" }),
        RecordSpecItem({ text: "Unity 등등" }),
      ],
      [RecordSpecItem({ text: "다양한 소규모 프로젝트 진행", emoji: "⌨️" })],
      [RecordSpecItem({ text: "K-해커톤 (비대면) 본선 탈락", emoji: "😷" })],
    ],
  },
  {
    year: 20011,
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
    year: 2008,
    title: "대구 성서중학교 입학",
    lines: [
      [RecordSpecItem({ text: "프로그래밍 첫 경험" })],
      [RecordSpecItem({ text: "스타크래프트 유즈맵 제작", emoji: "🎮" })],
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
    year: 1995,
    title: "대구 출생",
    lines: [],
  },
];

function RecordsSection({ updateLoadingProgress }: SectionProps) {
  const {
    isLoaded: isLoadedMeCharacter,
    progress: prgMeCharacter,
    ImageComponent: ImgMeCharacter,
  } = useImageLoader(imgMeCharacter);

  const [recordScroll, setRecordScroll] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    updateLoadingProgress(prgMeCharacter / 1, 1);
  }, [prgMeCharacter, updateLoadingProgress]);

  return (
    <section
      id="records-section"
      className={`${"transition-{opacity} h-recommended snap-start overflow-scroll duration-[1000ms]"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onScroll={(event) => {
        setRecordScroll(event.currentTarget.scrollTop);
      }}
      ref={ref}
    >
      <div className="-scroll-pb-0 h-[12000px] -scroll-mt-6">
        <div className="sticky top-0 h-recommended">
          <h1 className="absolute right-16 top-40 border-b-[1rem] border-b-blue-500 text-10xl font-bold leading-[10rem] text-blue-500">
            Records
          </h1>
          <div
            id="records-content-area"
            className={`flex h-full origin-bottom font-bold`}
          >
            <div id="records-content-left" className="w-2/3">
              <div className="flex h-full w-full flex-col pl-28 pt-36">
                <div
                  id="records-picture-area"
                  className="flex h-[27.5rem] w-[27.5rem] justify-center overflow-hidden rounded-[6.25rem] bg-gradient-to-t from-sky-400 to-blue-500"
                >
                  <ImgMeCharacter alt="me-character" />
                  <div className="absolute h-[27.5rem] w-[27.5rem] overflow-hidden rounded-[6.25rem] border-[24px] border-black bg-transparent">
                    <img
                      className="absolute opacity-75"
                      src={imgReflection}
                      alt="records-reflection"
                      style={{
                        bottom:
                          500 * Math.tanh((recordScroll % 2000) / 500 - 1) +
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
                <div className="h-full flex-1">
                  <div className="absolute -ml-4 flex flex-col text-5xl">
                    <div className="flex space-x-6 pt-9">
                      <div className="flex w-44 items-center justify-end text-[4rem]">
                        <span>2008</span>
                      </div>
                      <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                      <div className="flex items-center justify-center">
                        <span>대구 장산초등학교 졸업</span>
                      </div>
                    </div>
                    <div className="mt-12 flex flex-col space-y-8 pl-[18.5rem]">
                      <span>#IT_자격증_다수_취득</span>
                      <span>#길이_잴_겸_임시로_넣은_문구</span>
                      <span>
                        <span>#한_줄에</span> <span>#두_개는_어떨까</span>
                      </span>
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
              <div className="h-[37.5rem]">
                <div className="absolute flex flex-col space-y-28">
                  {/* Mock Data #1 */}
                  <div className="flex space-x-6 pt-[3.75rem]">
                    <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                    <div>
                      <div className="flex w-44 items-center text-5xl text-[4rem]">
                        <span>2011</span>
                      </div>
                      <div className="mt-2 flex items-center text-4xl">
                        <span>대구 성서중학교 졸업</span>
                      </div>
                    </div>
                  </div>
                  {/* Mock Data #2 */}
                  <div className="flex space-x-6 pt-[3.75rem]">
                    <div className="h-[4.5rem] w-[4.5rem] rounded-full border-[1rem] border-black bg-white"></div>
                    <div>
                      <div className="flex w-44 items-center text-5xl text-[4rem]">
                        <span>2014</span>
                      </div>
                      <div className="mt-2 flex items-center text-4xl">
                        <span>대구 성산고등학교 졸업</span>
                      </div>
                    </div>
                  </div>
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
