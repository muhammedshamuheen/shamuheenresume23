// Lab 11 - Contact Form Handling (Custom JS)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".php-email-form");
  if (!form) return;

  // Create output area below form (results)
  let output = document.getElementById("lab11-output");
  if (!output) {
    output = document.createElement("div");
    output.id = "lab11-output";
    output.style.marginTop = "20px";
    form.parentElement.appendChild(output);
  }

  // Create popup
  let popup = document.getElementById("lab11-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "lab11-popup";
    popup.innerHTML = `
      <div class="lab11-popup-box">
        <p>Form submitted successfully!</p>
        <button type="button" class="lab11-popup-close">OK</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector(".lab11-popup-close").addEventListener("click", () => {
      popup.classList.remove("show");
    });
  }

  function getAvgColor(avg) {
    if (avg < 4) return "red";
    if (avg < 7) return "orange";
    return "green";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // no reload

    // Read values
    const name = form.querySelector('[name="name"]').value.trim();
    const surname = form.querySelector('[name="surname"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const address = form.querySelector('[name="address"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const q1 = Number(form.querySelector('[name="q1"]').value);
    const q2 = Number(form.querySelector('[name="q2"]').value);
    const q3 = Number(form.querySelector('[name="q3"]').value);

    // Object (required)
    const data = {
      name,
      surname,
      email,
      phone,
      address,
      q1,
      q2,
      q3,
      message,
    };

    console.log(data);

    // Average rating
    const avg = (q1 + q2 + q3) / 3;
    const avgText = avg.toFixed(1);

    // Print below form (required)
    output.innerHTML = `
      <div class="lab11-result">
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Surname:</strong> ${surname}</div>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Phone:</strong> ${phone}</div>
        <div><strong>Address:</strong> ${address}</div>
        <div><strong>Q1:</strong> ${q1}</div>
        <div><strong>Q2:</strong> ${q2}</div>
        <div><strong>Q3:</strong> ${q3}</div>
        <div><strong>Message:</strong> ${message}</div>

        <hr>

        <div>
          <strong>${name} ${surname}:</strong>
          <span class="avg" style="color:${getAvgColor(avg)}">${avgText}</span>
        </div>
      </div>
    `;

    // Show popup (required)
    popup.classList.add("show");

    // Optional: reset form
    form.reset();
  });
});

/* ===== Lab 12: Memory Game ===== */
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("mg-board");
  if (!board) return;

  const difficultySelect = document.getElementById("mg-difficulty");
  const startBtn = document.getElementById("mg-start");
  const restartBtn = document.getElementById("mg-restart");
  const movesEl = document.getElementById("mg-moves");
  const matchesEl = document.getElementById("mg-matches");
  const msgEl = document.getElementById("mg-message");

  // Optional UI (best + timer)
  const bestEasyEl = document.getElementById("mg-best-easy");
  const bestHardEl = document.getElementById("mg-best-hard");
  const timeEl = document.getElementById("mg-time");

  // Dataset: 6+ unique items (icons)
  const items = ["🍎","🚀","🎧","⚽","📚","💡","🧩","🎮","🌟","🧠","🧪","🛰️"];

  const config = {
    easy: { cols: 4, rows: 3 }, // 12 cards = 6 pairs
    hard: { cols: 6, rows: 4 }, // 24 cards = 12 pairs
  };

  let started = false;
  let lock = false;
  let firstCard = null;
  let secondCard = null;
  let moves = 0;
  let matches = 0;
  let totalPairs = 0;

  // Timer (optional)
  let timerId = null;
  let seconds = 0;

  function formatTime(s) {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function timerReset() {
    seconds = 0;
    if (timeEl) timeEl.textContent = "00:00";
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function timerStart() {
    timerReset();
    timerId = setInterval(() => {
      seconds += 1;
      if (timeEl) timeEl.textContent = formatTime(seconds);
    }, 1000);
  }

  function timerStop() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  // Best score (optional)
  function loadBest() {
    const be = localStorage.getItem("mg_best_easy");
    const bh = localStorage.getItem("mg_best_hard");
    if (bestEasyEl) bestEasyEl.textContent = be ? `${be} moves` : "—";
    if (bestHardEl) bestHardEl.textContent = bh ? `${bh} moves` : "—";
  }

  function maybeSaveBest(diff, currentMoves) {
    const key = diff === "easy" ? "mg_best_easy" : "mg_best_hard";
    const old = Number(localStorage.getItem(key));
    if (!old || currentMoves < old) {
      localStorage.setItem(key, String(currentMoves));
      loadBest();
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function setStats() {
    movesEl.textContent = String(moves);
    matchesEl.textContent = String(matches);
  }

  function setMessage(text) {
    msgEl.textContent = text;
  }

  function buildDeck(diff) {
    const { cols, rows } = config[diff];
    const totalCards = cols * rows;
    totalPairs = totalCards / 2;

    const chosen = items.slice(0, totalPairs);
    const deck = shuffle([...chosen, ...chosen]);
    return deck;
  }

  function createCard(symbol, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mg-card";
    card.dataset.symbol = symbol;
    card.dataset.index = String(index);
    card.setAttribute("aria-label", "Memory card");
    card.setAttribute("aria-disabled", "false");

    card.innerHTML = `
      <div class="mg-card-inner">
        <div class="mg-face mg-front"></div>
        <div class="mg-face mg-back" aria-hidden="true">${symbol}</div>
      </div>
    `;
    return card;
  }

  function resetState() {
    started = false;
    lock = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matches = 0;
    setStats();
    setMessage("Choose difficulty and press Start.");
    restartBtn.disabled = true;
    timerReset();
  }

  function renderBoard() {
    const diff = difficultySelect.value;
    const deck = buildDeck(diff);

    board.classList.toggle("hard", diff === "hard");
    board.innerHTML = "";

    deck.forEach((sym, i) => {
      board.appendChild(createCard(sym, i));
    });

    resetState();
  }

  function flip(card) { card.classList.add("is-flipped"); }
  function unflip(card) { card.classList.remove("is-flipped"); }

  function disable(card) {
    card.setAttribute("aria-disabled", "true");
    card.disabled = true;
  }

  function onCardClick(card) {
    if (!started) return;
    if (lock) return;
    if (card.disabled) return;
    if (card === firstCard) return;

    flip(card);

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lock = true;

    moves += 1;
    setStats();

    const match = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (match) {
      disable(firstCard);
      disable(secondCard);
      matches += 1;
      setStats();

      firstCard = null;
      secondCard = null;
      lock = false;

      if (matches === totalPairs) {
        setMessage(`🎉 You won! Moves: ${moves}`);
        timerStop();
        maybeSaveBest(difficultySelect.value, moves);
      }
    } else {
      setTimeout(() => {
        unflip(firstCard);
        unflip(secondCard);
        firstCard = null;
        secondCard = null;
        lock = false;
      }, 900);
    }
  }

  board.addEventListener("click", (e) => {
    const card = e.target.closest(".mg-card");
    if (!card) return;
    onCardClick(card);
  });

  difficultySelect.addEventListener("change", () => {
    renderBoard(); // reshuffle + reset + clear stats
  });

  startBtn.addEventListener("click", () => {
    started = true;
    restartBtn.disabled = false;
    setMessage("Game started! Flip two cards.");
    timerStart();
  });

  restartBtn.addEventListener("click", () => {
    renderBoard();
    started = true;
    restartBtn.disabled = false;
    setMessage("New game started! Good luck.");
    timerStart();
  });

  loadBest();
  renderBoard();
});
