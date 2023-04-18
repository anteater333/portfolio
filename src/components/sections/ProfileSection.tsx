import React from "react";
import SectionProps from "./SectionProps";
import imgBackground from "../../resources/images/profile/img_s1_00_background.png";
import imgMeIRL from "../../resources/images/profile/img_s1_01_me_IRL.png";
import imgMeCharacter from "../../resources/images/profile/img_s1_02_me_character.png";

const ProfileSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section
        id="profile-section"
        ref={ref}
        className="h-recommended overflow-hidden"
      >
        <div className="profile-content-area absolute z-30 flex h-recommended w-recommended">
          <div className="profile-myself-area w-1/3">
            <div className="profile-my-IRL-picture absolute h-full overflow-hidden">
              <img
                className="-ml-16 mt-8"
                src={imgMeIRL}
                alt="me-irl"
                onLoad={() => {}}
                loading="lazy"
              />
            </div>
            <div className="profile-my-character absolute left-[100px] top-[96px]">
              <img
                src={imgMeCharacter}
                alt="me-character"
                onLoad={() => {}}
                loading="lazy"
              />
            </div>
          </div>
          <div className="profile-text-area flex-1  pr-[128px] pt-[96px] text-white">
            <div className="profile-text-area-upper">
              <h1 className="text-9xl font-bold">이지훈 Lee Ji-hoon</h1>
              <h3 className="text-5xl font-bold">anteater1056@gmail.com</h3>
              <h3 className="mt-8 text-5xl font-bold">
                is a SW developer, a front-end engineer,
                <br />a programmer and
              </h3>
            </div>
            <div className="profile-text-area-middle mt-32">
              <h2 className="mb-4 text-8xl font-bold">
                <span className={`text-green-500`}>소프트웨어 장인</span> 지망생
              </h2>
              <h3 className="text-5xl font-bold">
                an Aspiring
                <span className={`text-green-500`}> Software Craftsman</span>
              </h3>
            </div>
            <div className="profile-text-area-bottom mt-48 text-right">
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
          className="profile-overlay-blue absolute z-20 h-recommended w-recommended"
          style={{
            background: `linear-gradient(180deg, rgba(12, 74, 110, 0.5) 0.08%, rgba(12, 74, 110, 0.7) 99.98%)`,
          }}
        />
        <div className="profile-background-image absolute z-10 h-recommended w-recommended">
          <img
            className="object-none object-center"
            src={imgBackground}
            alt="background-img"
            onLoad={() => {}}
            loading="lazy"
          />
        </div>
        <div className="profile-background-placeholder absolute z-0 h-recommended w-recommended bg-black"></div>
      </section>
    );
  }
);

export default ProfileSection;
