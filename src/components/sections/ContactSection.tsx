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
import imgContacts10Notion from "../../resources/images/contacts/img_s5_10_Notion.png";

import { useImageLoader } from "../../hooks/useImageLoader";
import PMatter from "../PMatter";
import useIntersection from "../../hooks/useIntersection";
import { useSectionScrollable } from "../../hooks/useSectionScrollable";
import { useQuery } from "@tanstack/react-query";
import { getRandomUser, getRandomUsersByNumber } from "../../api";

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
  const ImgContactsNotion = useImageLoader(imgContacts10Notion);

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
      ImgContactsVite.progress +
      ImgContactsNotion.progress;
    const length = 11;
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
    ImgContactsNotion.progress,
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

  // Demonstrating the ability to query to system
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getRandomUsersByNumber(50),
  });

  useEffect(() => {
    if (isLoading) {
      console.log("RANDOMUSER :: loading...");
      return;
    }

    console.log("RANDOMUSER :: ");
    console.log(userData);

    getRandomUsersByNumber(50);
  }, [userData, isLoading]);

  return (
    <section
      id="contacts-section"
      className="relative h-recommended snap-center snap-always overflow-scroll bg-pureBlack text-white"
      ref={ref}
      onScroll={checkSectionScroll}
    >
      <div className="relative h-fit w-full">
        <div className="relative z-10 flex w-full flex-col items-center">
          <h1 className="mt-14 border-b-[1rem] border-b-white text-8xl font-bold md:mt-20 md:text-10xl md:leading-[10rem] ">
            Contacts
          </h1>

          <div
            className={`${"mb-12 mt-12 flex flex-col items-center md:mb-24 md:mt-32"} ${
              showEgg ? "cursor-open" : "cursor-closed"
            }`}
            onClick={() => setShowEgg(true)}
          >
            <h2 className="text-7xl font-bold md:text-8xl">이지훈</h2>
            <h3 className="mt-2 text-5xl font-bold md:text-6xl">
              Lee Jihoon, Anteater
            </h3>
            <h4 className="mt-4 whitespace-nowrap text-xl md:mt-8 md:text-4xl">
              a SW Developer, a FE Engineer, a Programmer
            </h4>
          </div>
          {/* 연락처 리스트 */}
          <div
            id="contacts-list-container"
            className="flex w-3/4 flex-col justify-center gap-8 text-xl font-bold md:mt-4 md:w-1/2 md:min-w-[42rem] md:gap-16 md:text-4xl md:font-normal"
          >
            <div id="contacts-email" className="flex items-center">
              <ImgContactsEmail.ImageComponent
                className="mr-4 h-8 w-8 md:mr-8 md:h-16 md:w-16"
                alt="email"
              />
              <div className="">E-mail</div>
              <div className="flex-grow text-right font-light underline">
                <a href="mailto:anteater1056@gmail.com">
                  anteater1056@gmail.com
                </a>
              </div>
            </div>
            <div id="contacts-phone" className="flex items-center">
              <ImgContactsPhone.ImageComponent
                className="mr-4 h-8 w-8 md:mr-8 md:h-16 md:w-16"
                alt="phone"
              />
              <div className="">Phone</div>
              <span className="flex-grow text-right font-light">
                010-4174-4150
              </span>
            </div>
            <div id="contacts-github" className="flex items-center">
              <ImgContactsGithub.ImageComponent
                className="mr-4 h-8 w-8 md:mr-8 md:h-16 md:w-16"
                alt="github"
              />
              <div className="">Github</div>
              <div className="flex-grow text-right font-light underline">
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
                className="mr-4 h-8 w-8 md:mr-8 md:h-16 md:w-16"
                alt="talk"
              />
              <div className="">KakaoTalk</div>
              <span className="flex-grow text-right font-light">
                @Anteater333
              </span>
            </div>
            <div id="contacts-instagram" className="flex items-center">
              <ImgContactsInstagram.ImageComponent
                className="mr-4 h-8 w-8 md:mr-8 md:h-16 md:w-16"
                alt="instagram"
              />
              <div className="">Instagram</div>
              <div className="flex-grow text-right font-light underline">
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
          <div className="mt-12 flex flex-col gap-6 font-galmuri7 md:mt-24">
            <p className="text-center text-xl">more sites</p>
            <div className="flex gap-36 text-right text-lg">
              <a
                href="https://blog.anteater-lab.link"
                target="_blank"
                rel="noreferrer"
              >
                <ImgContactsBlog.ImageComponent alt="blog" />
                <p className="">ver. Blog</p>
              </a>
              <a
                href="https://past-silver-b67.notion.site/Lee-Jihoon-Anteater-42a1ebc80b2e44688f0dd99598f019de"
                target="_blank"
                rel="noreferrer"
              >
                <ImgContactsNotion.ImageComponent
                  className="object-contain"
                  alt="notion"
                />
                <p className="mt-6">ver. Notion</p>
              </a>
            </div>
          </div>

          <div className="mt-16">
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
              <span className="mb-2 inline-block w-full text-center font-galmuri7 text-2xl md:text-3xl">
                ☕ Buy me a potion ☕
              </span>
              <ImgContactsBMC.ImageComponent
                className="h-72 w-72 rounded-3xl md:h-96 md:w-96"
                alt="buy-me-a-coffee"
              />
            </a>
          </div>

          <div className="mb-32 mt-24 flex flex-col items-center gap-4 px-8 font-galmuri7">
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
            <div className="text-2xl md:text-4xl">
              Thank you for visiting me!
            </div>
          </div>
        </div>

        {isVisible && showEgg ? <PMatter /> : undefined}
      </div>
    </section>
  );
}

export default ContactsSection;
