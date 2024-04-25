import { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import imgContacts00Email from "../../resources/images/contacts/img_s5_00_Email.png";
import imgContacts01Phone from "../../resources/images/contacts/img_s5_01_Phone.png";
import imgContacts02Github from "../../resources/images/contacts/img_s5_02_Github.png";
import imgContacts03Talk from "../../resources/images/contacts/img_s5_03_Talk.png";
import imgContacts04Instagram from "../../resources/images/contacts/img_s5_04_Instagram.png";
import imgContacts05Blog from "../../resources/images/contacts/img_s5_05_blog.png";
import imgContacts06BMC from "../../resources/images/contacts/img_s5_06_BMC.png";
import imgContacts07React from "../../resources/images/contacts/img_s5_07_React.png";
import imgContacts08Tailwind from "../../resources/images/contacts/img_s5_08_Tailwind.png";
import imgContacts09Vite from "../../resources/images/contacts/img_s5_09_Vite.png";

import { useImageLoader } from "../../hooks/useImageLoader";
import PMatter from "../PMatter";
import useIntersection from "../../hooks/useIntersection";
import { useSectionScrollable } from "../../hooks/useSectionScrollable";

function ContactsSection({ updateLoadingProgress }: SectionProps) {
  const ImgContactsEmail = useImageLoader(imgContacts00Email);
  const ImgContactsPhone = useImageLoader(imgContacts01Phone);
  const ImgContactsGithub = useImageLoader(imgContacts02Github);
  const ImgContactsTalk = useImageLoader(imgContacts03Talk);
  const ImgContactsInstagram = useImageLoader(imgContacts04Instagram);
  const ImgContactsBlog = useImageLoader(imgContacts05Blog);
  const ImgContactsBMC = useImageLoader(imgContacts06BMC);
  const ImgContactsReact = useImageLoader(imgContacts07React);
  const ImgContactsTailwind = useImageLoader(imgContacts08Tailwind);
  const ImgContactsVite = useImageLoader(imgContacts09Vite);

  /**
   * 이 섹션에 포함된 이미지들의 로딩 진행률을 계산해 부모에게 전달함.
   */
  useEffect(() => {
    const total =
      ImgContactsEmail.progress +
      ImgContactsPhone.progress +
      ImgContactsGithub.progress +
      ImgContactsTalk.progress +
      ImgContactsInstagram.progress +
      ImgContactsBlog.progress +
      ImgContactsBMC.progress +
      ImgContactsReact.progress +
      ImgContactsTailwind.progress +
      ImgContactsVite.progress;
    const length = 10;
    updateLoadingProgress(total / length, 4);
  }, [
    ImgContactsBMC.progress,
    ImgContactsBlog.progress,
    ImgContactsEmail.progress,
    ImgContactsGithub.progress,
    ImgContactsInstagram.progress,
    ImgContactsPhone.progress,
    ImgContactsReact.progress,
    ImgContactsTailwind.progress,
    ImgContactsTalk.progress,
    ImgContactsVite.progress,
    updateLoadingProgress,
  ]);

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, { freezeOnceVisible: false });
  const isVisible = !!entry?.isIntersecting;
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      ref.current?.scrollTo({ top: 0, behavior: "smooth" });
      setShowEgg(false);
    }
  }, [isVisible]);

  const { setIsSectionOnTop } = useSectionScrollable();

  /** 화면에 현재 섹션이 표시될 때 스크롤을 통한 섹션 전환 상태 설정 */
  useEffect(() => {
    const el = ref.current;
    if (isVisible && el) {
      const scrollTop = el.scrollTop;

      setIsSectionOnTop(scrollTop <= 0);
    }
  }, [isVisible, setIsSectionOnTop]);

  /**
   * 내부 스크롤이 최상단에 도달했을 때 상단 섹션으로 이동 가능한 상태로 설정
   */
  const checkSectionScroll = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      setIsSectionOnTop(event.currentTarget.scrollTop <= 0);
    },
    [setIsSectionOnTop]
  );

  return (
    <section
      id="contacts-section"
      className="relative h-recommended snap-center snap-always overflow-scroll bg-pureBlack text-white"
      ref={ref}
      onScroll={checkSectionScroll}
    >
      <div className="relative h-fit w-full">
        <div className="relative z-10 flex w-full flex-col items-center">
          <h1 className="mt-20 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] ">
            Contacts
          </h1>

          <div
            className={`${"mb-24 mt-32 flex flex-col items-center"} ${
              showEgg ? "cursor-open" : "cursor-closed"
            }`}
            onClick={() => setShowEgg(true)}
          >
            <h2 className="text-8xl font-bold">이지훈</h2>
            <h3 className="mt-2 text-6xl font-bold">Lee Jihoon, Anteater</h3>
            <h4 className="mt-8 text-4xl">
              a SW Developer, a FE Engineer, a Programmer
            </h4>
          </div>
          {/* 연락처 리스트 */}
          <div
            id="contacts-list-container"
            className="mt-4 flex w-1/2 flex-col justify-center gap-16"
          >
            <div id="contacts-email" className="flex items-center">
              <ImgContactsEmail.ImageComponent
                className="mr-8 h-16 w-16"
                alt="email"
              />
              <div className="text-4xl">E-mail</div>
              <div className="flex-grow text-right text-4xl font-light underline">
                <a href="mailto:anteater1056@gmail.com">
                  anteater1056@gmail.com
                </a>
              </div>
            </div>
            <div id="contacts-phone" className="flex items-center">
              <ImgContactsPhone.ImageComponent
                className="mr-8 h-16 w-16"
                alt="phone"
              />
              <div className="text-4xl">Phone</div>
              <span className="flex-grow text-right text-4xl font-light">
                010-4174-4150
              </span>
            </div>
            <div id="contacts-github" className="flex items-center">
              <ImgContactsGithub.ImageComponent
                className="mr-8 h-16 w-16"
                alt="github"
              />
              <div className="text-4xl">Github</div>
              <div className="flex-grow text-right text-4xl font-light underline">
                <a
                  href="https://github.com/anteater333"
                  target="_blank"
                  rel="noreferrer"
                >
                  @anteater333
                </a>
              </div>
            </div>
            <div id="contacts-talk" className="flex items-center">
              <ImgContactsTalk.ImageComponent
                className="mr-8 h-16 w-16"
                alt="talk"
              />
              <div className="text-4xl">KakaoTalk</div>
              <span className="flex-grow text-right text-4xl font-light">
                @Anteater333
              </span>
            </div>
            <div id="contacts-instagram" className="flex items-center">
              <ImgContactsInstagram.ImageComponent
                className="mr-8 h-16 w-16"
                alt="instagram"
              />
              <div className="text-4xl">Instagram</div>
              <div className="flex-grow text-right text-4xl font-light underline">
                <a
                  href="https://www.instagram.com/anteater333/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @anteater333
                </a>
              </div>
            </div>
          </div>
          {/* 기타 벳지 및 링크들 */}
          <div className="mt-36">
            <a
              href="https://solved.ac/anteater333/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-48 w-96"
                src="http://mazassumnida.wtf/api/v2/generate_badge?boj=anteater333"
                alt=""
              />
            </a>
          </div>
          <div className="mt-16">
            <a
              href="https://www.buymeacoffee.com/anteater333"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mb-2 inline-block w-full text-center font-galmuri7 text-3xl">
                ☕ Buy me a potion ☕
              </span>
              <ImgContactsBMC.ImageComponent
                className="h-96 w-96 rounded-3xl"
                alt="buy-me-a-coffee"
              />
            </a>
          </div>
          <div className="mb-24 mt-24">
            <a
              href="https://blog.anteater-lab.link"
              target="_blank"
              rel="noreferrer"
            >
              <ImgContactsBlog.ImageComponent alt="blog" />
            </a>
          </div>
          <div className="mb-32  flex flex-col items-center gap-4 font-galmuri7">
            <div className="text-xl">powered by</div>
            <div className="mb-12 flex gap-12">
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <ImgContactsReact.ImageComponent
                  className="object-contain"
                  alt="react"
                />
              </a>

              <a
                className="flex justify-center"
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
              >
                <ImgContactsTailwind.ImageComponent
                  className="object-contain"
                  alt="tailwind"
                />
              </a>

              <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
                <ImgContactsVite.ImageComponent
                  className="object-contain"
                  alt="vite"
                />
              </a>
            </div>
            <div className="text-4xl">Thank you for visiting me!</div>
          </div>
        </div>

        {isVisible && showEgg ? <PMatter /> : undefined}
      </div>
    </section>
  );
}

export default ContactsSection;
