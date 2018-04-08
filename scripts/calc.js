let displayText = "";

const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "×";
const DIVIDE = "÷";
const PERCENT = "%";

const BACKSPACE = "←";
const CLEAR = "C";
const ON = "ON"
const EQUALS = "=";

const ERROR = "ERROR";


const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", function(e)
{
  if(displayText === ERROR)
  {
    displayText = "";
    updateDisplay();
  }

  if(button.textContent.search(/[0-9.]/) === 0 || button.textContent === "00")
  {
    displayText += button.textContent;
    updateDisplay();

    if(button.textContent === ".")
    {
      document.getElementById("decimal").disabled = true;
    }
  }
  else if(button.textContent === BACKSPACE)
  {

    const removed = displayText.charAt(displayText.length - 1);

    if(removed === ".")
    {
      document.getElementById("decimal").disabled = false;
    }

    let trimmedArray = Array.from(displayText.trim());
    displayText = trimmedArray.splice(0, trimmedArray.length - 1)
                              .join("").trim();
    updateDisplay();
  }
  else if(button.textContent === CLEAR)
  {
    document.getElementById("decimal").disabled = false;
    displayText = "";
    updateDisplay();
  }
  else if(button.textContent === ON)
  {
    // displayText = "";
    // updateDisplay();
    location.reload();
  }
  else if(button.textContent === EQUALS)
  {
    // operate function
    console.log("Operating");
    console.log(displayText);
    let operations = displayText.trim().split(" "); // array containing as entries numbers and operators
    if(operations.length % 2 === 0) // even # elements implies one extra operator
    {
      operations.pop();
    }

    console.log(operations);

    for(let i = 2; i < operations.length; i += 2)
    {
      const operation = operations[i - 1];
      const operand1 = parseFloat(operations[i - 2]);
      const operand2 = parseFloat(operations[i]);
      operations[i] = operate(operation, operand1, operand2);
    }

    if(operations.indexOf(ERROR) === -1)
    {
      displayText = operations[operations.length - 1].toString();
      updateDisplay();
    }

    document.getElementById("decimal").disabled = false;
  }
  else if(button.textContent.search(/[+-×÷]/) === 0)
  {
    displayText += " " + button.textContent + " ";
    updateDisplay();
  }
}));

function operate(operation, a, b)
{
  switch(operation)
  {
    case ADD:
      return a + b;
      break;

    case SUBTRACT:
      return a - b
      break;

    case MULTIPLY:
      return a*b;
      break;

    case DIVIDE:
    {
      if(b === 0)
      {
        displayText = ERROR;
        updateDisplay();
        return ERROR;
      }
      else
      {
        let ans = a/b;
        ans = Math.round(ans*100000)/100000
        return ans;
      }
      break;
    }

    default:
      displayText = ERROR;
      updateDisplay();
      return ERROR;
  }
}

function updateDisplay()
{
  console.log(displayText);
  if(displayText == "NaN" || displayText.length >= 14)
  {
    displayText = ERROR;
  }

  const display = document.querySelector(".display");
  display.textContent = displayText;
}

maxchars =
{
}
