function PFooter() {
  return (
    <footer className="mt-4 flex w-full max-w-recommended justify-center gap-2 text-center text-neutral-500">
      <div>이 사이트는 1920x1200 해상도에 최적화 되어있습니다.</div>
      <div>|</div>
      <div>
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
      <div>|</div>
      <div>정보 갱신일 : {"2024-04-25"}</div>
      <div>|</div>
      <div>
        {import.meta.env.DEV ? (
          <p>DEV MODE</p>
        ) : (
          <a href="https://hits.seeyoufarm.com">
            <img
              alt="hits"
              src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fblog.anteater-lab.link%2Fportfolio%2F&count_bg=%23737373&title_bg=%2322C55E&icon=&icon_color=%23020202&title=thx%E2%99%A5&edge_flat=true"
            />
          </a>
        )}
      </div>
    </footer>
  );
}

export default PFooter;
