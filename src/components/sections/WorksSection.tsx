import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import {
  Canvas,
  GroupProps,
  RootState,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  useGLTF,
  useProgress,
  PerspectiveCamera,
  SpotLight,
  useDepthBuffer,
  RoundedBox,
} from "@react-three/drei";
import {
  Vector3,
  SpotLight as TSpotLight,
  PointLight,
  Color,
  PerspectiveCamera as TPerspectiveCamera,
} from "three";

import SimpleImageSlider from "react-simple-image-slider";

import { deg2RadXYZ } from "../../utils/mathUtils";

import ICOGithub from "../../resources/images/common/github.png";
import ICOHome from "../../resources/images/common/home.png";
import ICOBlog from "../../resources/images/common/blog.png";

import imgWorks00 from "../../resources/images/works/img_s4_00_logo_AIQA.png";
import imgWorks01 from "../../resources/images/works/img_s4_01_logo_DeZipper.png";
import imgWorks02 from "../../resources/images/works/img_s4_02_logo_Ill.png";
import imgWorks03 from "../../resources/images/works/img_s4_03_logo_Lab.png";
import imgWorks04 from "../../resources/images/works/img_s4_04_logo_Monallog.png";
import imgWorks05 from "../../resources/images/works/img_s4_05_logo_QUE.png";
import imgWorks06 from "../../resources/images/works/img_s4_06_logo_Soup.png";
import imgWorks07 from "../../resources/images/works/img_s4_07_logo_theWhiteboard.png";
import imgWorks08 from "../../resources/images/works/img_s4_08_logo_domado.png";

import imgWorks00SS00 from "../../resources/images/works/screenshots/AIQA00.png";
import imgWorks00SS01 from "../../resources/images/works/screenshots/AIQA01.gif";
import imgWorks00SS02 from "../../resources/images/works/screenshots/AIQA02.png";
import imgWorks00SS03 from "../../resources/images/works/screenshots/AIQA03.png";
import imgWorks01SS00 from "../../resources/images/works/screenshots/DeZipper00.png";
import imgWorks02SS00 from "../../resources/images/works/screenshots/Ill00.png";
import imgWorks02SS01 from "../../resources/images/works/screenshots/Ill01.png";
import imgWorks03SS00 from "../../resources/images/works/screenshots/Lab00.png";
import imgWorks03SS01 from "../../resources/images/works/screenshots/Lab01.png";
import imgWorks03SS02 from "../../resources/images/works/screenshots/Lab02.png";
import imgWorks04SS00 from "../../resources/images/works/screenshots/Monallog00.gif";
import imgWorks05SS00 from "../../resources/images/works/screenshots/QUE00.png";
import imgWorks05SS01 from "../../resources/images/works/screenshots/QUE01.png";
import imgWorks05SS02 from "../../resources/images/works/screenshots/QUE02.png";
import imgWorks05SS03 from "../../resources/images/works/screenshots/QUE03.png";
import imgWorks05SS04 from "../../resources/images/works/screenshots/QUE04.png";
import imgWorks06SS00 from "../../resources/images/works/screenshots/Soup00.png";
import imgWorks06SS01 from "../../resources/images/works/screenshots/Soup01.png";
import imgWorks06SS02 from "../../resources/images/works/screenshots/Soup02.png";
import imgWorks07SS00 from "../../resources/images/works/screenshots/theWhiteboard00.gif";
import imgWorks07SS01 from "../../resources/images/works/screenshots/theWhiteboard01.png";
import imgWorks07SS02 from "../../resources/images/works/screenshots/theWhiteboard02.png";
import imgWorks08SS00 from "../../resources/images/works/screenshots/domado01.png";
import imgWorks08SS01 from "../../resources/images/works/screenshots/domado02.png";
import imgWorks08SS02 from "../../resources/images/works/screenshots/domado03.png";

import useIntersection from "../../hooks/useIntersection";
import { ImgComponentType, useImageLoader } from "../../hooks/useImageLoader";

