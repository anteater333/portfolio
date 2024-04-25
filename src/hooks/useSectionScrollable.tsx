import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SectionScrollableContextType = {
  isSectionOnTop: boolean;
  setIsSectionOnTop: Dispatch<SetStateAction<boolean>>;
  isSectionOnBottom: boolean;
  setIsSectionOnBottom: Dispatch<SetStateAction<boolean>>;
};

const SectionScrollableContext = createContext<SectionScrollableContextType>({
  isSectionOnTop: true,
  setIsSectionOnTop: () => {
    throw new Error("Function not implemented.");
  },
  isSectionOnBottom: true,
  setIsSectionOnBottom: () => {
    throw new Error("Function not implemented.");
  },
});

export function SectionScrollableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSectionOnTop, setIsSectionOnTop] = useState(true);
  const [isSectionOnBottom, setIsSectionOnBottom] = useState(true);

  return (
    <SectionScrollableContext.Provider
      value={{
        isSectionOnTop,
        setIsSectionOnTop,
        isSectionOnBottom,
        setIsSectionOnBottom,
      }}
    >
      {children}
    </SectionScrollableContext.Provider>
  );
}

export const useSectionScrollable = () => {
  return useContext(SectionScrollableContext);
};
