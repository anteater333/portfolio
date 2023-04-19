import { useEffect, useState } from "react";

type PLoadingIndicatorProps = {
  percentage: number;
};

function PLoadingIndicator({ percentage }: PLoadingIndicatorProps) {
  const [colorByPercent, setColorByPercent] =
    useState<string>("rgb(242,242,242)");

  const [factor, setFactor] = useState<number>(242);

  const [ellipsisCnt, setEllipsisCnt] = useState<number>(1);

  /**
   * RGB(34, 34, 34) to RGB(242, 242, 242) by props.percentage
   */
  useEffect(() => {
    setColorByPercent(`rgb(${factor},${factor},${factor})`);
  }, [percentage, factor]);

  /** 색상 변경 테스트용 코드, 삭제 필요 */
  // useEffect(() => {
  //   setInterval(() => {
  //     if (factor > 34) {
  //       setFactor(Math.max(factor - 50, 34));
  //     }
  //   }, 500);
  // }, [factor]);

  useEffect(() => {
    const ticker = setInterval(() => {
      setEllipsisCnt((prev) => (prev % 3) + 1);
    }, 600);

    return () => {
      clearInterval(ticker);
    };
  }, []);

  return (
    <div className="global-loading-indicator absolute top-0 z-50 h-recommended w-recommended bg-black">
      <div
        className="loading-text-area absolute bottom-16 right-16 flex font-galmuri9 text-9xl"
        style={{
          color: colorByPercent,
        }}
      >
        <div className="loading-text inline-block">
          Loading
          <span className="loading-ellipsis inline-block w-40">
            {Array(ellipsisCnt).fill(".").join("")}
          </span>
        </div>
        <div className="loading-percentage ml-4 inline-block w-[320px] text-right">
          {percentage}%
        </div>
      </div>
    </div>
  );
}

export default PLoadingIndicator;
