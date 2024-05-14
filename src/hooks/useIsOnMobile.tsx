import { createContext, useContext, useEffect, useState } from "react";
import { notOnMobileQuery } from "../utils/mediaQueries";
import throttle from "../utils/throttle";

type IsOnMobileContextType = {
  isOnMobile: boolean;
};

const IsOnMobileContext = createContext<IsOnMobileContextType>({
  isOnMobile: false,
});

export function IsOnMobileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOnMobile, setIsOnMobile] = useState(false);

  /** 화면 크기에 대응하는 media query 리스너 할당 */
  useEffect(() => {
    const media = window.matchMedia(notOnMobileQuery);
    setIsOnMobile(!media.matches); // 최초에 한 번 적용
    const listener = throttle(() => setIsOnMobile(!media.matches), 10);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <IsOnMobileContext.Provider
      value={{
        isOnMobile,
      }}
    >
      {children}
    </IsOnMobileContext.Provider>
  );
}

export const useIsOnMobile = () => useContext(IsOnMobileContext);