const worksArray: {
  workId: string;
  url: string;
  logoImg: ImgComponentType;
  screenshots: string[];
  title: string;
  smallTitle?: boolean;
  year: string;
  summary: string;
  platform: string;
  repoUrl?: string;
  reviewUrl?: string;
  site?: string;
  description: string;
  features: string[];
  techStack: string[];
}[] = [
  {
    workId: "AIQA",
    url: "./3d/AIQA.glb",
    screenshots: [
      imgWorks00SS00,
      imgWorks00SS01,
      imgWorks00SS02,
      imgWorks00SS03,
    ],
    logoImg: () => <></>,
    title: "AIQA",
    description:
      "AIQA는 인공지능 학습에 사용될 데이터셋의 품질을 관리하는 솔루션입니다. 제 12기 소프트웨어 마에스트로 팀 프로젝트였습니다.",
    year: "2021-2023",
    platform: "Web Service",
    summary: "인공지능 데이터 품질 관리 솔루션",
    features: [
      "대규모 File IO 처리",
      "데이터셋 품질에 대한 대시보드 제공",
      "이미지 데이터셋 유사도 측정",
      "데이터셋 검사 보고서 자동 생성",
    ],
    techStack: [
      "팀 프로젝트 (에이전트 개발 담당)",
      "Vue & NestJS",
      "Node.js IPC",
      "Pandas & numpy",
    ],
    repoUrl: "https://github.com/anteater333/aiqa-agent",
  },
  {
    workId: "DeZipper",
    url: "./3d/DeZipper.glb",
    screenshots: [imgWorks01SS00],
    logoImg: () => <></>,
    title: "DeZipper",
    description:
      "DeZipper는 압축 파일의 구조를 해석한 다음 목표 폴더를 지정해 압축 파일에서 나온 파일을 삭제하는 프로그램입니다. 여러 압축 파일이 한 폴더 내부에 혼재되어 있을 경우 효과적입니다.",
    year: "2017",
    platform: "Windows Application",
    summary: "되-짚어, 압축 파일 삭제 프로그램",
    features: ["Zip 파일 구조 해석", "CLI, GUI 지원", "휴지통으로 보내기"],
    techStack: ["개인 프로젝트", "C#", ".NET Windows Forms"],
    repoUrl: "https://github.com/anteater333/DeZipper",
    site: "",
  },
  {
    workId: "Ill",
    url: "./3d/Ill.glb",
    screenshots: [imgWorks02SS00, imgWorks02SS01],
    logoImg: () => <></>,
    title: "오늘 할 일",
    description:
      "오늘 할 일은 2018년 사회복무요원으로 복무하면서 처음 배정받은 업무들을 관리하고 기억하기 위해 개발한 프로그램 입니다. 원격 서버로부터 텍스트 파일을 읽어 오늘 하기로 한 일이 무엇이었는지 확인할 수 있습니다.",
    year: "2018",
    platform: "Windows Application",
    summary: "일상적 할 일 리마인더",
    features: ["텍스트 파일 파싱", "시작 프로그램 설정"],
    techStack: ["개인 프로젝트", "C#", ".NET Windows Forms"],
    repoUrl: "https://github.com/anteater333/Oneul-Hal-Il",
    site: "",
  },
  {
    workId: "Lab",
    url: "./3d/Lab.glb",
    screenshots: [imgWorks03SS00, imgWorks03SS01, imgWorks03SS02],
    logoImg: () => <></>,
    title: "Anteater's laboratory",
    smallTitle: true,
    description:
      "Jekyll로 구축한 개인 기술 블로그입니다. 개발 중 해결했던 자잘한 해결책들, 독후감, 특정 용어에 대한 고찰 등 다양한 주제의 글을 작성하고 있습니다.",
    year: "2021",
    platform: "Web Service",
    summary: "개인 블로그",
    features: ["ToC 자동생성", "댓글", "Reading Progressbar"],
    techStack: ["Jekyll", "Sass", "Vanilla JS"],
    repoUrl: "https://github.com/anteater333/anteater333.github.io",
    site: "https://blog.anteater-lab.link/",
  },
  {
    workId: "Monallog",
    url: "./3d/Monallog.glb",
    screenshots: [imgWorks04SS00],
    logoImg: () => <></>,
    title: "Monallog",
    description:
      'Monallog는 휘발되는 메시지를 주고받는 SNS라는 기획으로 개발을 시작한 프로젝트입니다. 사용자가 "채널"에서 실시간으로 떠다니는 메시지를 캡처할 수 있도록 만드는 것이 목표였으나 최종적으로 프로젝트가 드롭되었습니다.',
    year: "2019",
    platform: "Web Service",
    summary: "집단적 독백",
    features: [
      "실시간 메시지 교환",
      "휘발성 메시지",
      "감성적인 음악과 배경사진",
    ],
    techStack: ["개인 프로젝트 (풀스택 개발)", "Vue", "Express", "Socket.IO"],
    repoUrl: "https://github.com/anteater333?tab=repositories&q=monallog",
    site: "",
  },
  {
    workId: "QUE",
    url: "./3d/QUE.glb",
    screenshots: [
      imgWorks05SS00,
      imgWorks05SS01,
      imgWorks05SS02,
      imgWorks05SS03,
      imgWorks05SS04,
    ],
    logoImg: () => <></>,
    title: "QUE",
    description:
      "QUE는 노래에 특화된 유튜브를 만들어보자는 아이디어에서 시작한 프로젝트입니다. 노래를 부르는 영상을 업로드하고 평가받을 수 있는 플랫폼을 만드는 것이 목표입니다.",
    year: "2022",
    platform: "Cross-platform Application",
    summary: '"당신의 콘서트를 시작하세요"',
    features: [
      "영상 업로드",
      "영상 내 타임라인 좋아요",
      "이메일 인증",
      "소셜 로그인",
    ],
    techStack: ["개인 프로젝트", "React Native", "Firebase", "Deno"],
    repoUrl: "https://github.com/anteater333?tab=repositories&q=que",
    site: "https://que-web.vercel.app/",
  },
  {
    workId: "Soup",
    url: "./3d/Soup.glb",
    screenshots: [imgWorks06SS00, imgWorks06SS01, imgWorks06SS02],
    logoImg: () => <></>,
    title: "숲Soup",
    description:
      "숲은 2022년 어느날 혼자서 진행했던 해커톤에서 시작한 프로젝트입니다. '이 검색어가 왜 실검에 있지?'란 의문을 자주 하는 사람들을 위한 서비스입니다.",
    year: "2022",
    platform: "Web Service",
    summary: '"가끔은 나무 대신 숲을 봐야 할 때도 있습니다."',
    features: ["나무위키 실시간 검색어 크롤링", "인스턴트 메모"],
    techStack: ["React", "Express"],
    repoUrl: "https://github.com/anteater333/namu-soup",
    reviewUrl:
      "https://blog.anteater-lab.link/memoir/2023/09/09/memoir-soup-1.html",
    site: "https://soup.anteater-lab.link",
  },
  {
    workId: "theWhiteboard",
    url: "./3d/theWhiteboard.glb",
    screenshots: [imgWorks07SS00, imgWorks07SS01, imgWorks07SS02],
    logoImg: () => <></>,
    title: "Whiteboard",
    description:
      "Whiteboard는 메모판과 메모 형태로 포스팅을 기록하는 웹 사이트입니다.",
    year: "2023",
    platform: "Web Service",
    summary: "Post-it!",
    features: ["메모 위치 선택", "컴포넌트 확대/축소/이동"],
    techStack: ["Next.js"],
    repoUrl: "https://github.com/anteater333/whiteboard",
    site: "https://whiteboard-puce.vercel.app/",
  },
  {
    workId: "domado",
    url: "./3d/domado.glb",
    screenshots: [imgWorks08SS00, imgWorks08SS01, imgWorks08SS02],
    logoImg: () => <></>,
    title: "domado",
    description: "domado 뽀모도로 타이머, 웹에서 동작합니다.",
    year: "2024",
    platform: "Web Service",
    summary: "뽀모도로 타이머",
    features: [""],
    techStack: ["React", "PWA"],
    repoUrl: "https://github.com/anteater333/domado",
    site: "https://domado.vercel.app/",
  },
];

