function PFooter() {
  return (
    <footer className="flex w-recommended flex-col text-center text-neutral-500">
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
      <div>이 사이트는 1920x1200 해상도에 최적화 되어있습니다.</div>
      <a
        href="https://hits.seeyoufarm.com"
        className="mb-4 mt-2 flex justify-center"
      >
        <img
          alt="hits"
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fblog.anteater-lab.link%2Fportfolio%2F&count_bg=%23737373&title_bg=%2322C55E&icon=&icon_color=%23020202&title=thx%E2%99%A5&edge_flat=true"
        />
      </a>
    </footer>
  );
}

export default PFooter;
