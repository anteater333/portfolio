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
      <div className="mb-4">정보 갱신일 : {"2023-04-00"}</div>
    </footer>
  );
}

export default PFooter;
