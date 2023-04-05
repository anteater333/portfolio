export default function throttle(
  callbackFn: { call: () => void },
  limit: number
) {
  let wait = false;
  return function () {
    if (!wait) {
      callbackFn.call();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}
