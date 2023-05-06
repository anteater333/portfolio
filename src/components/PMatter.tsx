import { useEffect, useRef } from "react";
import { Engine, Render, Bodies, World } from "matter-js";

function PMatter() {
  const scene = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());

  useEffect(() => {}, []);

  return (
    <div>
      <div ref={scene}></div>
    </div>
  );
}

export default PMatter;
