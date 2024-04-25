import "./App.css";
import { LoadingIndicatorProvider } from "./hooks/useLoadingIndicator";
import MainScreen from "./screens/MainScreen";
import { CurrentSectionProvider } from "./hooks/useCurrentSection";

function App() {
  return (
    <CurrentSectionProvider>
      <LoadingIndicatorProvider>
        <MainScreen />
      </LoadingIndicatorProvider>
    </CurrentSectionProvider>
  );
}

export default App;
