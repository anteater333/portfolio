import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("<App />, 전체 어플리케이션 렌더링 테스트", () => {
  test("3개의 영역으로 구성되어 있다.", () => {
    render(<App />);
    const navElement = screen.getByRole("navigation");
    const mainElement = screen.getByRole("main");
    const footerElement = screen.getByRole("contentinfo");

    expect(navElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });
});
