let patternColor, bgColor;
let steps = 300; // Number of steps in the equiluminance transition
let currentStep = 0;
let gridSize = 6; // Number of fractals in a row/column
let fractalSize;

function setup() {
  createCanvas(windowWidth, windowHeight); // Full desktop screen
  noStroke();
  fractalSize = width / gridSize; // Size of each fractal in the grid
  initializeColors();
}

function draw() {
  // Interpolate between the two colors for the equiluminance transition
  let currentPatternColor = lerpColor(patternColor, bgColor, currentStep / steps);
  let currentBgColor = lerpColor(bgColor, patternColor, currentStep / steps);

  // Set the canvas background color
  background(currentBgColor);

  // Draw African fractal-inspired patterns in a grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      drawAfricanFractal(
        x * fractalSize + fractalSize / 2,
        y * fractalSize + fractalSize / 2,
        fractalSize / 2,
        currentPatternColor
      );
    }
  }

  // Update step and loop back after reaching max
  currentStep = (currentStep + 1) % steps;
}

function drawAfricanFractal(x, y, size, col) {
  if (size < 10) return;

  fill(col);

  // Central shape inspired by African fractal geometry
  let numSides = 4 + floor(size % 5); // Number of sides in the fractal, cycling between 4-8
  beginShape();
  for (let i = 0; i < numSides; i++) {
    let angle = TWO_PI / numSides * i;
    let xOffset = cos(angle) * size;
    let yOffset = sin(angle) * size;
    vertex(x + xOffset, y + yOffset);
  }
  endShape(CLOSE);

  // Recursive smaller fractals at cardinal directions
  drawAfricanFractal(x - size / 2, y, size * 0.6, col); // Left
  drawAfricanFractal(x + size / 2, y, size * 0.6, col); // Right
  drawAfricanFractal(x, y - size / 2, size * 0.6, col); // Top
  drawAfricanFractal(x, y + size / 2, size * 0.6, col); // Bottom
}

function initializeColors() {
  // Randomize initial pattern and background colors
  patternColor = color(random(255), random(255), random(255));
  bgColor = color(random(255), random(255), random(255));

  // Ensure enough contrast for starting colors
  while (brightness(patternColor) - brightness(bgColor) < 40) {
    bgColor = color(random(255), random(255), random(255));
  }
}

function mousePressed() {
  initializeColors(); // Generate new colors on click
  currentStep = 0; // Reset the transition
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ensure canvas resizes to fit the screen
  fractalSize = width / gridSize; // Recalculate fractal size
}
