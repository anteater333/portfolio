export default function throttle(callbackFn: Function, limit: number) {
  let wait = false;
  return function () {
    if (!wait) {
      callbackFn.call(globalThis); // invoke
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}
