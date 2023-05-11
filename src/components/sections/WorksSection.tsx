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
import useIntersection from "../../hooks/useIntersection";

const modelsArray = [
  { title: "AIQA", url: "/3d/AIQA.glb" },
  { title: "DeZipper", url: "/3d/DeZipper.glb" },
  { title: "Ill", url: "/3d/Ill.glb" },
  { title: "Lab", url: "/3d/Lab.glb" },
  { title: "Monallog", url: "/3d/Monallog.glb" },
  { title: "QUE", url: "/3d/QUE.glb" },
  { title: "Soup", url: "/3d/Soup.glb" },
  { title: "theWhiteboard", url: "/3d/theWhiteboard.glb" },
];

const Model = (props: GroupProps & { index: number }) => {
  const { scene } = useGLTF(modelsArray[props.index].url);

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
  /** Intersection Observer 사용 */
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersection(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { progress } = useProgress();

  useEffect(() => {
    updateLoadingProgress(progress, 3);
  }, [updateLoadingProgress, progress]);

  useEffect(() => {}, []);

  const [selectedItem, setSelectedItem] = useState(-1);
  const [isFading, setIsFading] = useState(false);

  const handleWorkItemClicked = useCallback((index: number) => {
    setSelectedItem(index);
    setIsFading(true);
  }, []);

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

      {selectedItem < 0 ? undefined : (
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
                setSelectedItem(-1);
              }, 150);
            }}
          >
            <div id="works-description-left">
              <button>
                <img src={PHill} alt="placeholder" />
              </button>
            </div>
            <div
              id="works-description-right"
              className="flex flex-grow flex-col pl-32"
            >
              <div id="works-description-right-top" className="flex">
                <div>
                  <span className="text-8xl font-bold">{"오늘 할 일"}</span>
                  <span className="text-3xl">{"(2018)"}</span>
                </div>
                <div className="flex flex-grow flex-col items-end gap-2 text-5xl">
                  <span>{"Windows Application"}</span>
                  <a
                    href="http://github.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <img className="h-10" src={ICOGithub} alt="gh" />
                  </a>
                </div>
              </div>
              <div
                id="works-description-right-middle"
                className="mb-12 mt-2 text-5xl"
              >
                {"일상적 / 할 일 / 리마인더"}
              </div>
              <div
                id="works-description-right-bottom"
                className="flex justify-between"
              >
                <div className="flex flex-col gap-10">
                  <div>
                    <h2 className="mb-4 text-4xl">주요 기능</h2>
                    <ul className="h-40 list-disc pl-8 text-3xl">
                      <li>날짜 포맷 파싱</li>
                      <li>시작 시 실행</li>
                      <li>...</li>
                      <li>...</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-4 text-4xl">기술 스택</h2>
                    <ul className="list-disc pl-8 text-3xl">
                      <li>C# Windows Programming</li>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-12">
                  <div className="inline w-[600px] text-2xl">
                    {
                      "오늘 할 일은... 어쩌구 저쩌구 장황한 설명. 2018년에 시작하여, 이 프로그램을 공유하지 않으면 당신은 저주받게 되고, 총 5명의 사람에게 이 메세지를 전달하지 않으면 이러쿵 저러쿵.."
                    }
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

          <PLight showLight={selectedItem < 0} initialState={!isVisible} />

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