const Model = (props: GroupProps & { index: number }) => {
  const { scene } = useGLTF(worksArray[props.index].url);

  return (
    <group
      onPointerEnter={() => {
        document.body.classList.add("cursor-pointer");
      }}
      onPointerLeave={() => {
        document.body.classList.remove("cursor-pointer");
      }}
      castShadow
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
};

function WorksSection({ updateLoadingProgress }: SectionProps) {
  const ImgWorks00 = useImageLoader(imgWorks00);
  const ImgWorks01 = useImageLoader(imgWorks01);
  const ImgWorks02 = useImageLoader(imgWorks02);
  const ImgWorks03 = useImageLoader(imgWorks03);
  const ImgWorks04 = useImageLoader(imgWorks04);
  const ImgWorks05 = useImageLoader(imgWorks05);
  const ImgWorks06 = useImageLoader(imgWorks06);
  const ImgWorks07 = useImageLoader(imgWorks07);
  const ImgWorks08 = useImageLoader(imgWorks08);

  /** Intersection Observer 사용 */
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { progress: threeProgress } = useProgress();

  useEffect(() => {
    // 하ㅏㅏㅏㅏrrrrrrrr드 코딩 1
    const total =
      ImgWorks00.progress +
      ImgWorks01.progress +
      ImgWorks02.progress +
      ImgWorks03.progress +
      ImgWorks04.progress +
      ImgWorks05.progress +
      ImgWorks06.progress +
      ImgWorks07.progress +
      ImgWorks08.progress +
      threeProgress;
    const length = 10;
    updateLoadingProgress(total / length, 3);
  }, [
    updateLoadingProgress,
    threeProgress,
    ImgWorks00.progress,
    ImgWorks01.progress,
    ImgWorks02.progress,
    ImgWorks03.progress,
    ImgWorks04.progress,
    ImgWorks05.progress,
    ImgWorks06.progress,
    ImgWorks07.progress,
    ImgWorks08.progress,
  ]);

  useEffect(() => {
    // 하ㅏㅏㅏㅏrrrrrrrr드 코딩 2
    worksArray[0].logoImg = ImgWorks00.ImageComponent;
    worksArray[1].logoImg = ImgWorks01.ImageComponent;
    worksArray[2].logoImg = ImgWorks02.ImageComponent;
    worksArray[3].logoImg = ImgWorks03.ImageComponent;
    worksArray[4].logoImg = ImgWorks04.ImageComponent;
    worksArray[5].logoImg = ImgWorks05.ImageComponent;
    worksArray[6].logoImg = ImgWorks06.ImageComponent;
    worksArray[7].logoImg = ImgWorks07.ImageComponent;
    worksArray[8].logoImg = ImgWorks08.ImageComponent;
  }, [
    ImgWorks00.ImageComponent,
    ImgWorks01.ImageComponent,
    ImgWorks02.ImageComponent,
    ImgWorks03.ImageComponent,
    ImgWorks04.ImageComponent,
    ImgWorks05.ImageComponent,
    ImgWorks06.ImageComponent,
    ImgWorks07.ImageComponent,
    ImgWorks08.ImageComponent,
  ]);

  const [selectedItem, setSelectedItem] = useState(worksArray[0]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [isFading, setIsFading] = useState(false);

  const handleWorkItemClicked = useCallback((index: number) => {
    setSelectedItemIndex(index);
    setTimeout(() => {
      setIsFading(true);
    }, 50);
  }, []);

  /** 사용자가 선택한 아이템의 Index에 따라 State 변경 */
  useEffect(() => {
    if (selectedItemIndex >= 0) {
      setSelectedItem(worksArray[selectedItemIndex]);
    }
  }, [selectedItemIndex]);

  const MemoedSlider = useMemo(() => {
    return () => (
      <div className="shadow-xl">
        <SimpleImageSlider
          width={"600px"}
          height={"400px"}
          images={selectedItem.screenshots}
          showNavs={false}
          showBullets={false}
          autoPlay={selectedItem.screenshots.length > 1}
          autoPlayDelay={5}
          slideDuration={1.5}
          bgColor="#ffffff"
        />
      </div>
    );
  }, [selectedItem.screenshots]);

  const [showImgSlider, setShowImgSlider] = useState(false);

  return (
    <section
      ref={ref}
      id="works-section"
      className="relative h-recommended snap-center overflow-hidden"
    >
      <div
        className="absolute bottom-10 left-16 z-30 rounded-3xl bg-white p-5 opacity-80"
        style={{
          background: isFading ? "transparent" : undefined,
        }}
      >
        <h1 className="border-b-[1rem] border-b-indigo-500 text-10xl font-bold leading-[10rem] text-indigo-500">
          Works
        </h1>
      </div>

      {selectedItemIndex < 0 ? undefined : (
        <div className="h-full w-full">
          {showImgSlider ? (
            <div
              className="absolute z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-80"
              onClick={(event) => {
                setShowImgSlider(false);
              }}
            >
              <div
                className="rsis-parent h-4/5 w-3/5 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <SimpleImageSlider
                  width={"50%"}
                  height={"80%"}
                  images={selectedItem.screenshots}
                  showNavs={selectedItem.screenshots.length > 1}
                  showBullets={selectedItem.screenshots.length > 1}
                  bgColor="#222222"
                />
              </div>
            </div>
          ) : undefined}
          <div
            className="absolute z-10 flex h-full w-full bg-white bg-opacity-95 pl-16 pr-32 pt-36 transition-opacity"
            style={{
              opacity: isFading ? "100" : "0",
            }}
            onClick={() => {
              setIsFading(false);
              setTimeout(() => {
                setSelectedItemIndex(-1);
              }, 150);
            }}
          >
            <div id="works-description-left" className="pr-10 pt-20">
              <selectedItem.logoImg
                className="h-[440px] w-[480px] rounded-3xl object-contain p-8 shadow-xl"
                alt={selectedItem.workId}
              />
            </div>
            <div
              id="works-description-right"
              className="flex flex-grow flex-col pl-12"
            >
              <div id="works-description-right-top" className="flex">
                <div
                  className={
                    selectedItem.smallTitle ? "flex h-28 flex-col" : ""
                  }
                >
                  <span
                    className={`${"font-bold"} ${
                      selectedItem.smallTitle ? "text-6xl" : "text-8xl"
                    }`}
                  >
                    {selectedItem.title}
                  </span>
                  <span
                    className={`${"text-3xl"} ${
                      selectedItem.smallTitle
                        ? "h-[3.25rem] leading-relaxed"
                        : ""
                    }`}
                  >
                    ({selectedItem.year})
                  </span>
                </div>
                <div className="flex flex-grow flex-col items-end gap-2 text-5xl">
                  <span>{selectedItem.platform}</span>

                  <div className="flex gap-4">
                    {selectedItem.site ? (
                      <a
                        href={selectedItem.site}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <img className="h-10" src={ICOHome} alt="hp" />
                      </a>
                    ) : undefined}
                    {selectedItem.repoUrl ? (
                      <a
                        href={selectedItem.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <img className="h-10" src={ICOGithub} alt="gh" />
                      </a>
                    ) : undefined}
                    {selectedItem.reviewUrl ? (
                      <a
                        href={selectedItem.reviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <img className="h-10" src={ICOBlog} alt="review" />
                      </a>
                    ) : undefined}
                  </div>
                </div>
              </div>
              <div
                id="works-description-right-middle"
                className="mb-12 mt-2 text-5xl"
              >
                {selectedItem.summary}
              </div>
              <div
                id="works-description-right-bottom"
                className="flex justify-between"
              >
                <div className="flex flex-col gap-20">
                  <div>
                    <h2 className="mb-4 text-4xl font-bold">Features</h2>
                    <ul className="h-40 max-w-lg list-disc break-keep pl-8 text-3xl [&>li]:mb-4">
                      {selectedItem.features.map((feat) => (
                        <li>{feat}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-4xl font-bold">Tech Stack</h2>
                    <ul className="h-40 max-w-lg list-disc break-keep pl-8 text-3xl [&>li]:mb-4">
                      {selectedItem.techStack.map((tech) => (
                        <li>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-12">
                  <div className="inline h-24 w-[600px] border-l-4 border-indigo-500 pl-4 text-2xl">
                    {selectedItem.description}
                  </div>
                  <div className="mt-4 w-[600px]">
                    {selectedItem.screenshots.length > 0 ? (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowImgSlider(true);
                        }}
                      >
                        <MemoedSlider />
                      </button>
                    ) : undefined}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-0 h-full w-full" onClick={() => {}}>
        <Canvas shadows>
          <PCamera initialState={!isVisible} />

          <PLight showLight={selectedItemIndex < 0} initialState={!isVisible} />

          <PWorld />

          <Model
            // AIQA
            index={0}
            position={[0.7, 0, 0.25]}
            rotation={deg2RadXYZ(0, 15, 0)}
            onClick={() => handleWorkItemClicked(0)}
          />
          <Model
            // DeZipper
            index={1}
            position={[-1.1, 0, -0.5]}
            rotation={deg2RadXYZ(0, 21, 0)}
            onClick={() => handleWorkItemClicked(1)}
          />
          <Model
            // Ill
            index={2}
            position={[-1.7, 0, 0.15]}
            rotation={deg2RadXYZ(0, -36, 0)}
            onClick={() => handleWorkItemClicked(2)}
          />
          <Model
            // Lab
            index={3}
            position={[-0.2, 0, 0.8]}
            rotation={deg2RadXYZ(0, -54, 0)}
            onClick={() => handleWorkItemClicked(3)}
          />
          <Model
            // Monallog
            index={4}
            position={[1.7, 0, -0.3]}
            rotation={deg2RadXYZ(0, -32, 0)}
            onClick={() => handleWorkItemClicked(4)}
          />
          <Model
            // QUE
            index={5}
            position={[0.3, 0, -0.6]}
            rotation={deg2RadXYZ(0, -25, 0)}
            onClick={() => handleWorkItemClicked(5)}
          />
          <Model
            // Soup
            index={6}
            position={[-0.3, 0, -0.1]}
            rotation={deg2RadXYZ(0, 19, 0)}
            onClick={() => handleWorkItemClicked(6)}
          />
          <Model
            // theWhiteboard
            index={7}
            position={[1.25, 0, 0.7]}
            rotation={deg2RadXYZ(0, 25, 0)}
            onClick={() => handleWorkItemClicked(7)}
          />
          <Model
            // domado
            index={8}
            position={[-1, 0, 0.6]}
            rotation={deg2RadXYZ(0, 25, 0)}
            scale={[0.001, 0.001, 0.001]}
            onClick={() => handleWorkItemClicked(8)}
          />
        </Canvas>
      </div>
    </section>
  );
}

function PWorld() {
  return (
    <>
      {/* Floor */}
      <mesh rotation={deg2RadXYZ(-90, 0, 0)} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshLambertMaterial attach="material" color="#6366f1" />
      </mesh>
      {/* Decorations */}
      <group receiveShadow>
        <RoundedBox
          position={[2, 0.15, -1.3]}
          rotation={deg2RadXYZ(0, 45, 0)}
          args={[0.33, 0.33, 0.33]}
        >
          <meshPhongMaterial color="#ffb048" />
        </RoundedBox>

        <RoundedBox
          position={[1.6, 0.15, -1.4]}
          rotation={deg2RadXYZ(0, -25, 0)}
          args={[0.2, 0.2, 0.2]}
        >
          <meshPhongMaterial color="#a9ff59" />
        </RoundedBox>

        <mesh position={[1.7, 0.15, -1.1]} rotation={deg2RadXYZ(0, 0, 0)}>
          <sphereBufferGeometry attach="geometry" args={[0.15, 32, 32]} />
          <meshLambertMaterial attach="material" color="#59ffe9" />
        </mesh>
        <mesh position={[-1, 0.15, -1.2]} rotation={deg2RadXYZ(0, 0, 0)}>
          <sphereBufferGeometry attach="geometry" args={[0.12, 32, 32]} />
          <meshLambertMaterial attach="material" color="#ff8fbe" />
        </mesh>

        <RoundedBox
          position={[-1.8, 0.15, -1.3]}
          rotation={deg2RadXYZ(0, 12, 0)}
          args={[0.33, 0.33, 0.33]}
        >
          <meshPhongMaterial color="#fbff2a" />
        </RoundedBox>

        <mesh position={[-1.25, 0.15, -1.1]} rotation={deg2RadXYZ(0, -25, 0)}>
          <cylinderBufferGeometry attach="geometry" args={[0.1, 0.1, 0.2]} />
          <meshLambertMaterial attach="material" color="#00d32e" />
        </mesh>

        <RoundedBox
          position={[-1.4, 0.15, -1.4]}
          rotation={deg2RadXYZ(0, 26, 0)}
          args={[0.22, 0.22, 0.22]}
        >
          <meshPhongMaterial color="#0370ff" />
        </RoundedBox>

        <mesh position={[0.1, 0.15, -1.4]} rotation={deg2RadXYZ(90, 0, 78)}>
          <cylinderBufferGeometry attach="geometry" args={[0.11, 0.11, 0.5]} />
          <meshLambertMaterial attach="material" color="#e96f1d" />
        </mesh>
        <mesh position={[0.7, 0.15, -1.5]} rotation={deg2RadXYZ(0, 0, 0)}>
          <sphereBufferGeometry attach="geometry" args={[0.25, 32, 32]} />
          <meshLambertMaterial attach="material" color="#67ff2b" />
        </mesh>

        <RoundedBox
          position={[-2.1, 0.15, -0.6]}
          rotation={deg2RadXYZ(90, 0, 12)}
          args={[0.15, 0.5, 0.15]}
        >
          <meshPhongMaterial color="#da3636" />
        </RoundedBox>
        <RoundedBox
          position={[2.1, 0.15, -0.9]}
          rotation={deg2RadXYZ(90, 0, 12)}
          args={[0.2, 0.2, 0.15]}
        >
          <meshPhongMaterial color="#9036da" />
        </RoundedBox>
        <RoundedBox
          position={[2.3, 0.15, 0.2]}
          rotation={deg2RadXYZ(90, 0, 52)}
          args={[0.15, 0.3, 0.15]}
        >
          <meshPhongMaterial color="#63d81f" />
        </RoundedBox>
      </group>
    </>
  );
}

function PCamera({ vec = new Vector3(), initialState = true }) {
  const camera = useRef<TPerspectiveCamera>(null!);

  const frameHandler = useCallback(
    (state: RootState) => {
      if (initialState) {
        camera.current?.position.lerp(vec.set(0, 5, 2), 0.05);
      } else {
        camera.current?.position.lerp(
          vec.set(-0 + state.mouse.x / 2, 2.5, 0.5 - state.mouse.y / 2),
          0.1
        );
        camera.current?.rotation.set(...deg2RadXYZ(-80 + state.mouse.x, 0, 0));
      }

      camera.current?.updateMatrixWorld();
    },
    [initialState, vec]
  );
  useFrame(frameHandler);

  return (
    <>
      <PerspectiveCamera ref={camera} makeDefault />
    </>
  );
}

function PLight({ showLight = true, initialState = true }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const globalLight = useRef<PointLight>(null!);

  useFrame(() => {
    if (initialState) globalLight.current.color.lerp(new Color("#000000"), 0.2);
    else if (showLight)
      globalLight.current.color.lerp(new Color("#ffffff"), 0.01);
    else globalLight.current.color.lerp(new Color("#999999"), 0.1);
    globalLight.current?.updateMatrixWorld();
  });

  return (
    <>
      <pointLight ref={globalLight} position={[0, 5, 0]} intensity={0.75} />

      <MovingSpot
        depthBuffer={depthBuffer}
        showLight={showLight}
        initialState={initialState}
        position={[0.5, 5, 0]}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        showLight={showLight}
        initialState={initialState}
        position={[0.5, 5, 0]}
      />
    </>
  );
}

function MovingSpot({
  vec = new Vector3(),
  showLight = false,
  initialState = true,
  color = "#ffffff",
  ...props
}) {
  const light = useRef<TSpotLight>(null);
  const viewport = useThree((state) => state.viewport);

  const frameHandler = useCallback(
    (state: RootState) => {
      if (showLight && !initialState)
        light.current?.color.lerp(new Color(color), 0.05);
      else light.current?.color.lerp(new Color("#000000"), 0.5);

      light.current?.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          0,
          -(state.mouse.y * viewport.height) / 2
        ),
        0.05
      );
      light.current?.target.updateMatrixWorld();
    },
    [color, initialState, showLight, vec, viewport.height, viewport.width]
  );
  useFrame(frameHandler);

  return (
    <SpotLight
      shadowCameraFov={undefined}
      shadowCameraLeft={undefined}
      shadowCameraRight={undefined}
      shadowCameraTop={undefined}
      shadowCameraBottom={undefined}
      shadowCameraNear={undefined}
      shadowCameraFar={undefined}
      shadowBias={undefined}
      shadowMapWidth={undefined}
      shadowMapHeight={undefined}
      castShadow
      ref={light}
      penumbra={1}
      distance={8}
      angle={0.3}
      attenuation={5}
      anglePower={4}
      intensity={2.5}
      {...props}
    />
  );
}

export default WorksSection;
