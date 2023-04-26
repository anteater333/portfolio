import React, { useCallback, useEffect, useState } from "react";
import SectionProps from "./SectionProps";
import imgBackground from "../../resources/images/profile/img_s1_00_background.png";
import imgMeIRL from "../../resources/images/profile/img_s1_01_me_IRL.png";
import imgMeCharacter from "../../resources/images/profile/img_s1_02_me_character.png";
import { useImageLoader } from "../../hooks/useImageLoader";
import throttle from "../../utils/throttle";

/**
 * 트랜지션 시퀀스 정의 TailwindCSS 클래스 배열.
 */
const transitionSequence = [
  "transition-{opacity} delay-[500ms] duration-[100ms]",
  "transition-{opacity} delay-[750ms] duration-[750ms]",
  "transition-{opacity} delay-[750ms] duration-[750ms]",
  "transition-{opacity} delay-[1500ms] duration-[1000ms]",
  "transition-{opacity} delay-[2000ms] duration-[1000ms]",
  "transition-{opacity} delay-[2500ms] duration-[1000ms]",
  "transition-{opacity} delay-[500ms] duration-[500ms]",
];

function ProfileSection({ updateLoadingProgress }: SectionProps) {
  const {
    isLoaded: imgMeCharacterLoaded,
    progress: prgMeCharacter,
    ImageComponent: ImgMeCharacter,
  } = useImageLoader(imgMeCharacter);
  const {
    isLoaded: imgMeIRLLoaded,
    progress: prgMeIRL,
    ImageComponent: ImgMeIRL,
  } = useImageLoader(imgMeIRL);
  const {
    isLoaded: imgBackgroundLoaded,
    progress: prgBackground,
    ImageComponent: ImgBackground,
  } = useImageLoader(imgBackground);

  const [isAllImgReady, setIsAllImgReady] = useState(false);

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    updateLoadingProgress((prgBackground + prgMeCharacter + prgMeIRL) / 3, 0);
  }, [prgMeIRL, prgMeCharacter, prgBackground, updateLoadingProgress]);

  /**
   * 전체 이미지가 준비되었음을 체크. 트랜지션의 시작점.
   */
  useEffect(() => {
    setIsAllImgReady(
      imgMeCharacterLoaded && imgMeIRLLoaded && imgBackgroundLoaded
    );
  }, [imgMeIRLLoaded, imgMeCharacterLoaded, imgBackgroundLoaded]);

  const [mouseX, setMouseX] = useState(1920 / 2);
  const [mouseY, setMouseY] = useState(1200 / 2);
  /**
   * 마우스 위치를 인식해 이미지의 위치를 조정
   */
  const trackMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    },
    []
  );

  /**
   * Easter Egg
   */
  const [isMouseOnEE, setIsMouseOnEE] = useState(false);
  const [isEEActivated, setIsEEActivated] = useState(false);
  const [EEOpacity, setEEOpacity] = useState(0);

  useEffect(() => {
    if (!isEEActivated && isMouseOnEE) {
      let counterToReveal = 100;
      let counterToActive = 150;

      let timerId = setInterval(() => {
        counterToReveal =
          counterToReveal > 0 ? counterToReveal - 1 : counterToReveal;
        setEEOpacity(50 - counterToReveal / 2);
        counterToActive--;

        if (counterToActive <= 0) {
          setIsEEActivated(true);
          clearInterval(timerId);
        }
      });

      return () => {
        clearInterval(timerId);
        setEEOpacity(0);
      };
    }
  }, [isMouseOnEE, isEEActivated]);

  return (
    <section
      id="profile-section"
      className="relative h-recommended snap-center overflow-hidden"
      onMouseMove={throttle(trackMouseMove, 50)}
    >
      <div
        id="profile-content-area"
        className="absolute z-30 flex h-recommended w-recommended"
      >
        <div id="profile-myself-area" className="w-1/3">
          <div
            id="profile-my-IRL-picture"
            className={`absolute h-full overflow-hidden ${
              isAllImgReady ? "opacity-100" : "opacity-0"
            } ${transitionSequence[6]}`}
          >
            <ImgMeIRL
              className="-ml-16 mt-8"
              alt="me-irl"
              style={{
                paddingLeft: 16 * ((mouseX / 1920) * 2),
                paddingTop: 8 * ((mouseY / 1000) * 2),
              }}
            />
          </div>
          <div
            id="profile-my-character"
            className={`absolute left-[100px] top-[96px] ${
              isAllImgReady ? "opacity-100" : "opacity-0"
            } ${transitionSequence[0]}`}
          >
            <ImgMeCharacter
              alt="me-character"
              style={{
                paddingLeft: 4 * ((mouseX / 1920) * 2),
                paddingTop: 2 * ((mouseY / 1000) * 2),
              }}
            />
          </div>
        </div>
        <div
          id="profile-text-area"
          className="flex-1 select-none pl-12 pr-[128px] pt-[96px] text-white"
        >
          <div
            id="profile-text-area-upper"
            className={`${isAllImgReady ? "opacity-100" : "opacity-0"} ${
              transitionSequence[3]
            }`}
          >
            <h1 className="text-9xl font-bold">이지훈 Lee Ji-hoon</h1>
            <h3 className="text-5xl font-bold">anteater1056@gmail.com</h3>
            <h3 className="mt-8 text-5xl font-bold">
              is a SW developer, a front-end engineer,
              <br />a programmer and
            </h3>
          </div>
          <div
            id="profile-text-area-middle"
            className={`mt-24 ${isAllImgReady ? "opacity-100" : "opacity-0"} ${
              transitionSequence[4]
            }`}
          >
            <h2 className="mb-4 text-8xl font-bold">
              <span className={`text-green-500`}>소프트웨어 장인</span> 지망생
            </h2>
            <h3 className="text-5xl font-bold">
              an Aspiring
              <span className={`text-green-500`}> Software Craftsman</span>
            </h3>
          </div>
          <div
            id="profile-text-area-bottom"
            className={`mt-24 text-right ${
              isAllImgReady ? "opacity-100" : "opacity-0"
            } ${transitionSequence[5]}`}
          >
            <h2 className="text-8xl font-bold">
              장인의 자세로 <br />
              <span className={`text-green-500`}>공상을 현실로</span> 만드는 삶
            </h2>
            <h4
              className="pr-2 text-base"
              onMouseEnter={() => setIsMouseOnEE(true)}
              onMouseLeave={() => setIsMouseOnEE(false)}
              onClick={() => {
                if (isEEActivated) setIsEEActivated(false);
              }}
              style={{
                opacity: isEEActivated ? `100%` : `${EEOpacity}%`,
              }}
            >
              그리고 약간의 실없는 농담들
            </h4>
          </div>
        </div>
      </div>
      <div
        id="profile-overlay-blue"
        className={`absolute z-20 ${
          isAllImgReady ? "opacity-100" : "opacity-0"
        } h-recommended w-recommended ${transitionSequence[1]}`}
        style={{
          background: `linear-gradient(180deg, rgba(12, 74, 110, 0.5) 0.08%, rgba(12, 74, 110, 0.7) 99.98%)`,
        }}
      />
      <div
        id="profile-background-image"
        className={`absolute z-10 h-recommended w-recommended ${
          isAllImgReady ? "opacity-100" : "opacity-0"
        } ${transitionSequence[1]}`}
      >
        <ImgBackground
          className="object-none object-center"
          alt="background-img"
          style={{
            objectPosition: `${-300 - 32 * ((mouseX / 1920) * 2)}px ${
              -200 - 16 * ((mouseY / 1000) * 2)
            }px`,
          }}
        />
      </div>
      <div
        id="profile-background-placeholder"
        className="absolute z-0 h-recommended w-recommended bg-black"
      ></div>
    </section>
  );
}

export default ProfileSection;
