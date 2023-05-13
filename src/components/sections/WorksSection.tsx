import { useCallback, useEffect, useRef, useState } from "react";
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

import PHill from "../../resources/images/works/PHill.png";
import PHill2 from "../../resources/images/works/placeholder2.png";
import ICOGithub from "../../resources/images/common/github.png";

import imgWorks00 from "../../resources/images/works/img_s4_00_logo_AIQA.png";
import imgWorks01 from "../../resources/images/works/img_s4_01_logo_DeZipper.png";
import imgWorks02 from "../../resources/images/works/img_s4_02_logo_Ill.png";
import imgWorks03 from "../../resources/images/works/img_s4_03_logo_Lab.png";
import imgWorks04 from "../../resources/images/works/img_s4_04_logo_Monallog.png";
import imgWorks05 from "../../resources/images/works/img_s4_05_logo_QUE.png";
import imgWorks06 from "../../resources/images/works/img_s4_06_logo_Soup.png";
import imgWorks07 from "../../resources/images/works/img_s4_07_logo_theWhiteboard.png";

import useIntersection from "../../hooks/useIntersection";
import { ImgComponentType, useImageLoader } from "../../hooks/useImageLoader";

const worksArray: {
  workId: string;
  url: string;
  logoImg: ImgComponentType;
  screenshots: ImgComponentType[];
  title: string;
  year: string;
  summary: string;
  platform: string;
  repoUrl?: string;
  site?: string;
  description: string;
  features: string[];
  techStack: string[];
}[] = [
  {
    workId: "AIQA",
    url: "/3d/AIQA.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "AIQA",
    description:
      "AIQA는 인공지능 학습에 사용될 데이터셋의 품질을 관리하는 솔루션입니다. [제 12기 소프트웨어 마에스트로 팀 프로젝트]",
    year: "2021",
    platform: "Web Service",
    summary: "인공지능 데이터 품질 관리 솔루션",
    features: [
      "대규모 File IO 처리",
      "데이터셋 품질에 대한 시각적 인사이트 제공",
      "이미지 데이터셋 유사도 측정",
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
    url: "/3d/DeZipper.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "Ill",
    url: "/3d/Ill.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "Lab",
    url: "/3d/Lab.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "Monallog",
    url: "/3d/Monallog.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "QUE",
    url: "/3d/QUE.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "Soup",
    url: "/3d/Soup.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
  {
    workId: "theWhiteboard",
    url: "/3d/theWhiteboard.glb",
    screenshots: [],
    logoImg: () => <></>,
    title: "",
    description: "",
    year: "",
    platform: "",
    summary: "",
    features: [],
    techStack: [],
    repoUrl: "",
    site: "",
  },
];

const Model = (props: GroupProps & { index: number }) => {
  const { scene } = useGLTF(worksArray[props.index].url);

  return (
    <group
      onPointerEnter={() => {
        document.body.style.setProperty("cursor", "pointer");
      }}
      onPointerLeave={() => {
        document.body.style.setProperty("cursor", "default");
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

  /** Intersection Observer 사용 */
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { progress: threeProgress } = useProgress();

  useEffect(() => {
    const total =
      ImgWorks00.progress +
      ImgWorks01.progress +
      ImgWorks02.progress +
      ImgWorks03.progress +
      ImgWorks04.progress +
      ImgWorks05.progress +
      ImgWorks06.progress +
      ImgWorks07.progress +
      threeProgress;
    const length = 9;
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
  ]);

  useEffect(() => {
    worksArray[0].logoImg = ImgWorks00.ImageComponent;
    worksArray[1].logoImg = ImgWorks01.ImageComponent;
    worksArray[2].logoImg = ImgWorks02.ImageComponent;
    worksArray[3].logoImg = ImgWorks03.ImageComponent;
    worksArray[4].logoImg = ImgWorks04.ImageComponent;
    worksArray[5].logoImg = ImgWorks05.ImageComponent;
    worksArray[6].logoImg = ImgWorks06.ImageComponent;
    worksArray[7].logoImg = ImgWorks07.ImageComponent;
  }, [
    ImgWorks00.ImageComponent,
    ImgWorks01.ImageComponent,
    ImgWorks02.ImageComponent,
    ImgWorks03.ImageComponent,
    ImgWorks04.ImageComponent,
    ImgWorks05.ImageComponent,
    ImgWorks06.ImageComponent,
    ImgWorks07.ImageComponent,
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
                  images={[PHill]}
                  showNavs={true}
                  showBullets={true}
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
            <div id="works-description-left" className="pt-20">
              <selectedItem.logoImg
                className="h-[440px] w-[520px] object-contain"
                alt={selectedItem.workId}
              />
            </div>
            <div
              id="works-description-right"
              className="flex flex-grow flex-col pl-12"
            >
              <div id="works-description-right-top" className="flex">
                <div>
                  <span className="text-8xl font-bold">
                    {selectedItem.title}
                  </span>
                  <span className="text-3xl">({selectedItem.year})</span>
                </div>
                <div className="flex flex-grow flex-col items-end gap-2 text-5xl">
                  <span>{"Windows Application"}</span>

                  <div className="flex gap-4">
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
                    {selectedItem.site ? (
                      <a
                        href={selectedItem.site}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <img className="h-10" src={ICOGithub} alt="gh" />
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
                <div className="flex flex-col gap-10">
                  <div>
                    <h2 className="mb-4 text-4xl">주요 기능</h2>
                    <ul className="h-40 max-w-md list-disc break-keep pl-8 text-3xl [&>li]:mb-2">
                      {selectedItem.features.map((feat) => (
                        <li>{feat}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-4xl">역할 및 기술 스택</h2>
                    <ul className="h-40 max-w-md list-disc break-keep pl-8 text-3xl [&>li]:mb-2">
                      {selectedItem.techStack.map((tech) => (
                        <li>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-12">
                  <div className="inline h-24 w-[600px] text-2xl">
                    {selectedItem.description}
                  </div>
                  <div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowImgSlider(true);
                      }}
                    >
                      <img src={PHill2} alt="placeholder" />
                    </button>
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
            position={[-0.35, 0, 0.7]}
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
