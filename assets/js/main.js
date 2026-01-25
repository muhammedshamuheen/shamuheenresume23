/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();


/* =========================
 Memory Game (Flip Cards)
 ========================= */
(() => {
  const boardEl = document.getElementById("mg-board");
  const difficultyEl = document.getElementById("mg-difficulty");
  const startBtn = document.getElementById("mg-start");
  const restartBtn = document.getElementById("mg-restart");

  const movesEl = document.getElementById("mg-moves");
  const matchesEl = document.getElementById("mg-matches");
  const timeEl = document.getElementById("mg-time");
  const msgEl = document.getElementById("mg-message");
  const bestEasyEl = document.getElementById("mg-best-easy");
  const bestHardEl = document.getElementById("mg-best-hard");

  if (!boardEl || !difficultyEl || !startBtn || !restartBtn) return;

  // Dataset: at least 6 unique items (using Bootstrap Icons as "icons" via emoji-like text)
  // You can replace these with images later if you want.
  const ICONS = [
    { id: "cpu", symbol: "💻" },
    { id: "rocket", symbol: "🚀" },
    { id: "brain", symbol: "🧠" },
    { id: "camera", symbol: "📷" },
    { id: "bolt", symbol: "⚡" },
    { id: "music", symbol: "🎵" },
    { id: "game", symbol: "🎮" },
    { id: "globe", symbol: "🌍" },
    { id: "fire", symbol: "🔥" },
    { id: "star", symbol: "⭐" },
    { id: "puzzle", symbol: "🧩" },
    { id: "robot", symbol: "🤖" }
  ];

  const LEVELS = {
    easy: { cols: 4, rows: 3 }, // 12 cards => 6 pairs
    hard: { cols: 6, rows: 4 }  // 24 cards => 12 pairs
  };

  const LS_KEY = "mg_best_moves_v1";

  let gameStarted = false;
  let lockBoard = false;

  let firstCard = null;
  let secondCard = null;

  let moves = 0;
  let matches = 0;
  let totalPairs = 0;

  // Timer
  let timerId = null;
  let startTimeMs = 0;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${pad2(m)}:${pad2(s)}`;
  }

  function readBest() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        easy: typeof parsed.easy === "number" ? parsed.easy : null,
        hard: typeof parsed.hard === "number" ? parsed.hard : null
      };
    } catch {
      return { easy: null, hard: null };
    }
  }

  function writeBest(level, bestMoves) {
    const current = readBest();
    current[level] = bestMoves;
    localStorage.setItem(LS_KEY, JSON.stringify(current));
  }

  function renderBest() {
    const best = readBest();
    bestEasyEl.textContent = best.easy == null ? "—" : `${best.easy} moves`;
    bestHardEl.textContent = best.hard == null ? "—" : `${best.hard} moves`;
  }

  function setMessage(text) {
    msgEl.textContent = text || "";
  }

  function updateStats() {
    movesEl.textContent = String(moves);
    matchesEl.textContent = String(matches);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function resetTimerUI() {
    timeEl.textContent = "00:00";
  }

  function startTimer() {
    stopTimer();
    startTimeMs = Date.now();
    timeEl.textContent = "00:00";
    timerId = setInterval(() => {
      timeEl.textContent = formatTime(Date.now() - startTimeMs);
    }, 250);
  }

  function shuffle(arr) {
    // Fisher–Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildDeck(level) {
    const { cols, rows } = LEVELS[level];
    const totalCards = cols * rows;
    const neededPairs = totalCards / 2;

    const pool = ICONS.slice();
    shuffle(pool);

    const chosen = pool.slice(0, neededPairs);
    const doubled = [...chosen, ...chosen].map((item, idx) => ({
      ...item,
      uid: `${item.id}-${idx}-${Math.random().toString(16).slice(2)}`
    }));

    shuffle(doubled);
    totalPairs = neededPairs;
    return doubled;
  }

  function clearSelection() {
    firstCard = null;
    secondCard = null;
  }

  function setButtonsState() {
    startBtn.disabled = gameStarted;
    restartBtn.disabled = !gameStarted;
  }

  function resetState(keepBoard = false) {
    lockBoard = false;
    clearSelection();
    moves = 0;
    matches = 0;
    updateStats();
    setMessage("Choose difficulty, then press Start.");
    stopTimer();
    resetTimerUI();

    gameStarted = false;
    setButtonsState();

    if (!keepBoard) boardEl.innerHTML = "";
  }

  function initBoard() {
    const level = difficultyEl.value;
    const { cols } = LEVELS[level];
    boardEl.style.setProperty("--mg-cols", cols);

    const deck = buildDeck(level);
    boardEl.innerHTML = "";

    deck.forEach((card) => {
      const cardEl = document.createElement("button");
      cardEl.type = "button";
      cardEl.className = "mg-card";
      cardEl.dataset.cardId = card.id;
      cardEl.dataset.uid = card.uid;
      cardEl.setAttribute("aria-label", "Memory card");
      cardEl.setAttribute("aria-disabled", "true"); // disabled until Start

      cardEl.innerHTML = `
        <div class="mg-card-inner">
          <div class="mg-face mg-front"></div>
          <div class="mg-face mg-back" aria-hidden="true">${card.symbol}</div>
        </div>
      `;

      cardEl.addEventListener("click", () => onCardClick(cardEl));
      boardEl.appendChild(cardEl);
    });
  }

  function enableBoardClicks(enabled) {
    const cards = boardEl.querySelectorAll(".mg-card");
    cards.forEach((c) => c.setAttribute("aria-disabled", enabled ? "false" : "true"));
  }

  function isCardDisabled(cardEl) {
    return cardEl.getAttribute("aria-disabled") === "true";
  }

  function onCardClick(cardEl) {
    if (!gameStarted) return;
    if (lockBoard) return;
    if (isCardDisabled(cardEl)) return;
    if (cardEl.classList.contains("is-matched")) return;
    if (cardEl === firstCard) return;

    cardEl.classList.add("is-flipped");

    if (!firstCard) {
      firstCard = cardEl;
      return;
    }

    secondCard = cardEl;
    lockBoard = true;

    moves += 1;
    updateStats();

    const match =
      firstCard.dataset.cardId === secondCard.dataset.cardId;

    if (match) {
      firstCard.classList.add("is-matched");
      secondCard.classList.add("is-matched");
      firstCard.setAttribute("aria-disabled", "true");
      secondCard.setAttribute("aria-disabled", "true");

      matches += 1;
      updateStats();
      clearSelection();
      lockBoard = false;

      if (matches === totalPairs) onWin();
      return;
    }

    // Not a match => flip back after delay
    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
      clearSelection();
      lockBoard = false;
    }, 1000);
  }

  function onWin() {
    stopTimer();

    const level = difficultyEl.value;
    const best = readBest()[level];
    const isNewBest = best == null || moves < best;

    if (isNewBest) {
      writeBest(level, moves);
      renderBest();
    }

    const finalTime = timeEl.textContent;
    setMessage(
      isNewBest
        ? `🎉 You won! Moves: ${moves} • Time: ${finalTime} • New BEST for ${level.toUpperCase()}!`
        : `🎉 You won! Moves: ${moves} • Time: ${finalTime}`
    );

    gameStarted = false;
    setButtonsState();
    enableBoardClicks(false);
  }

  function startGame() {
    // fresh start on same board
    gameStarted = true;
    setButtonsState();
    setMessage("Good luck! Match all pairs.");
    enableBoardClicks(true);
    startTimer();
  }

  function restartGame() {
    // rebuild deck + reset state but stay in started mode
    initBoard();
    moves = 0;
    matches = 0;
    updateStats();
    setMessage("New game started. Go!");
    lockBoard = false;
    clearSelection();
    gameStarted = true;
    setButtonsState();
    enableBoardClicks(true);
    startTimer();
  }

  // Difficulty change: reinitialize board + reset everything (as required)
  difficultyEl.addEventListener("change", () => {
    initBoard();
    resetState(true);
  });

  startBtn.addEventListener("click", () => {
    // If board not built yet, build it
    if (!boardEl.children.length) initBoard();

    // If user clicked Start after changing difficulty/reset, just start
    startGame();
  });

  restartBtn.addEventListener("click", () => {
    restartGame();
  });

  // Initial setup on page load
  renderBest();
  initBoard();
  resetState(true);
})();

// Intl Tel Input (Country selector + formatting)
(() => {
  const input = document.querySelector("#phone");
  if (!input || typeof window.intlTelInput !== "function") return;

  const phoneHelp = document.getElementById("phoneHelp");

  const iti = window.intlTelInput(input, {
    initialCountry: "auto",
    // If you don't want auto-detect, set: initialCountry: "lt" (Lithuania) for example
    geoIpLookup: (callback) => {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => callback((data && data.country_code) ? data.country_code.toLowerCase() : "us"))
        .catch(() => callback("us"));
    },
    separateDialCode: true,
    nationalMode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js",
  });

  function showMessage(msg, ok) {
    if (!phoneHelp) return;
    phoneHelp.textContent = msg || "";
    phoneHelp.style.color = ok ? "green" : "red";
  }

  input.addEventListener("blur", () => {
    if (!input.value.trim()) {
      showMessage("", true);
      return;
    }
    if (iti.isValidNumber()) {
      showMessage("Valid number ✓", true);
    } else {
      showMessage("Please enter a valid mobile number.", false);
    }
  });

  // OPTIONAL: before form submit, store full international number in hidden input
  const form = input.closest("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (!iti.isValidNumber()) {
        e.preventDefault();
        input.focus();
        showMessage("Please enter a valid mobile number.", false);
        return;
      }

      // create/update hidden field with E.164 format (+370...)
      let hidden = form.querySelector('input[name="phone_e164"]');
      if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "phone_e164";
        form.appendChild(hidden);
      }
      hidden.value = iti.getNumber(); // E.164 format
    });
  }
})();


// Allow ONLY numbers in phone input
(() => {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;

  // Block non-numeric key presses
  phoneInput.addEventListener("keypress", (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Clean pasted input (remove anything not a digit)
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
  });
})();
/* =========================
 End of Memory Game (Flip Cards)
 ========================= */


/* =========================
 Smart Thermometer Section
 ========================= */
(() => {
  const tempEl = document.getElementById("tTemp");
  const humEl = document.getElementById("tHum");
  const feelsEl = document.getElementById("tFeels");
  const statusEl = document.getElementById("tStatus");

  const modeEl = document.getElementById("tMode");
  const manualTemp = document.getElementById("tManualTemp");
  const manualHum = document.getElementById("tManualHum");
  const manualTempLabel = document.getElementById("tManualTempLabel");
  const manualHumLabel = document.getElementById("tManualHumLabel");

  const minTemp = document.getElementById("tMin");
  const maxTemp = document.getElementById("tMax");
  const minLabel = document.getElementById("tMinLabel");
  const maxLabel = document.getElementById("tMaxLabel");

  const scaleMin = document.getElementById("tMinScale");
  const scaleMax = document.getElementById("tMaxScale");

  const unitC = document.getElementById("tuC");
  const unitF = document.getElementById("tuF");

  const gaugeFill = document.getElementById("tGaugeFill");
  const gaugeMarker = document.getElementById("tGaugeMarker");
  const trendEl = document.getElementById("tTrend");
  const alertBox = document.getElementById("tAlertBox");
  const soundEl = document.getElementById("tSound");

  const startBtn = document.getElementById("tStart");
  const stopBtn = document.getElementById("tStop");
  const resetBtn = document.getElementById("tReset");

  const canvas = document.getElementById("tCanvas");
  if (!tempEl || !canvas) return;
  const ctx = canvas.getContext("2d");

  let unit = "C";
  let running = false;
  let timer = null;

  let currentC = 22.2;
  let currentHum = 45;

  let series = [];
  const MAX_POINTS = 60;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const round1 = (v) => Math.round(v * 10) / 10;
  const cToF = (c) => c * 9 / 5 + 32;

  const displayTemp = (c) => (unit === "C" ? `${round1(c)}°C` : `${round1(cToF(c))}°F`);

  function beep() {
    if (!soundEl.checked) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.04;
      o.connect(g);
      g.connect(ac.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ac.close();
      }, 120);
    } catch { }
  }

  function feelsLike(c, h) {
    const adj = (h - 50) / 40; // -1..+1 approx
    return c + adj * 1.2;
  }

  function updateGauge(c) {
    const pct = clamp((c - 0) / 50, 0, 1) * 100;
    gaugeFill.style.width = `${pct}%`;
    gaugeMarker.style.left = `calc(14px + (100% - 28px) * ${pct / 100})`;
  }

  function updateLabels() {
    if (unit === "C") {
      scaleMin.textContent = "0°C";
      scaleMax.textContent = "50°C";
      manualTempLabel.textContent = `${round1(parseFloat(manualTemp.value))}°C`;
      minLabel.textContent = `${round1(parseFloat(minTemp.value))}°C`;
      maxLabel.textContent = `${round1(parseFloat(maxTemp.value))}°C`;
    } else {
      scaleMin.textContent = "32°F";
      scaleMax.textContent = "122°F";
      manualTempLabel.textContent = `${round1(cToF(parseFloat(manualTemp.value)))}°F`;
      minLabel.textContent = `${round1(cToF(parseFloat(minTemp.value)))}°F`;
      maxLabel.textContent = `${round1(cToF(parseFloat(maxTemp.value)))}°F`;
    }
  }

  function setUnit(next) {
    unit = next;
    unitC.classList.toggle("is-active", unit === "C");
    unitF.classList.toggle("is-active", unit === "F");
    updateLabels();
    render();
  }

  function pushPoint(c) {
    series.push(c);
    if (series.length > MAX_POINTS) series.shift();
  }

  function updateTrend() {
    if (series.length < 6) {
      trendEl.textContent = "Waiting for data…";
      return;
    }
    const a = series[series.length - 1];
    const b = series[series.length - 6];
    const diff = round1(a - b);
    if (diff > 0.2) trendEl.textContent = `Rising (+${diff}°C)`;
    else if (diff < -0.2) trendEl.textContent = `Falling (${diff}°C)`;
    else trendEl.textContent = "Stable";
  }

  function drawChart() {
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = cssW;
    const h = cssH;

    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.10)";
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    if (series.length < 2) return;

    const minC = Math.min(...series);
    const maxC = Math.max(...series);
    const pad = 1.0;
    const lo = minC - pad;
    const hi = maxC + pad;

    const toX = (i) => (i / (MAX_POINTS - 1)) * (w - 14) + 7;
    const toY = (c) => {
      const t = (c - lo) / (hi - lo || 1);
      return h - (t * (h - 16) + 8);
    };

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(96,165,250,0.95)";
    ctx.beginPath();
    series.forEach((c, i) => {
      const x = toX(i);
      const y = toY(c);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const last = series[series.length - 1];
    ctx.fillStyle = "rgba(52,211,153,0.95)";
    ctx.beginPath();
    ctx.arc(toX(series.length - 1), toY(last), 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkAlerts(c) {
    const min = parseFloat(minTemp.value);
    const max = parseFloat(maxTemp.value);

    if (c < min) {
      alertBox.textContent = `❄ Too cold! Below minimum (${displayTemp(min)}).`;
      alertBox.style.borderColor = "rgba(96,165,250,0.5)";
      alertBox.style.background = "rgba(96,165,250,0.08)";
      beep();
      return;
    }

    if (c > max) {
      alertBox.textContent = `🔥 Too hot! Above maximum (${displayTemp(max)}).`;
      alertBox.style.borderColor = "rgba(239,68,68,0.45)";
      alertBox.style.background = "rgba(239,68,68,0.08)";
      beep();
      return;
    }

    alertBox.textContent = "No alerts. Temperature is normal.";
    alertBox.style.borderColor = "rgba(0,0,0,0.22)";
    alertBox.style.background = "rgba(0,0,0,0.02)";
  }

  function render() {
    tempEl.textContent = displayTemp(currentC);
    humEl.textContent = `${Math.round(currentHum)}%`;
    feelsEl.textContent = displayTemp(feelsLike(currentC, currentHum));
    updateGauge(currentC);
    checkAlerts(currentC);
    updateTrend();
    drawChart();
  }

  function tick() {
    if (modeEl.value === "manual") {
      currentC = parseFloat(manualTemp.value);
      currentHum = parseFloat(manualHum.value);
    } else {
      currentC = clamp(currentC + (Math.random() - 0.5) * 0.45, 0, 50);
      currentHum = clamp(currentHum + (Math.random() - 0.5) * 1.8, 10, 90);
    }

    pushPoint(currentC);
    render();
  }

  function setRunning(on) {
    running = on;
    startBtn.disabled = on;
    stopBtn.disabled = !on;
    statusEl.textContent = on ? "Running" : "Idle";

    if (on) {
      if (!timer) timer = setInterval(tick, 1000);
      tick();
      return;
    }

    if (timer) clearInterval(timer);
    timer = null;
  }

  function resetAll() {
    setRunning(false);
    currentC = 22.2;
    currentHum = 45;
    series = [];

    manualTemp.value = "22";
    manualHum.value = "45";
    minTemp.value = "18";
    maxTemp.value = "26";

    manualHumLabel.textContent = "45%";
    updateLabels();

    trendEl.textContent = "Waiting for data…";
    alertBox.textContent = "No alerts. Temperature is normal.";
    alertBox.style.borderColor = "rgba(0,0,0,0.22)";
    alertBox.style.background = "rgba(0,0,0,0.02)";

    render();
  }

  // Events
  unitC.addEventListener("click", () => setUnit("C"));
  unitF.addEventListener("click", () => setUnit("F"));

  modeEl.addEventListener("change", () => {
    const manual = modeEl.value === "manual";
    manualTemp.disabled = !manual;
    manualHum.disabled = !manual;
    statusEl.textContent = running ? "Running" : "Idle";
  });

  manualTemp.addEventListener("input", () => updateLabels());
  manualHum.addEventListener("input", () => {
    manualHumLabel.textContent = `${Math.round(parseFloat(manualHum.value))}%`;
  });

  minTemp.addEventListener("input", () => {
    if (parseFloat(minTemp.value) > parseFloat(maxTemp.value)) minTemp.value = maxTemp.value;
    updateLabels();
    render();
  });

  maxTemp.addEventListener("input", () => {
    if (parseFloat(maxTemp.value) < parseFloat(minTemp.value)) maxTemp.value = minTemp.value;
    updateLabels();
    render();
  });

  startBtn.addEventListener("click", () => setRunning(true));
  stopBtn.addEventListener("click", () => setRunning(false));
  resetBtn.addEventListener("click", () => resetAll());

  window.addEventListener("resize", () => drawChart());

  // Init
  setUnit("C");
  resetAll();
})();
/* =========================
 End of Smart Thermometer Section
 ========================= */