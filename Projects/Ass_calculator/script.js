// Get elements
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const multiplyBtn = document.getElementById("multiplyBtn");
const divideBtn = document.getElementById("divideBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

// Multiply function
multiplyBtn.addEventListener("click", () => {
  const n1 = Number(num1.value);
  const n2 = Number(num2.value);
  if (num1.value === "" || num2.value === "") {
    result.textContent = "Please enter both numbers!";
    return;
  }
  const res = n1 * n2;
  result.textContent = `Result: ${res}`;
  addToHistory(`${n1} × ${n2} = ${res}`);
});

// Divide function
divideBtn.addEventListener("click", () => {
  const n1 = Number(num1.value);
  const n2 = Number(num2.value);
  if (num1.value === "" || num2.value === "") {
    result.textContent = "Please enter both numbers!";
    return;
  }
  if (n2 === 0) {
    result.textContent = "Cannot divide by zero!";
    return;
  }
  const res = n1 / n2;
  result.textContent = `Result: ${res}`;
  addToHistory(`${n1} ÷ ${n2} = ${res}`);
});

// Add to history
function addToHistory(text) {
  const item = document.createElement("div");
  item.className = "history-item";
  item.textContent = text;
  historyList.prepend(item);
}

// Clear history
clearBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
  result.textContent = "History cleared!";
});
