const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = "black";
context.fillStyle = "black";
context.lineWidth = 3.5;
context.lineCap = "round";

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function handleRangeChange(e) {
  context.lineWidth = e.target.value;
}

function handleBtnClick(e) {
  if (filling) {
    filling = false;
    fillBtn.innerText = "Fill";
  } else {
    filling = true;
    fillBtn.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function saveClick(e) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleColorClick(e) {
  const backgroundColor = e.target.style.backgroundColor;
  context.strokeStyle = backgroundColor;
  context.fillStyle = context.strokeStyle;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (fillBtn) {
  fillBtn.addEventListener("click", handleBtnClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveClick);
}
