/** 트랜지션 시퀀스를 위한 TailwindCSS를 생성하는 스크립트
./input/tailwindTransitionSequenceGeneratorInput.js example

```javascript
const N = 6;

const delayArray = [1000, 250, 250, 0, 0, 0];
const durationArray = [1000, 1000, 1000, 300, 300, 300];
const targetPropArray = [
  `height`,
  `opacity`,
  `opacity`,
  `opacity`,
  `opacity`,
  `opacity`,
];

module.exports = {
  N,
  delayArray,
  durationArray,
  targetPropArray,
};
```

 * 작성일 2023-04-21
 */

const {
  N,
  delayArray,
  durationArray,
  targetPropArray,
} = require("./input/tailwindTransitionSequenceGeneratorInput.js");

const transitionSequence = [];

let dSum = 0;
for (let i = 0; i < N; i++) {
  transitionSequence[i] = `"transition-{${targetPropArray[i]}} delay-[${
    dSum + delayArray[i]
  }ms] duration-[${durationArray[i]}ms]"`;
  dSum += delayArray[i] + durationArray[i];
}

const fs = require("fs");
fs.writeFileSync(
  "./output/transitionSequence.ts",
  `const transitionSequence = [${transitionSequence.join(",")}];`,
  {
    encoding: "utf-8",
  }
);
