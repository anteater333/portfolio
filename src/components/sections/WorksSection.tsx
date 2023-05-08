import { useEffect, useRef } from "react";
import SectionProps from "./SectionProps";

import { Canvas, GroupProps, Vector3 } from "@react-three/fiber";
import {
  useGLTF,
  useProgress,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { deg2RadXYZ } from "../../utils/mathUtils";
import { Mesh } from "three";

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
  const { progress } = useProgress();

  useEffect(() => {
    updateLoadingProgress(progress, 3);
  }, [updateLoadingProgress, progress]);

  useEffect(() => {}, []);

  return (
    <section
      id="works-section"
      className="relative h-recommended snap-center overflow-hidden bg-slate-900" // 배경색상 임시
    >
      <div className="absolute bottom-10 left-16 z-50 rounded-3xl bg-white p-5 opacity-80">
        <h1 className="border-b-[1rem] border-b-indigo-500 text-10xl font-bold leading-[10rem] text-indigo-500">
          Works
        </h1>
      </div>

      <div className="h-full w-full">
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[0, 2.5, 0]}
            rotation={deg2RadXYZ(-90, 0, 0)}
          />
          <pointLight position={[0, 2, 0]} intensity={0.3} />
          <spotLight
            intensity={0.5}
            position={[6, 4, -5]}
            angle={0.3}
            penumbra={1}
            castShadow
          />

          <mesh rotation={deg2RadXYZ(-90, 0, 0)} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
            <meshLambertMaterial attach="material" color="#f2f2f2" />
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
export default WorksSection;
