const CONTAINER_WIDTH = 720;
const CONTAINER_HEIGHT = 720;

const container = document.querySelector(".container");

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function fillContainer(dimension) {
  for (let i = 0; i < dimension * dimension; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${100 / dimension}%`;
    square.style.height = `${100 / dimension}%`;
    square.style.display = "flex";
    square.style.border = "1px solid black";
    square.style.backgroundColor = "white";

    square.addEventListener("mouseover", () => {
      if (square.style.backgroundColor === "white") {
        square.style.backgroundColor = getRandomColor();
      } else {
        let currentColor = square.style.backgroundColor;
        let [r, g, b] = currentColor.match(/\d+/g).map(Number);

        // Decrease the RGB values by 10%, ensuring they don't go below 0
        r = Math.max(0, r - Math.floor(r * 0.1));
        g = Math.max(0, g - Math.floor(g * 0.1));
        b = Math.max(0, b - Math.floor(b * 0.1));

        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    });

    container.appendChild(square);
  }
}

fillContainer(16);

const resizeButton = document.querySelector("#resize");
resizeButton.addEventListener("click", () => {
  const dimension = prompt("Enter the new dimension (1-100):");
  if (dimension < 1 || dimension > 100) {
    alert("Invalid dimension");
    return;
  } else {
    container.innerHTML = "";
    fillContainer(dimension);
  }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.style.backgroundColor = "white";
    square.style.opacity = "1";
  });
});
