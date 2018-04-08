// creates n x n grid
function pickRandomColour()
{
  const letters = "012345679ABCDEF";
  let colour = "#";
  for(let i = 0; i < 6; i++)
  {
    colour += letters[Math.floor(Math.random()*letters.length)];
  }

  return colour;
}

function createGrid(n)
{
  const gridDiv = document.querySelector(".grid");
  // clear the grid
  while(gridDiv.firstChild)
  {
    gridDiv.removeChild(gridDiv.firstChild);
  }

  const heightString = window.getComputedStyle(gridDiv, null).getPropertyValue("height");
  const height = parseFloat(heightString);
  console.log(height);
  // gridDiv.removeAttribute("grid-template-columns");
  // gridDiv.removeAttribute("grid-template-rows");
  gridDiv.style.gridTemplateColumns = "";
  gridDiv.style.gridTemplateRows = "";
  const dim = height/n; // the height and width of the cells
  console.log(dim);
  for(let i = 0; i < n; i++)
  {
    gridDiv.style.gridTemplateColumns += " " + dim + "px ";
    console.log("i = " + i);
    for(let j = 0; j < n; j++)
    {
      gridDiv.style.gridTemplateRows += dim + "px ";
      console.log("\tj = " + j);
      const newDiv = document.createElement("div");
      newDiv.classList.add("cell");

      // newDiv.style.height = String(width/n) + "px";
      // newDiv.style.width = String(width/n) + "px";

      gridDiv.appendChild(newDiv);
    }
  }

  const cells = Array.from(document.querySelectorAll(".cell"));

  cells.forEach(cell => cell.addEventListener("mouseenter", function changeColour(e)
  {
    console.log("cell entered");
    cell.style.backgroundColor = pickRandomColour();
  }));
}

createGrid(16);

const button = document.querySelector("button");
button.addEventListener("click", function(e)
{
  let newDim = prompt("How big!");
  createGrid(newDim);
});
