import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import PLoadingIndicator from "../components/PLoadingIndicator";

type LoadingIndicatorContextType = {
  /** 로딩 표시 */
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  /** 로딩 퍼센트 */
  percentage: number;
  setPercentage: Dispatch<SetStateAction<number>>;
};

const LoadingIndicatorContext = createContext<LoadingIndicatorContextType>({
  isLoading: true,
  setIsLoading: () => {
    throw new Error("Function not implemented.");
  },
  percentage: 0,
  setPercentage: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.");
  },
});

export function LoadingIndicatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (!isLoading) {
      setIsFading(true);

      setTimeout(() => {
        setIsDone(true);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {});

  return (
    <LoadingIndicatorContext.Provider
      value={{
        isLoading,
        setIsLoading,
        percentage,
        setPercentage,
      }}
    >
      {children}
      {isLoading ? <PLoadingIndicator percentage={percentage} /> : null}

      {isDone ? undefined : (
        <div
          className="absolute z-[75] flex h-screen w-screen justify-center bg-black transition-opacity duration-[2000ms]"
          style={{
            opacity: isFading ? "0" : "100",
          }}
        >
          <div className="absolute left-auto top-[440px] pb-[4.5rem] text-xl text-white">
            이 사이트는 1920x1200 해상도에 최적화 되어있습니다.
          </div>
        </div>
      )}
    </LoadingIndicatorContext.Provider>
  );
}

/**
 * 화면 전체를 덮는 로딩 표시를 사용합니다.
 * @returns
 */
export const useLoadingIndicator = (percentage?: number) => {
  const { setIsLoading, setPercentage } = useContext(LoadingIndicatorContext);

  useEffect(() => {
    if (percentage) setPercentage(percentage);
  }, [setPercentage, percentage]);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  /** 로딩 표시를 숨깁니다. */
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return {
    /** 로딩 표시를 나타냅니다. */
    showLoading,
    /** 로딩 표시를 숨깁니다. */
    hideLoading,
    /** 퍼센트 수치를 변경합니다. */
    setPercentage,
  };
};
