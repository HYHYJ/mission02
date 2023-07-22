const navigation = getNode(".nav");
const visualImage = getNode(".visual img");
const body = getNode("body");
const ul = getNode("ul");
const nickName = getNode(".nickName");

let audioPlayer = new AudioPlayer(`./assets/audio/ember.m4a`);

//!. `setBgColor` 함수
function setBgColor(node, colorA, colorB = "#000") {
  if (typeof node === "string") node = getNode(node);

  node.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
}

//!. `setImage` 함수
function setImage(node, prop, value) {
  if (typeof node === "string") {
    node = getNode(node);
  }

  // 전달받은 prop의 타입이 string이 아니라면 Error!
  if (typeof prop !== "string") {
    throw new TypeError(
      "setImage 함수의 두 번째 인수는 문자 타입 이어야 합니다."
    );
  }
  node.setAttribute(prop, value);
}

//!setNameText 함수
function setNameText(node, value) {
  node.textContent = value;
}

//! 음성 플레이
function handleAudio(value) {
  audioPlayer = new AudioPlayer(value);
  audioPlayer.play();
}

//! navigattion 클릭하면 handleSlider 실행
function handleSlider(e) {
  e.preventDefault();

  const target = e.target.closest("li");
  console.log(target);

  if (!target) return;

  const list = [...ul.children];
  const index = attr(target, "data-index");

  list.forEach((li) => removeClass(li, "is-active"));

  addClass(target, "is-active");

  target.src = `./assets/${data.name}.jpeg`;
  target.alt = data.alt;
  target.nickName = data.name;

  //? 1. 배경색 변경 ( colorB의 기본값은 `#000` 으로 한다 )
  setBgColor(body, data[index - 1].color[0], data[index - 1].color[1]);
  //? 2. 이미지 변경
  setImage(visualImage, "src", `./assets/${data[index - 1].name}.jpeg`);
  setImage(visualImage, "alt", data[index - 1].alt);
  //? 3. 비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요.
  setNameText(nickName, data[index - 1].name);
  //? 5.오디오 변경
  handleAudio(`./assets/audio/${data[index - 1].name}.m4a`);
}

//* naviagation에 클릭 이벤트
navigation.addEventListener("click", handleSlider);

//? 5. 함수를 분리시켜주세요.
//? 1. `setBgColor` 함수
//? 2. `setImage` 함수
//? 3. `setNameText` 함수

//? 6. 가독성이 좋은 코드로 리팩토링 해주세요.
