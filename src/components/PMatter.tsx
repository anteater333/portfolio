import { useCallback, useEffect, useRef, useState } from "react";
import { Engine, Render, Bodies, World, Runner, Body } from "matter-js";

import {
  emojiArray,
  emojiLength,
} from "../resources/images/contacts/emoji/emoji";
import { weightedRandom } from "../utils/mathUtils";
import { useIsOnMobile } from "../hooks/useIsOnMobile";

function PMatter() {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());

  const [renderRef, setRenderRef] = useState<Render | null>(null);

  const [bodyLeft, setBodyLeft] = useState<Body | null>(null);
  const [bodyCenter, setBodyCenter] = useState<Body | null>(null);
  const [bodyRight, setBodyRight] = useState<Body | null>(null);

  const { isOnMobile } = useIsOnMobile();

  useEffect(() => {
    const engineRef = engine.current;
    let cw = scene.current?.parentElement?.offsetWidth ?? 0;
    let ch = scene.current?.parentElement?.offsetHeight ?? 0;

    const render = Render.create({
      engine: engineRef,
      element: scene.current!,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    const bodyLeft = Bodies.rectangle(-10, ch / 2, 20, ch, {
      isStatic: true,
      render: { visible: false },
    });

    const bodyCenter = Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
      isStatic: true,
      render: { visible: false },
    });

    const bodyRight = Bodies.rectangle(cw, ch / 2, 20, ch, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(engineRef.world, [bodyLeft, bodyCenter, bodyRight]);

    const MAX = 256;
    let cnt = 0;
    const intervalId = setInterval(() => {
      if (cnt >= MAX) clearInterval(intervalId);
      else {
        const position = weightedRandom(cw, 2);
        const emojiIndex = Math.floor(Math.random() * emojiLength);
        const ball = Bodies.circle(position, -256, 32, {
          mass: 1,
          restitution: 0,
          friction: 0.9,
          render: {
            fillStyle: "#ffffff",
            sprite: { texture: emojiArray[emojiIndex], xScale: 1, yScale: 1 },
          },
        });
        ball.angle = Math.random() - 0.5;
        World.add(engineRef.world, [ball]);
        cnt++;
      }
    }, 1);

    Runner.run(engineRef);
    Render.run(render);

    setRenderRef(render);
    setBodyLeft(bodyLeft);
    setBodyCenter(bodyCenter);
    setBodyRight(bodyRight);

    return () => {
      clearInterval(intervalId);
      Render.stop(render);
      World.clear(engineRef.world, false);
      Engine.clear(engineRef);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
      setRenderRef(null);
      setBodyLeft(null);
      setBodyCenter(null);
      setBodyRight(null);
    };
  }, [isOnMobile]);

  /** 화면 크기가 변경될 때 matterjs 영역 크기도 함께 변경 */
  const resizeHandler = useCallback(() => {
    if (!renderRef || !bodyLeft || !bodyCenter || !bodyRight) return;

    // 뷰포트에 맞춰 새로 변경된 ref의 크기
    let newWidth = scene.current?.parentElement?.offsetWidth ?? 0;
    let newHeight = scene.current?.parentElement?.offsetHeight ?? 0;

    // matter.js canvas 영역 크기 변경
    renderRef.canvas.width = newWidth;
    renderRef.canvas.height = newHeight;

    // 기존 Body들이 가지고 있던 너비와 높이를 계산
    const prevWidth = bodyCenter.bounds.max.x - bodyCenter.bounds.min.x;
    const prevHeight = bodyLeft.bounds.max.y - bodyLeft.bounds.min.y;

    // 새 너비, 높이에 맞춰 크기 및 위치 조정
    Body.scale(bodyCenter, newWidth / prevWidth, 1);
    Body.setPosition(bodyCenter, { x: newWidth / 2, y: newHeight + 10 });
    Body.scale(bodyLeft, 1, newHeight / prevHeight);
    Body.setPosition(bodyLeft, { x: -10, y: newHeight / 2 });
    Body.scale(bodyRight, 1, newHeight / prevHeight);
    Body.setPosition(bodyRight, { x: newWidth, y: newHeight / 2 });
  }, [bodyCenter, bodyLeft, bodyRight, renderRef]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div className="absolute bottom-0 -z-0 flex h-fit w-full" ref={scene}></div>
  );
}

export default PMatter;
