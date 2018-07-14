let code = `
/*
* 大家好，我这次给大家画一个哆啦A梦
* 首先来一块淡蓝色的画布
*/
.doraemonWrapper {
  background: #8bd6f0;
}
/* 把它的头画上 */
.head {
  width: 320px;
  height: 320px;
  border: 4px solid black;
  border-radius: 50%;
  background: rgb(1, 159, 233);
  position: relative;
}
/* 接下来是哆啦A梦的脸 */
.head .face {
  width: 278px;
  height: 278px;
  border: 2px solid black;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
}
/* 哆啦A梦的眼睛 */
.head .eye {
  width: 60px;
  height: 75px;
  border: 2px solid black;
  position: absolute;
  border-radius: 50%;
  background: white;
}
/* 黑黑的眼珠子 */
.head .eye::before {
  width: 24px;
  height: 28px;
  border-radius: 50%;
  background: black;
  position: absolute;
  left: 1px;
  bottom: 12px;
}
/* 再加点闪光 */
.head .eye::after {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 8px;
  bottom: 23px;
}
/* 把它的眼睛放好 */
.head .eye.left {
  right: 50%;
}
.head .eye.right {
  left: 50%;
}
/* 接下来我们来画哆啦A梦的鼻子 */
.head .nose {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid black;
  background: rgb(255, 0, 0);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 62px;
}
.head .nose::after {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  position: absolute;
  right: 50%;
  top: 4px;
}
/* 哆啦A梦的嘴巴 */
.head .mouth {
  width: 200px;
  height: 162px;
  position: absolute;
  border: 2px solid black;
  border-radius: 50%;
  left: 50%;
  margin-left: -100px;
  bottom: 44px;
}
.head .mouth::before {
  position: absolute;
  width: 200px;
  height: 100px;
  background: white;
  margin-left: -2px;
  bottom: 66px;
}
.head .mouth::after {
  position: absolute;
  width: 2px;
  height: 170px;
  background: black;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
/* 接下来就是胡须了 */
.head .beard {
  width: 94px;
  height: 2px;
  position: absolute;
  background: black;
}
.head .beard::before {
  width: 94px;
  height: 2px;
  position: absolute;
  background: black;
}
.head .beard::after {
  width: 94px;
  height: 2px;
  position: absolute;
  background: black;
}
/* 左边的胡须安好 */
.head .beard.left {
  right: 50%;
  margin-right: 22px;
  bottom: 190px;
}
.head .beard.left::before {
  bottom: 20px;
  transform: rotate(12deg);
}
.head .beard.left::after {
  bottom: -20px;
  transform: rotate(-12deg);
}
/* 再来安右边的胡须 */
.head .beard.right {
  left: 50%;
  margin-left: 22px;
  bottom: 190px;
}
.head .beard.right::before {
  bottom: 20px;
  transform: rotate(-12deg);
}
.head .beard.right::after {
  bottom: -20px;
  transform: rotate(12deg);
}
/* 对了，还有它的红围脖 */
.head .scarf {
  width: 186px;
  height: 20px;
  position: absolute;
  border: 2px solid black;
  border-radius: 10px;
  background: rgb(255, 0, 0);
  left: 50%;
  transform: translateX(-50%);
  bottom: -4px;
}
/* 哆啦A梦的铃铛 */
.head .bell {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid black;
  background: rgb(236, 200, 26);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
}
.head .bell::before {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: black;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4px;
}
.head .bell::after {
  position: absolute;
  width: 2px;
  height: 10px;
  background: black;
  left: 50%;
  transform: translateX(-50%);
  bottom: -2px;
}
.head .bell2 {
  width: 40px;
  height: 8px;
  border-radius: 4px;
  border: 2px solid black;
  background: rgb(236, 200, 26);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 7px;
}
/*
* 好了，一只哆啦A梦送给你
* 喜欢吗
*/
`;

let duration = 50;

function paintDoraemon(preCode, code, fn) {
  let n = 0;
  let codeDom = document.querySelector('#code');
  let styleDom = document.querySelector('#styleTag');

  setTimeout(function writeCode() {
    n += 1;
    codeDom.innerHTML = Prism.highlight(
      preCode + code.substring(0, n),
      Prism.languages.css,
      'css'
    );
    styleDom.innerHTML = preCode + code.substring(0, n);
    codeDom.scrollTop = codeDom.scrollHeight;
    if (n < code.length && n) {
      setTimeout(writeCode, duration);
    } else {
      fn && fn();
    }
  }, duration);

  function stop() {
    n = -1;
  }
  return stop;
}
function replay() {
  duration = 50;
  document.querySelector('#code').innerHTML = '';
  document.querySelector('#styleTag').innerHTML = '';
  stop = paintDoraemon('', code, () => {});
}

let stop = paintDoraemon('', code, () => {});

$('.action').on('click', 'button', e => {
  let $button = $(e.currentTarget);
  let speed = $button.attr('data-speed');
  $button
    .addClass('active')
    .siblings('.active')
    .removeClass('active');
  switch (speed) {
    case 'slow':
      duration = 100;
      break;
    case 'normal':
      duration = 50;
      break;
    case 'fast':
      duration = 5;
      break;
    case 'replay':
      stop();
      replay();
      break;
  }
});
