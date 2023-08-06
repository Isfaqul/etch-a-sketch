const drawingBoard = document.querySelector(".drawing-board");
const gridSizeEl = document.querySelector("#grid-size");
const colorPickerEl = document.querySelector(".color-picker");
const eraseAllBtn = document.querySelector(".erase-all-btn");
const gridSizeTextEl = document.querySelector(".show-chosen-grid-size");
const rainbowModeBtn = document.querySelector(".rainbow-btn");

// Draw Board immediately after page loads
drawBoard(drawingBoard, gridSizeEl.value);

function drawBoard(boardEl, size) {
  updateGridSizeText(gridSizeTextEl, size);
  resetBoard(drawingBoard);
  drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let loops = size ** 2;

  for (let i = 0; i < loops; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    boardEl.appendChild(gridItem);
  }
}

// Draw board on gridSize Change
gridSizeEl.addEventListener("change", () => {
  drawBoard(drawingBoard, gridSizeEl.value);
});

// Set a flag to enable/disable drawing
let drawing = false;

// enable drawing on mousedown on canvas
drawingBoard.addEventListener("mousedown", () => {
  if (!drawing) drawing = true;
});

// disable drawing when mouseup on canvas
drawingBoard.addEventListener("mouseup", () => {
  if (drawing) drawing = false;
});

// Enable Drawing
drawingBoard.addEventListener("mousemove", (e) => {
  e.preventDefault();
  draw(colorPickerEl.value, e);
});

// Function to handle drawing
function draw(color, event) {
  if (drawing) {
    if (rainbowMode) {
      event.target.style.backgroundColor = randomColor();
    } else {
      event.target.style.backgroundColor = color;
    }
  }
}

// function to reset board when grid size changes
function resetBoard(board) {
  let child = board.lastElementChild;

  while (child) {
    board.removeChild(child);
    child = board.lastElementChild;
  }
}

// Event Listner Handle erase all btn
eraseAllBtn.addEventListener("click", () => {
  resetBoard(drawingBoard);
  drawBoard(drawingBoard, gridSizeEl.value);
});

// Function to update grid size text on screen
function updateGridSizeText(element, size) {
  element.innerText = `${size} x ${size}`;
}

// Rainbow Mode Flag
let rainbowMode = false;

// Listen for Raninbow mode Btn
rainbowModeBtn.addEventListener("click", () => {
  if (rainbowMode) {
    rainbowMode = false;
    rainbowModeBtn.innerText = "Rainbow Off";
  } else {
    rainbowMode = true;
    rainbowModeBtn.innerText = "Rainbow On";
  }
});

// color randomiser function
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}
