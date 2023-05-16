import { useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import imgContacts00Email from "../../resources/images/contacts/img_s5_00_Email.png";
import imgContacts01Phone from "../../resources/images/contacts/img_s5_01_Phone.png";
import imgContacts02Github from "../../resources/images/contacts/img_s5_02_Github.png";
import imgContacts03Talk from "../../resources/images/contacts/img_s5_03_Talk.png";
import imgContacts04Instagram from "../../resources/images/contacts/img_s5_04_Instagram.png";
import imgContacts05Blog from "../../resources/images/contacts/img_s5_05_blog.png";
import imgContacts06BMC from "../../resources/images/contacts/img_s5_06_BMC.png";
import { useImageLoader } from "../../hooks/useImageLoader";
import PMatter from "../PMatter";
import useIntersection from "../../hooks/useIntersection";

function ContactsSection({ updateLoadingProgress }: SectionProps) {
  const ImgContactsEmail = useImageLoader(imgContacts00Email);
  const ImgContactsPhone = useImageLoader(imgContacts01Phone);
  const ImgContactsGithub = useImageLoader(imgContacts02Github);
  const ImgContactsTalk = useImageLoader(imgContacts03Talk);
  const ImgContactsInstagram = useImageLoader(imgContacts04Instagram);
  const ImgContactsBlog = useImageLoader(imgContacts05Blog);
  const ImgContactsBMC = useImageLoader(imgContacts06BMC);

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
      ImgContactsBMC.progress;
    const length = 7;
    updateLoadingProgress(total / length, 4);
  }, [
    ImgContactsBMC.progress,
    ImgContactsBlog.progress,
    ImgContactsEmail.progress,
    ImgContactsGithub.progress,
    ImgContactsInstagram.progress,
    ImgContactsPhone.progress,
    ImgContactsTalk.progress,
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

  return (
    <section
      id="contacts-section"
      className="relative h-recommended snap-center overflow-scroll bg-pureBlack text-white"
      ref={ref}
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
            <h3 className="mt-2 text-6xl font-bold">Lee Ji-hoon, Anteater</h3>
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
          <div className="mb-40 mt-24">
            <a
              href="https://blog.anteater-lab.link"
              target="_blank"
              rel="noreferrer"
            >
              <ImgContactsBlog.ImageComponent alt="blog" />
            </a>
          </div>
        </div>

        {isVisible && showEgg ? <PMatter /> : undefined}
      </div>
    </section>
  );
}

export default ContactsSection;
