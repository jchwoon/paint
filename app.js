const canvas = document.getElementById("canvas");
const color = document.getElementsByClassName("color");
const brush = document.getElementById("brush");
const fillBtn = document.getElementById("fill");
const saveBtn = document.getElementById("save");

const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 600);
ctx.strokeStyle = "black";
ctx.lineWidth = 0.5;
ctx.setLineDash([5, 5]);

let painting = false;
let mode = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};
const handleChangeBrush = (event) => {
  const { value } = event.target;
  ctx.lineWidth = value;
};
const handleCanvasMouseDown = () => {
  if (mode === true) {
    stopPainting();
    ctx.fillRect(0, 0, 600, 600);
  } else {
    startPainting();
  }
};
const handleFillClick = () => {
  if (mode === false) {
    fillBtn.innerText = "Paint";
    mode = true;
  } else {
    fillBtn.innerText = "Fill";
    mode = false;
  }
};
const handleCM = (event) => {
  event.preventDefault();
};
const handleSaveClick = () => {
  const imageURL = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "PaintJS[♬]";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", handleCanvasMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(color).forEach((color) => {
  color.addEventListener("click", handleColorClick);
});
brush.addEventListener("change", handleChangeBrush);
fillBtn.addEventListener("click", handleFillClick);

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
