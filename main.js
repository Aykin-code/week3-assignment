// API LINK FOR UPGRADES
// https://cookie-upgrade-api.vercel.app/api/upgrades
// ===

// REFERENCE FOR localStorage COMMANDS
// -----------------------------
// localStorage.setItem("key", "value");       // save
// const value = localStorage.getItem("key");  // retrieve
// localStorage.removeItem("key");             // delete one item
// localStorage.clear();                       // wipe everything
// -----------------------------
// For objects we stored with JSON.stringify, we must call JSON.parse to turn the string back into an object
//

// VARIABLES AND CONSTANTS HERE
let cookieCount = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;
let upgrades = [];
let upgradeCounts = {};

const cookieButton = document.getElementById("cookie");
const cookieDisplay = document.getElementById("cookie-count");
const shopContainer = document.getElementById("shop");

// click sound vars here
const clickSound = new Audio("assets/click.mp3");
let soundOn = true;

// Load saved game from localStorage - this part is driving me nuts, @Sam & Connor!
// had to goole and MDN this alot and I still don't fully understand it

function loadGame() {
  const savedData = JSON.parse(localStorage.getItem("cookieGame"));

  if (savedData && typeof savedData === "object") {
    const parsedCount = Number(savedData.cookieCount);
    const parsedCPC = Number(savedData.cookiesPerClick);
    const parsedAuto = Number(savedData.cookieAuto);
    // kept getting Nan error so googled this to fix it
    cookieCount = isNaN(parsedCount) || parsedCount < 0 ? 0 : parsedCount;
    cookiesPerClick = isNaN(parsedCPC) || parsedCPC < 1 ? 1 : parsedCPC;
    cookiesPerSecond = isNaN(parsedAuto) || parsedAuto < 0 ? 0 : parsedAuto;

    upgradeCounts =
      savedData.upgradeCounts && typeof savedData.upgradeCounts === "object"
        ? savedData.upgradeCounts
        : {};
  } else {
    cookieCount = 0;
    cookiesPerClick = 1;
    cookiesPerSecond = 0;
    upgradeCounts = {};
  }

  updateDisplay();
}

// Save game to localStorage
function saveGame() {
  localStorage.setItem(
    "cookieGame",
    JSON.stringify({
      cookieCount: Number(cookieCount),
      cookiesPerClick: Number(cookiesPerClick),
      cookieAuto: Number(cookiesPerSecond),
      upgradeCounts: upgradeCounts,
    })
  );
}

// Update cookie display
function updateDisplay() {
  cookieDisplay.textContent = `Cookies: ${cookieCount}`;
}

// Add cookies on click
function clickCookie() {
  cookieCount += cookiesPerClick;

  //   cookieCount += cookieCount;
  console.log("Click registered", cookiesPerClick);
  console.log(typeof cookiesPerClick, cookiesPerClick);
  console.log(typeof cookieCount, cookieCount);
  console.log("cookie count=", cookieCount);
  console.log("per click=", cookiesPerClick);

  //   add click sound here
  if (soundOn) {
    clickSound.currentTime = 0; // rewind to start
    clickSound.play();
  }
  updateDisplay();
  saveGame();
}

// Handle purchase of an upgrade
function purchaseUpgrade(upgrade) {
  const cost = Number(upgrade.cost);
  const auto = Number(upgrade.increase);

  if (cookieCount < cost) {
    alert(
      "Not enough cookies to purchase upgrade. Maybe pop to tesco and get some more."
    );
    return;
  }

  cookieCount -= cost;
  cookiesPerSecond += auto;

  // Track number of purchases
  upgradeCounts[upgrade.id] = (upgradeCounts[upgrade.id] || 0) + 1;

  updateDisplay();
  saveGame();
  renderShop(); // Update purchase counts in UI
}

// Render shop upgrades
function renderShop() {
  shopContainer.innerHTML = "<h2>Upgrades</h2>";
  upgrades.forEach((upg) => {
    const button = document.createElement("button");
    const count = upgradeCounts[upg.id] || 0;

    button.innerHTML = `
      <strong>${upg.name}</strong><br>
      +${upg.increase}/sec - ${upg.cost} cookies<br>
      <em>Purchased: ${count}</em>
    `;

    button.addEventListener("click", () => purchaseUpgrade(upg));
    shopContainer.appendChild(button);
  });
}

// Fetch upgrades list from API
async function fetchUpgrades() {
  try {
    const res = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );
    const data = await res.json();

    upgrades = data.map((upg) => ({
      ...upg,
      increase: Number(upg.increase),
      cost: Number(upg.cost),
    }));

    renderShop();
  } catch (err) {
    console.error("Failed to load upgrades, I blame Connor!", err);
  }
}

// Auto-increment cookies and save
function autoIncrement() {
  cookieCount += cookiesPerSecond;
  updateDisplay();
  saveGame();
}

// Button interactions
document.getElementById("toggle-sound").addEventListener("click", () => {
  const btn = document.getElementById("toggle-sound");
  btn.textContent = btn.textContent.includes("On") ? "Sound: Off" : "Sound: On";
});

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const btn = document.getElementById("toggle-theme");
  btn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

document.getElementById("new-game").addEventListener("click", () => {
  if (confirm("Start a new game? This will erase current progress.")) {
    // Reset in-memory game state
    cookieCount = 0;
    cookiesPerClick = 1;
    cookiesPerSecond = 0;
    upgradeCounts = {};

    // Clear storage
    localStorage.removeItem("cookieGame");

    // Update UI
    updateDisplay();
    renderShop();
  }
});

// Game start?
cookieButton.addEventListener("click", clickCookie);
loadGame();
fetchUpgrades();
// interval in milliseconds 1000 = 1 second
setInterval(autoIncrement, 1000);
