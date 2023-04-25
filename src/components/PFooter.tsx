function PFooter() {
  return (
    <footer className="flex flex-col text-center text-neutral-500">
      <div className="mt-10 text-2xl">
        이 사이트는 React, Tailwind CSS를 사용해 만들어졌습니다.
      </div>
      <div className="mt-1">정보 갱신일 : {"2023-04-00"}</div>
      <div className="my-8">
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
    </footer>
  );
}

export default PFooter;
