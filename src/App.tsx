import "./App.css";
import { LoadingIndicatorProvider } from "./hooks/useLoadingIndicator";
import MainScreen from "./screens/MainScreen";
import { CurrentSectionProvider } from "./hooks/useCurrentSection";
import { SectionScrollableProvider } from "./hooks/useSectionScrollable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IsOnMobileProvider } from "./hooks/useIsOnMobile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IsOnMobileProvider>
        <CurrentSectionProvider>
          <SectionScrollableProvider>
            <LoadingIndicatorProvider>
              <MainScreen />
            </LoadingIndicatorProvider>
          </SectionScrollableProvider>
        </CurrentSectionProvider>
      </IsOnMobileProvider>
    </QueryClientProvider>
  );
}

export default App;
