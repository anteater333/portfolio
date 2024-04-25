import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CurrentSectionContextType = {
  currentSection: number;
  setCurrentSection: Dispatch<SetStateAction<number>>;
};

const CurrentSectionContext = createContext<CurrentSectionContextType>({
  currentSection: 0,
  setCurrentSection: () => {
    throw new Error("Function not implemented.");
  },
});

export function CurrentSectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <CurrentSectionContext.Provider
      value={{ currentSection, setCurrentSection }}
    >
      {children}
    </CurrentSectionContext.Provider>
  );
}

export const useCurrentSection = (): [
  number,
  Dispatch<SetStateAction<number>>
] => {
  const { currentSection, setCurrentSection } = useContext(
    CurrentSectionContext
  );
  return [currentSection, setCurrentSection];
};
