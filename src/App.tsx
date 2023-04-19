import "./App.css";
import { LoadingIndicatorProvider } from "./hooks/useLoadingIndicator";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <LoadingIndicatorProvider>
      <MainScreen />
    </LoadingIndicatorProvider>
  );
}

export default App;
