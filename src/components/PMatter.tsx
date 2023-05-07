import { useEffect, useRef } from "react";
import { Engine, Render, Bodies, World, Runner } from "matter-js";

import {
  emojiArray,
  emojiLength,
} from "../resources/images/contacts/emoji/emoji";

/**
 * 중앙값에 치중된 랜덤
 */
function weightedRandom(max: number, bellFactor: number) {
  var num = 0;
  for (var i = 0; i < bellFactor; i++) {
    num += Math.random() * (max / bellFactor);
  }
  return num;
}

function PMatter() {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());

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

    World.add(engineRef.world, [
      Bodies.rectangle(-10, ch / 2, 20, ch, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(cw, ch / 2, 20, ch, {
        isStatic: true,
        render: { visible: false },
      }),
    ]);

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

    return () => {
      clearInterval(intervalId);
      Render.stop(render);
      World.clear(engineRef.world, false);
      Engine.clear(engineRef);
      render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      render.textures = {};
    };
  }, [scene.current?.parentElement?.offsetHeight]);

  return (
    <div className="absolute top-0 -z-0 flex h-fit w-fit" ref={scene}></div>
  );
}

export default PMatter;
