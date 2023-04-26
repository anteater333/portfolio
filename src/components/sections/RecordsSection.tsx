import { useEffect, useState } from "react";
import SectionProps from "./SectionProps";
import { useImageLoader } from "../../hooks/useImageLoader";

import imgMeCharacter from "../../resources/images/records/img_s2_00_me_character_no_bg.png";
import imgReflection from "../../resources/images/records/img_s2_01_reflection.svg";

function RecordsSection({ updateLoadingProgress }: SectionProps) {
  const {
    isLoaded: isLoadedMeCharacter,
    progress: prgMeCharacter,
    ImageComponent: ImgMeCharacter,
  } = useImageLoader(imgMeCharacter);

  const [recordScroll, setRecordScroll] = useState(0);

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    updateLoadingProgress(prgMeCharacter / 1, 1);
  }, [prgMeCharacter, updateLoadingProgress]);

  return (
    <section
      id="records-section"
      className="relative h-recommended snap-center overflow-hidden"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h1 className="absolute right-16 top-40 border-b-[1rem] border-b-blue-500 text-10xl font-bold leading-[10rem] text-blue-500">
        Records
      </h1>
      <div className="records-content-area flex h-full font-bold">
        <div className="records-content-left w-2/3">
          <div className="flex h-full w-full flex-col pl-28 pt-36">
            <div className="records-picture-area flex h-[27.5rem] w-[27.5rem] justify-center overflow-hidden rounded-[6.25rem] bg-gradient-to-t from-sky-400 to-blue-500">
              <ImgMeCharacter alt="me-character" />
              <img
                className={`absolute`}
                src={imgReflection}
                alt="records-reflection"
                style={{
                  bottom: recordScroll - 262,
                }}
              />
              <div className="absolute h-[27.5rem] w-[27.5rem] rounded-[6.25rem] border-[24px] border-black bg-transparent" />
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
        <div className="records-content-right flex h-full w-1/3 flex-col justify-end font-bold">
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
    </section>
  );
}

export default RecordsSection;
