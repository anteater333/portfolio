import { useEffect, useState } from "react";
import { RGB, calcRGBByPercentage } from "../utils/styleUtil";

type PLoadingIndicatorProps = {
  percentage: number;
};

function PLoadingIndicator({ percentage }: PLoadingIndicatorProps) {
  const [colorByPercent, setColorByPercent] =
    useState<RGB>("rgb(242, 242, 242)");

  const [ellipsisCnt, setEllipsisCnt] = useState<number>(1);

  /**
   * RGB(34, 34, 34) to RGB(242, 242, 242) by props.percentage
   */
  useEffect(() => {
    setColorByPercent(calcRGBByPercentage(100 - percentage / 2));
  }, [percentage]);

  /**
   * Ticking ellipsis
   */
  useEffect(() => {
    const ticker = setInterval(() => {
      setEllipsisCnt((prev) => (prev % 3) + 1);
    }, 600);

    return () => {
      clearInterval(ticker);
    };
  }, []);

  return (
    <div
      id="global-loading-indicator-container"
      className="absolute z-[100] flex h-full w-full items-start justify-center bg-black"
    >
      <div
        id="global-loading-indicator"
        className="relative flex h-recommended w-recommended justify-center bg-black"
      >
        <div className="absolute left-auto top-[440px] pb-20 text-xl text-white">
          이 사이트는 1920x1200 해상도에 최적화 되어있습니다.
        </div>
        <div
          id="loading-text-area"
          className="absolute bottom-16 right-16 flex select-none font-galmuri9 text-6xl md:text-8xl"
          style={{
            color: colorByPercent,
          }}
        >
          <div id="loading-text" className="inline-block">
            Loading
            <span id="loading-ellipsis" className="inline-block w-20 md:w-40">
              {Array(ellipsisCnt).fill(".").join("")}
            </span>
          </div>
          <div id="loading-percentage" className="ml-4 inline-block text-right">
            {Math.floor(percentage)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default PLoadingIndicator;
