/**
 * 스로틀링 데코레이션 함수. 함수 호출 이후 일정 시간이 지나야만 해당 함수가 다시 실행될 수 있도록 만듬
 * @param callbackFn
 * @param limit ms
 * @returns
 */
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
