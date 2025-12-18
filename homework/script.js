const slider = document.getElementById("slider");
const tempText = document.getElementById("temp");
const statusText = document.getElementById("status");
const log = document.getElementById("log");

function addLog(msg){
  const li = document.createElement("li");
  li.textContent = msg;
  log.prepend(li);
}

function updateTemp(value){
  tempText.textContent = value;

  if (value <= 5){
    statusText.textContent = "Status: Cold";
  } else if (value >= 30){
    statusText.textContent = "Status: Hot";
  } else {
    statusText.textContent = "Status: Normal";
  }

  addLog(`Temperature changed to ${value}°C`);
}

slider.addEventListener("input", () => {
  updateTemp(Number(slider.value));
});

document.getElementById("cool").addEventListener("click", () => {
  slider.value = 5;
  updateTemp(5);
});

document.getElementById("normal").addEventListener("click", () => {
  slider.value = 22;
  updateTemp(22);
});

document.getElementById("hot").addEventListener("click", () => {
  slider.value = 35;
  updateTemp(35);
});

// start value
updateTemp(Number(slider.value));
