const drawingBoard = document.querySelector(".drawing-board");
const gridSizeEl = document.querySelector("#grid-size");
const colorPickerEl = document.querySelector(".color-picker");
const eraseAllBtn = document.querySelector(".erase-all-btn");
const gridSizeTextEl = document.querySelector(".show-chosen-grid-size");
const rainbowModeBtn = document.querySelector(".rainbow-btn");
const shadingToggleBtn = document.querySelector(".shading-toggle-btn");

// Set a flag to enable/disable drawing
let drawing = false;
// Rainbow Mode Flag
let rainbowMode = false;
// Set Shading Flag
let shade = false;

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

  // Handle Shade
  if (shade) setAllGridItemsToBlack(boardEl);
  else setAllGridItemsToDefault(boardEl);
}

// listen for shading enablement
shadingToggleBtn.addEventListener("click", () => {
  if (!shade) {
    shade = true;
    shadingToggleBtn.innerText = "Shading On";
    setAllGridItemsToBlack(drawingBoard);

    // Turn Rainbow Off
    rainbowMode = false;
    rainbowModeBtn.innerText = "Rainbow Off";
  } else {
    shade = false;
    shadingToggleBtn.innerText = "Shading Off";
    setAllGridItemsToDefault(drawingBoard);
  }
});

// Draw board on gridSize Change
gridSizeEl.addEventListener("change", () => {
  drawBoard(drawingBoard, gridSizeEl.value);
});

// enable drawing on mousedown on canvas
drawingBoard.addEventListener("mousedown", () => {
  if (!drawing) {
    drawing = true;
  }
});

// disable drawing when mouseup on canvas
drawingBoard.addEventListener("mouseup", () => {
  if (drawing) drawing = false;
});

// draw while drawing is true
drawingBoard.addEventListener("mousemove", (e) => {
  e.preventDefault();

  if (shade && drawing) {
    shading(e.target.style.opacity, e);
  } else if (drawing) {
    draw(colorPickerEl.value, e);
  }
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
  // let child = board.lastElementChild;
  // while (child) {
  //   board.removeChild(child);
  //   child = board.lastElementChild;
  // }
  board.innerHTML = "";
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

// Listen for Raninbow mode Btn
rainbowModeBtn.addEventListener("click", () => {
  if (rainbowMode) {
    rainbowMode = false;
    rainbowModeBtn.innerText = "Rainbow Off";
  } else {
    rainbowMode = true;
    rainbowModeBtn.innerText = "Rainbow On";

    // Turn Shade off
    shade = false;
    shadingToggleBtn.innerText = "Shading Off";
    // And reset board
    resetBoard(drawingBoard);
    drawBoard(drawingBoard, gridSizeEl.value);
  }
});

// color randomiser function
function randomColor(index) {
  const rainbowColors = [
    // Red
    "#FFC0CB",
    "#FF0000",
    "#800000",

    // Orange
    "#FFD700",
    "#FFA500",
    "#FF4500",

    // Yellow
    "#FFFFE0",
    "#FFFF00",
    "#808000",

    // Green
    "#98FB98",
    "#008000",
    "#006400",

    // Blue
    "#ADD8E6",
    "#0000FF",
    "#00008B",

    // Indigo
    "#9370DB",
    "#4B0082",
    "#32007A",

    // Violet
    "#EE82EE",
    "#800080",
    "#9400D3",
  ];

  return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
}

// Shading Function
function shading(opacity, event) {
  opacity = +event.target.style.opacity;

  if (opacity < 1) {
    opacity += 0.02;
    event.target.style.opacity = opacity;
  }
}

// Set All Grid Items to Black and Opacity 0
function setAllGridItemsToBlack(drawingBoard) {
  for (let child of drawingBoard.children) {
    child.style.backgroundColor = "black";
    child.style.opacity = 0;
  }
}

// Set All Grid Items to default styles
function setAllGridItemsToDefault(drawingBoard) {
  for (let child of drawingBoard.children) {
    child.style.backgroundColor = "";
    child.style.opacity = "";
  }
}
