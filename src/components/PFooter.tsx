function PFooter() {
  return (
    <footer className="flex flex-col text-center text-neutral-500">
      <div className="mb-2 mt-2">
        Copyright© 2023.{" "}
        <a
          className="cursor-pointer"
          href="https://github.com/anteater333/portfolio"
          target="blank"
        >
          anteater333
        </a>{" "}
        All rights reserved.
      </div>
      <div>정보 갱신일 : {"2024-03-04"}</div>
      <div className="mb-4">
        이 사이트는 1920x1200 해상도에 최적화 되어있습니다.
      </div>
    </footer>
  );
}

export default PFooter;
