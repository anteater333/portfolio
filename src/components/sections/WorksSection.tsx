import { useCallback, useEffect, useRef, useState } from "react";
import SectionProps from "./SectionProps";

import {
  Canvas,
  GroupProps,
  RootState,
  SpotLightProps,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  useGLTF,
  useProgress,
  PerspectiveCamera,
  SpotLight,
  useDepthBuffer,
} from "@react-three/drei";
import { Vector3, SpotLight as TSpotLight, PointLight, Color } from "three";

import { deg2RadXYZ } from "../../utils/mathUtils";

import PHill from "../../resources/images/works/PHill.png";
import PHill2 from "../../resources/images/works/placeholder2.png";
import ICOGithub from "../../resources/images/common/github.png";
import throttle from "../../utils/throttle";
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
      {...props}
      onClick={() => {}}
      onPointerEnter={() => {
        document.body.style.setProperty("cursor", "pointer");
      }}
      onPointerLeave={() => {
        document.body.style.setProperty("cursor", "default");
      }}
      castShadow
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

  const [tB, setTb] = useState(true);

  return (
    <section
      ref={ref}
      id="works-section"
      className="relative h-recommended snap-center overflow-hidden"
    >
      <div
        className="absolute bottom-10 left-16 z-50 rounded-3xl bg-white p-5 opacity-80"
        style={{
          background: isFading ? "transparent" : undefined,
        }}
      >
        <h1
          className="border-b-[1rem] border-b-indigo-500 text-10xl font-bold leading-[10rem] text-indigo-500"
          onClick={() => setTb(!tB)}
        >
          Works
        </h1>
      </div>

      {selectedItem < 0 ? undefined : (
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
            <img src={PHill} alt="placeholder" />
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
                  <img src={PHill2} alt="placeholder" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="relative z-0 h-full w-full"
        onClick={() => {
          setSelectedItem(0);
          setIsFading(true);
        }}
      >
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[0, 2.5, 0.5]}
            rotation={deg2RadXYZ(-80, 0, 0)}
          />
          <PLight showLight={selectedItem < 0} initialState={!isVisible} />

          <mesh rotation={deg2RadXYZ(-90, 0, 0)} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshLambertMaterial attach="material" color="#6366f1" />
          </mesh>
          <Model
            // AIQA
            index={0}
            position={[0.7, 0, 0.25]}
            rotation={deg2RadXYZ(0, 15, 0)}
          />
          <Model
            // DeZipper
            index={1}
            position={[-1.1, 0, -0.5]}
            rotation={deg2RadXYZ(0, 21, 0)}
          />
          <Model
            // Ill
            index={2}
            position={[-1.7, 0, 0.15]}
            rotation={deg2RadXYZ(0, -36, 0)}
          />
          <Model
            // Lab
            index={3}
            position={[-0.35, 0, 0.7]}
            rotation={deg2RadXYZ(0, -54, 0)}
          />
          <Model
            // Monallog
            index={4}
            position={[1.7, 0, -0.3]}
            rotation={deg2RadXYZ(0, -32, 0)}
          />
          <Model
            // QUE
            index={5}
            position={[0.3, 0, -0.6]}
            rotation={deg2RadXYZ(0, -25, 0)}
          />
          <Model
            // Soup
            index={6}
            position={[-0.3, 0, -0.1]}
            rotation={deg2RadXYZ(0, 19, 0)}
          />
          <Model
            // theWhiteboard
            index={7}
            position={[1.25, 0, 0.7]}
            rotation={deg2RadXYZ(0, 25, 0)}
          />
        </Canvas>
      </div>
    </section>
  );
}

function PLight({ showLight = true, initialState = true }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const globalLight = useRef<PointLight>(null!);

  useFrame(() => {
    console.log(initialState, showLight);
    if (initialState) globalLight.current.color.lerp(new Color("#000000"), 0.1);
    else if (showLight)
      globalLight.current.color.lerp(new Color("#ffffff"), 0.01);
    else globalLight.current.color.lerp(new Color("#999999"), 0.1);
    globalLight.current?.updateMatrixWorld();
  });

  return (
    <>
      <pointLight ref={globalLight} position={[0, 5, 0]} intensity={0.33} />

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
      else light.current?.color.lerp(new Color("#000000"), 0.1);

      light.current?.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          0,
          -(state.mouse.y * viewport.height) / 2
        ),
        0.1
      );
      light.current?.target.updateMatrixWorld();
    },
    [showLight, vec, viewport.height, viewport.width]
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
      intensity={1}
      {...props}
    />
  );
}

export default WorksSection;
