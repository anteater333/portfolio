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
  isLoading: false,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);

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

  const showLoading = useCallback(
    (percentage?: number) => {
      if (percentage) {
        setPercentage(percentage);
      } else {
        setPercentage(100);
      }
      setIsLoading(true);
    },
    [setPercentage, setIsLoading]
  );

  /** 로딩 표시를 숨깁니다. */
  const hideLoading = useCallback(() => {
    setPercentage(0);
    setIsLoading(false);
  }, [setPercentage, setIsLoading]);

  return {
    /** 로딩 표시를 나타냅니다. */
    showLoading,
    /** 로딩 표시를 숨깁니다. */
    hideLoading,
  };
};
