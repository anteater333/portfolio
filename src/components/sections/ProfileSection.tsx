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

const ProfileSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
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

    return (
      <section
        id="profile-section"
        ref={ref}
        className="h-recommended overflow-hidden"
        onMouseMove={throttle(trackMouseMove, 50)}
      >
        <div className="profile-content-area absolute z-30 flex h-recommended w-recommended">
          <div className="profile-myself-area w-1/3">
            <div
              className={`profile-my-IRL-picture absolute h-full overflow-hidden ${
                isAllImgReady ? "opacity-100" : "opacity-0"
              } ${transitionSequence[6]}`}
            >
              <ImgMeIRL
                className="-ml-16 mt-8"
                alt="me-irl"
                style={{
                  paddingLeft: 16 * ((mouseX / 1920) * 2),
                  paddingTop: 8 * ((mouseY / 1200) * 2),
                }}
              />
            </div>
            <div
              className={`profile-my-character absolute left-[100px] top-[96px] ${
                isAllImgReady ? "opacity-100" : "opacity-0"
              } ${transitionSequence[0]}`}
            >
              <ImgMeCharacter
                alt="me-character"
                style={{
                  paddingLeft: 4 * ((mouseX / 1920) * 2),
                  paddingTop: 2 * ((mouseY / 1200) * 2),
                }}
              />
            </div>
          </div>
          <div className="profile-text-area flex-1 select-none pl-12 pr-[128px] pt-[96px] text-white">
            <div
              className={`profile-text-area-upper ${
                isAllImgReady ? "opacity-100" : "opacity-0"
              } ${transitionSequence[3]}`}
            >
              <h1 className="text-9xl font-bold">이지훈 Lee Ji-hoon</h1>
              <h3 className="text-5xl font-bold">anteater1056@gmail.com</h3>
              <h3 className="mt-8 text-5xl font-bold">
                is a SW developer, a front-end engineer,
                <br />a programmer and
              </h3>
            </div>
            <div
              className={`profile-text-area-middle mt-32 ${
                isAllImgReady ? "opacity-100" : "opacity-0"
              } ${transitionSequence[4]}`}
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
              className={`profile-text-area-bottom mt-48 text-right ${
                isAllImgReady ? "opacity-100" : "opacity-0"
              } ${transitionSequence[5]}`}
            >
              <h2 className="text-8xl font-bold">
                장인의 자세로 <br />
                <span className={`text-green-500`}>공상을 현실로</span> 만드는
                삶
              </h2>
              <h4 className="pr-2 text-base">그리고 약간의 실없는 농담들</h4>
            </div>
          </div>
        </div>
        <div
          className={`profile-overlay-blue absolute z-20 ${
            isAllImgReady ? "opacity-100" : "opacity-0"
          } h-recommended w-recommended ${transitionSequence[1]}`}
          style={{
            background: `linear-gradient(180deg, rgba(12, 74, 110, 0.5) 0.08%, rgba(12, 74, 110, 0.7) 99.98%)`,
          }}
        />
        <div
          className={`profile-background-image absolute z-10 h-recommended w-recommended ${
            isAllImgReady ? "opacity-100" : "opacity-0"
          } ${transitionSequence[1]}`}
        >
          <ImgBackground
            className="object-none object-center"
            alt="background-img"
            style={{
              objectPosition: `${-300 + 64 * ((mouseX / 1920) * 2)}px ${
                -200 + 32 * ((mouseY / 1200) * 2)
              }px`,
            }}
          />
        </div>
        <div className="profile-background-placeholder absolute z-0 h-recommended w-recommended bg-black"></div>
      </section>
    );
  }
);

export default ProfileSection;
