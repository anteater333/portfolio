import "./App.css";
import { LoadingIndicatorProvider } from "./hooks/useLoadingIndicator";
import MainScreen from "./screens/MainScreen";
import { CurrentSectionProvider } from "./hooks/useCurrentSection";
import { SectionScrollableProvider } from "./hooks/useSectionScrollable";

function App() {
  return (
    <CurrentSectionProvider>
      <SectionScrollableProvider>
        <LoadingIndicatorProvider>
          <MainScreen />
        </LoadingIndicatorProvider>
      </SectionScrollableProvider>
    </CurrentSectionProvider>
  );
}

export default App;
