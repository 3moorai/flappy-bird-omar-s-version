/**
 * FLAPPY BIRD 🌋❄️ • Magma & Frost Edition
 * Next-Gen Hyper-Modern Engine featuring:
 * - Dynamic Edge-to-Edge Responsive Full-Screen Desktop Gameplay
 * - Two Rich Biomes: Volcanic Magma Mode 🌋 & Glacial Arctic Frost Mode ❄️
 * - Official Animated Flappy Bird Sprites (Yellow, Blue, Red)
 * - Next-Gen Procedural Web Audio API soundscapes
 * - Overdrive & Smashing Mechanics with Crystalline / Molten Particle Physics
 */

// ==========================================
// 1. NEXT-GEN PROCEDURAL AUDIO (Web Audio API)
// ==========================================
class ModernAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playThrust() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    if (currentMode === 'frost') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.1);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.value = 3;

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.12);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    }

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playPass(comboCount) {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const magmaScale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
    const frostScale = [659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
    const scale = currentMode === 'frost' ? frostScale : magmaScale;
    const freq = scale[Math.min(comboCount - 1, scale.length - 1)] || scale[0];

    osc.type = currentMode === 'frost' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.18);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playOverdrive() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;

    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = currentMode === 'frost' ? 'sine' : 'sawtooth';
    sub.frequency.setValueAtTime(currentMode === 'frost' ? 90 : 60, now);
    sub.frequency.exponentialRampToValueAtTime(260, now + 0.6);
    subGain.gain.setValueAtTime(0.45, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(now);
    sub.stop(now + 0.7);

    const lead = this.ctx.createOscillator();
    const leadGain = this.ctx.createGain();
    lead.type = currentMode === 'frost' ? 'triangle' : 'square';
    lead.frequency.setValueAtTime(500, now);
    lead.frequency.exponentialRampToValueAtTime(currentMode === 'frost' ? 2200 : 1600, now + 0.5);
    leadGain.gain.setValueAtTime(0.22, now);
    leadGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    lead.connect(leadGain);
    leadGain.connect(this.ctx.destination);
    lead.start(now);
    lead.stop(now + 0.5);
  }

  playSmash() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    
    if (currentMode === 'frost') {
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.22);
    } else {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.25);
    }

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    if (currentMode === 'frost') {
      const ping = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();
      ping.type = 'sine';
      ping.frequency.setValueAtTime(2400, now);
      ping.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      pingGain.gain.setValueAtTime(0.3, now);
      pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      ping.connect(pingGain);
      pingGain.connect(this.ctx.destination);
      ping.start(now);
      ping.stop(now + 0.2);
    }
  }

  playGameOver() {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = currentMode === 'frost' ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }
}

// ==========================================
// 2. MODERN GAME CONSTANTS & SPRITES
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasViewport = document.getElementById('canvasViewport');

const GRAVITY = 0.38;
const JUMP = -8.2;
const PIPE_WIDTH = 96;
const PIPE_SPACING = 380;
const PIPE_SPEED = 5.5;
const spawnInterval = Math.round(PIPE_SPACING / PIPE_SPEED); // ~69 frames
const OVERDRIVE_THRESHOLD = 10;
const OVERDRIVE_DURATION = 6000;

// Official Flappy Bird Animated Frames
// Yellow Bird (Magma Mode)
const flappyYellow = [new Image(), new Image(), new Image()];
flappyYellow[0].src = 'yellowbird_midflap.png';
flappyYellow[1].src = 'yellowbird_upflap.png';
flappyYellow[2].src = 'yellowbird_downflap.png';

// Blue Bird (Frost Mode)
const flappyBlue = [new Image(), new Image(), new Image()];
flappyBlue[0].src = 'bluebird_midflap.png';
flappyBlue[1].src = 'bluebird_upflap.png';
flappyBlue[2].src = 'bluebird_downflap.png';

// Red Bird (Magma Overdrive Phoenix)
const flappyRed = [new Image(), new Image(), new Image()];
flappyRed[0].src = 'redbird_midflap.png';
flappyRed[1].src = 'redbird_upflap.png';
flappyRed[2].src = 'redbird_downflap.png';

let flapFrameIndex = 0;
let flapCounter = 0;

// Player Entity
const brick = {
  x: 160,
  y: 340,
  vy: 0,
  width: 68,
  height: 48,
  rotation: 0
};

let pipes = [];
let particles = [];
let thrusterParticles = [];
let shockwaves = [];
let smashTexts = [];
let floatTexts = [];
let burstTexts = [];
let backgroundEmbers = [];
let mountains = [];

let score = 0;
let combo = 0;
let maxCombo = 0;
let gameOver = false;
let isStarted = false;
let overdriveActive = false;
let overdriveTime = 0;
let screenShake = 0;
let hitStop = 0;
let frameCount = 0;
let gridOffset = 0;

const sound = new ModernAudio();

// UI Elements
const scoreDisplay = document.getElementById('scoreDisplay');
const comboDisplay = document.getElementById('comboDisplay');
const overheatStatus = document.getElementById('overheatStatus');
const overheatBar = document.getElementById('overheatBar');
const startOverlay = document.getElementById('startOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const finalScore = document.getElementById('finalScore');
const bestScore = document.getElementById('bestScore');
const bestScoreStart = document.getElementById('bestScoreStart');
const finalCombo = document.getElementById('finalCombo');
const startBtn = document.getElementById('startBtn');
const replayBtn = document.getElementById('replayBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const muteBtn = document.getElementById('muteBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const biomeMagmaBtn = document.getElementById('biomeMagmaBtn');
const biomeFrostBtn = document.getElementById('biomeFrostBtn');

let savedBest = parseInt(localStorage.getItem('flappy_magma_modern_best') || '0', 10);
bestScore.textContent = savedBest;
bestScoreStart.textContent = savedBest;

// Theme Mode: 'magma' | 'frost'
let currentMode = localStorage.getItem('flappy_biome_mode') || 'magma';

function applyTheme(mode) {
  currentMode = mode;
  localStorage.setItem('flappy_biome_mode', mode);

  const isFrost = mode === 'frost';
  document.body.classList.toggle('theme-frost', isFrost);
  document.body.classList.toggle('theme-magma', !isFrost);

  const themeToggleLabel = document.getElementById('modeToggleLabel');
  const modeToggleIcon = document.getElementById('modeToggleIcon');
  const brandBadge = document.getElementById('brandBadge');
  const energyTitle = document.getElementById('energyTitle');
  const footerComboHint = document.getElementById('footerComboHint');
  const startAvatarImg = document.getElementById('startAvatarImg');

  if (themeToggleLabel) themeToggleLabel.textContent = isFrost ? 'الوضع البركاني 🌋' : 'الوضع الجليدي ❄️';
  if (modeToggleIcon) modeToggleIcon.textContent = isFrost ? '🌋' : '❄️';
  if (brandBadge) {
    const txt = brandBadge.querySelector('.brand-text');
    if (txt) txt.textContent = isFrost ? 'FLAPPY BIRD • FROST' : 'FLAPPY BIRD • MAGMA';
  }
  if (energyTitle) energyTitle.textContent = isFrost ? 'CRYO-FREEZE MATRIX' : 'OVERHEAT MATRIX';
  if (footerComboHint) footerComboHint.textContent = isFrost ? 'طور الفينيق الجليدي والتجميد الخارق' : 'طور الفينيق الناري والتحطيم الخارق';

  if (startAvatarImg) {
    startAvatarImg.src = isFrost ? 'bluebird_midflap.png' : 'yellowbird_midflap.png';
  }

  if (biomeMagmaBtn && biomeFrostBtn) {
    biomeMagmaBtn.classList.toggle('active', !isFrost);
    biomeFrostBtn.classList.toggle('active', isFrost);
  }

  updateHUD();
}

function toggleTheme() {
  applyTheme(currentMode === 'magma' ? 'frost' : 'magma');
}

// Full-Window Responsive Canvas Sizing
function resizeCanvas() {
  if (!canvasViewport) return;
  const rect = canvasViewport.getBoundingClientRect();
  const w = Math.floor(rect.width);
  const h = Math.floor(rect.height);

  if (w > 100 && h > 100 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w;
    canvas.height = h;

    if (!isStarted) {
      brick.x = Math.max(140, Math.min(220, Math.floor(w * 0.16)));
      brick.y = Math.floor(h / 2) - 30;
    }
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Parallax Monoliths / Mountains
for (let i = 0; i < 8; i++) {
  mountains.push({
    x: i * 300,
    width: 460 + Math.random() * 240,
    height: 220 + Math.random() * 260,
    speed: 0.6 + Math.random() * 0.7,
    colorIdx: i
  });
}

// Ambient Weather Particles (Embers in Magma, Snowflakes in Frost)
for (let i = 0; i < 65; i++) {
  backgroundEmbers.push({
    x: Math.random() * (canvas.width || 1200),
    y: Math.random() * (canvas.height || 800),
    r: 1 + Math.random() * 2.8,
    vy: -(0.4 + Math.random() * 1.3),
    vx: (Math.random() - 0.5) * 0.8,
    alpha: 0.25 + Math.random() * 0.65
  });
}

// ==========================================
// 3. ACTION HANDLERS & LOGIC
// ==========================================
function getPipeGap() {
  return Math.max(260, Math.min(315, Math.floor(canvas.height * 0.32)));
}

function spawnPipeAt(xPos) {
  const gap = getPipeGap();
  const minTop = 80;
  const maxTop = Math.max(minTop + 50, canvas.height - gap - 90);
  const topHeight = Math.floor(Math.random() * (maxTop - minTop)) + minTop;

  pipes.push({
    x: xPos,
    topHeight: topHeight,
    bottomY: topHeight + gap,
    passed: false,
    smashed: false,
    fissureOffset: Math.random() * 100
  });
}

function spawnPipe() {
  spawnPipeAt(canvas.width + 20);
}

function resetGame() {
  resizeCanvas();
  brick.x = Math.max(140, Math.min(220, Math.floor(canvas.width * 0.16)));
  brick.y = canvas.height / 2 - 40;
  brick.vy = 0;
  brick.rotation = 0;

  // Pre-populate pipes across screen for expansive widescreen immersion
  pipes = [];
  let px = brick.x + 460;
  while (px < canvas.width + 120) {
    spawnPipeAt(px);
    px += PIPE_SPACING;
  }

  particles = [];
  thrusterParticles = [];
  shockwaves = [];
  smashTexts = [];
  floatTexts = [];
  burstTexts = [];
  score = 0;
  combo = 0;
  gameOver = false;
  isStarted = true;
  overdriveActive = false;
  overdriveTime = 0;
  screenShake = 0;
  hitStop = 0;
  frameCount = 0;

  startOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  updateHUD();
}

function jump() {
  sound.init();
  if (!isStarted) {
    resetGame();
    brick.vy = JUMP;
    sound.playThrust();
    return;
  }
  if (gameOver) {
    resetGame();
    return;
  }
  brick.vy = JUMP;
  sound.playThrust();

  const isFrost = currentMode === 'frost';
  // Particle plume on jump
  for (let i = 0; i < 9; i++) {
    thrusterParticles.push({
      x: brick.x + 8,
      y: brick.y + brick.height * 0.55,
      vx: -(3.5 + Math.random() * 4.5),
      vy: (Math.random() - 0.5) * 4,
      size: 4 + Math.random() * 5,
      life: 1.0,
      decay: 0.045,
      isOverdrive: overdriveActive,
      isFrost: isFrost
    });
  }
}

function triggerOverdrive() {
  overdriveActive = true;
  overdriveTime = Date.now();
  sound.playOverdrive();
  screenShake = 25;

  const isFrost = currentMode === 'frost';

  shockwaves.push({
    x: brick.x + brick.width / 2,
    y: brick.y + brick.height / 2,
    radius: 20,
    maxRadius: 320,
    color: isFrost ? '#00f0ff' : '#00e5ff',
    alpha: 1.0
  });

  burstTexts.push({
    x: canvas.width / 2,
    y: 110,
    text: isFrost ? 'ABSOLUTE ZERO OVERDRIVE' : 'SUPERCHARGED OVERHEAT',
    sub: isFrost ? 'GLACIAL CRYO-DRIVE ENGAGED' : 'INVINCIBLE DRIVE ENGAGED',
    life: 1.0
  });
}

function triggerGameOver() {
  gameOver = true;
  sound.playGameOver();
  screenShake = 22;

  finalScore.textContent = score;
  finalCombo.textContent = `${maxCombo}x`;

  if (score > savedBest) {
    savedBest = score;
    localStorage.setItem('flappy_magma_modern_best', savedBest);
  }
  bestScore.textContent = savedBest;
  bestScoreStart.textContent = savedBest;

  gameOverOverlay.classList.remove('hidden');
}

function updateHUD() {
  scoreDisplay.textContent = score;
  comboDisplay.textContent = `${combo}x`;

  const isFrost = currentMode === 'frost';

  if (overdriveActive) {
    const elapsed = Date.now() - overdriveTime;
    const remainingRatio = Math.max(0, 1 - elapsed / OVERDRIVE_DURATION);
    const pct = Math.round(remainingRatio * 100);
    overheatBar.style.width = `${pct}%`;
    overheatBar.classList.add('erupting');
    overheatStatus.textContent = isFrost ? `CRYO-DRIVE ACTIVE [${pct}%]` : `OVERDRIVE ACTIVE [${pct}%]`;
  } else {
    const chargePct = Math.min(100, Math.round((combo / OVERDRIVE_THRESHOLD) * 100));
    overheatBar.style.width = `${chargePct}%`;
    overheatBar.classList.remove('erupting');
    overheatStatus.textContent = combo > 0 ? `CHARGING [${chargePct}%]` : 'CHARGING [0%]';
  }
}

// Fullscreen Handler
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn('Fullscreen request failed:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// ==========================================
// 4. NEXT-GEN UPDATE LOOP
// ==========================================
function update() {
  if (!isStarted || gameOver) return;

  if (hitStop > 0) {
    hitStop--;
    return;
  }

  frameCount++;

  if (screenShake > 0) screenShake--;

  // Physics & Inertia
  brick.vy += GRAVITY;
  brick.y += brick.vy;

  // Dynamic Aerodynamic Rotation
  const targetRot = Math.min(Math.PI / 3.2, Math.max(-Math.PI / 4.5, brick.vy * 0.055));
  brick.rotation += (targetRot - brick.rotation) * 0.22;

  // Viewport bounds
  if (brick.y < 0) {
    brick.y = 0;
    brick.vy = 0;
  }
  if (brick.y + brick.height > canvas.height) {
    triggerGameOver();
    return;
  }

  // Overdrive timer
  if (overdriveActive) {
    if (Date.now() - overdriveTime >= OVERDRIVE_DURATION) {
      overdriveActive = false;
      combo = 0;
    }
  }

  // Grid offset scroll
  gridOffset = (gridOffset - PIPE_SPEED * 0.45) % 45;

  // Monoliths parallax
  for (const m of mountains) {
    m.x -= m.speed;
    if (m.x + m.width < 0) {
      m.x = canvas.width + Math.random() * 140;
    }
  }

  // Ambient particles (Weather system)
  for (const b of backgroundEmbers) {
    if (currentMode === 'frost') {
      b.y += Math.abs(b.vy) * 1.5;
      b.x += b.vx - 1.2;
      if (b.y > canvas.height + 15) {
        b.y = -15;
        b.x = Math.random() * (canvas.width + 100);
      }
      if (b.x < -15) {
        b.x = canvas.width + 15;
        b.y = Math.random() * canvas.height;
      }
    } else {
      b.y += b.vy;
      b.x += b.vx;
      if (b.y < -10) {
        b.y = canvas.height + 10;
        b.x = Math.random() * canvas.width;
      }
    }
  }

  // Thruster particles
  if (frameCount % 2 === 0) {
    thrusterParticles.push({
      x: brick.x + 8,
      y: brick.y + brick.height * 0.55 + (Math.random() - 0.5) * 8,
      vx: -(2.5 + Math.random() * 3),
      vy: (Math.random() - 0.5) * 1.5,
      size: (overdriveActive ? 5 : 3.5) + Math.random() * 3,
      life: 1.0,
      decay: 0.035,
      isOverdrive: overdriveActive,
      isFrost: currentMode === 'frost'
    });
  }
  for (let i = thrusterParticles.length - 1; i >= 0; i--) {
    const t = thrusterParticles[i];
    t.x += t.vx;
    t.y += t.vy;
    t.life -= t.decay;
    if (t.life <= 0) thrusterParticles.splice(i, 1);
  }

  // Wing flapping animation cycle
  flapCounter++;
  if (flapCounter % 6 === 0) {
    flapFrameIndex = (flapFrameIndex + 1) % 4;
  }

  // Continuous pipe spawn
  if (frameCount % spawnInterval === 0) {
    spawnPipe();
  }

  // Fair Hitbox calculation
  const hitBox = {
    x: brick.x + 8,
    y: brick.y + 6,
    width: brick.width - 16,
    height: brick.height - 12
  };

  // Pipes update & collisions
  for (let i = pipes.length - 1; i >= 0; i--) {
    const p = pipes[i];
    p.x -= PIPE_SPEED;

    // Passing pipe
    if (!p.passed && p.x + PIPE_WIDTH < hitBox.x) {
      p.passed = true;
      combo++;
      maxCombo = Math.max(maxCombo, combo);
      const pts = 10 * combo;
      score += pts;
      sound.playPass(combo);

      floatTexts.push({
        x: p.x + 35,
        y: p.topHeight + 15,
        text: `+${pts}`,
        alpha: 1.0
      });

      if (!overdriveActive && combo >= OVERDRIVE_THRESHOLD) {
        triggerOverdrive();
      }
      updateHUD();
    }

    // Collision check
    if (!p.smashed) {
      const collidesX = (hitBox.x + hitBox.width > p.x && hitBox.x < p.x + PIPE_WIDTH);
      const collidesTop = hitBox.y < p.topHeight;
      const collidesBottom = hitBox.y + hitBox.height > p.bottomY;

      if (collidesX && (collidesTop || collidesBottom)) {
        if (overdriveActive) {
          // SMASH OBSTACLE!
          p.smashed = true;
          sound.playSmash();
          screenShake = 22;
          hitStop = 5;
          score += 100;

          const isFrost = currentMode === 'frost';

          // Shockwave at impact point
          shockwaves.push({
            x: p.x + PIPE_WIDTH / 2,
            y: collidesTop ? p.topHeight : p.bottomY,
            radius: 15,
            maxRadius: 200,
            color: isFrost ? '#00ffff' : '#ffbb00',
            alpha: 1.0
          });

          // Holographic SMASH marker
          smashTexts.push({
            x: p.x + PIPE_WIDTH / 2,
            y: collidesTop ? p.topHeight + 50 : p.bottomY - 50,
            text: isFrost ? 'GLACIAL SHATTER!' : 'MAGMA SMASH!',
            life: 1.0
          });

          // Shattered debris particles
          for (let k = 0; k < 30; k++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 4 + Math.random() * 9;
            let col;
            if (isFrost) {
              col = Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? '#00f0ff' : '#8fe8ff');
            } else {
              col = Math.random() > 0.4 ? '#ff5500' : (Math.random() > 0.5 ? '#ffcc00' : '#00e5ff');
            }
            particles.push({
              x: p.x + Math.random() * PIPE_WIDTH,
              y: collidesTop ? Math.random() * p.topHeight : p.bottomY + Math.random() * (canvas.height - p.bottomY),
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              size: 4 + Math.random() * 6,
              color: col,
              life: 1.0,
              decay: 0.028
            });
          }
          updateHUD();
        } else {
          triggerGameOver();
          return;
        }
      }
    }

    // Remove off-screen
    if (p.x + PIPE_WIDTH < -60) {
      pipes.splice(i, 1);
    }
  }

  // Shockwaves update
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.radius += 10;
    s.alpha -= 0.035;
    if (s.alpha <= 0 || s.radius >= s.maxRadius) {
      shockwaves.splice(i, 1);
    }
  }

  // Floating score text
  for (let i = floatTexts.length - 1; i >= 0; i--) {
    const f = floatTexts[i];
    f.y -= 1.8;
    f.alpha -= 0.025;
    if (f.alpha <= 0) floatTexts.splice(i, 1);
  }

  // Debris particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.vy += 0.25;
    pt.life -= pt.decay;
    if (pt.life <= 0) particles.splice(i, 1);
  }

  // Smash banner texts
  for (let i = smashTexts.length - 1; i >= 0; i--) {
    const s = smashTexts[i];
    s.life -= 0.035;
    if (s.life <= 0) smashTexts.splice(i, 1);
  }

  // Overdrive banner texts
  for (let i = burstTexts.length - 1; i >= 0; i--) {
    const b = burstTexts[i];
    b.life -= 0.015;
    if (b.life <= 0) burstTexts.splice(i, 1);
  }
}

// ==========================================
// 5. NEXT-GEN RENDERING PIPELINE
// ==========================================
function draw() {
  ctx.save();

  // Screen shake
  if (screenShake > 0) {
    const dx = (Math.random() - 0.5) * screenShake * 1.5;
    const dy = (Math.random() - 0.5) * screenShake * 1.5;
    ctx.translate(dx, dy);
  }

  const isFrost = currentMode === 'frost';

  // 1. Sky & Atmospheric Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (isFrost) {
    grad.addColorStop(0, '#010813');
    grad.addColorStop(0.4, '#041f36');
    grad.addColorStop(0.75, '#083a5e');
    grad.addColorStop(1, '#0e4a77');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Aurora Waves
    const auroraGrad = ctx.createRadialGradient(
      canvas.width * 0.5 + Math.sin(Date.now() * 0.001) * 120, 0, 50,
      canvas.width * 0.5, canvas.height * 0.4, canvas.width * 0.7
    );
    auroraGrad.addColorStop(0, 'rgba(0, 255, 200, 0.12)');
    auroraGrad.addColorStop(0.5, 'rgba(0, 180, 255, 0.08)');
    auroraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auroraGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    grad.addColorStop(0, '#0a0202');
    grad.addColorStop(0.45, '#1d0404');
    grad.addColorStop(0.85, '#380a0a');
    grad.addColorStop(1, '#521008');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 2. Parallax Monoliths / Glaciers
  for (const m of mountains) {
    if (isFrost) {
      ctx.fillStyle = `rgba(${6 + m.colorIdx * 4}, ${30 + m.colorIdx * 6}, ${55 + m.colorIdx * 8}, 0.75)`;
    } else {
      ctx.fillStyle = `rgba(${45 + m.colorIdx * 12}, 6, 6, 0.7)`;
    }

    ctx.beginPath();
    ctx.moveTo(m.x, canvas.height);
    ctx.lineTo(m.x + m.width * 0.5, canvas.height - m.height);
    ctx.lineTo(m.x + m.width, canvas.height);
    ctx.closePath();
    ctx.fill();

    // In frost mode, add crystalline snow cap highlight
    if (isFrost) {
      ctx.fillStyle = 'rgba(180, 245, 255, 0.35)';
      ctx.beginPath();
      ctx.moveTo(m.x + m.width * 0.35, canvas.height - m.height * 0.4);
      ctx.lineTo(m.x + m.width * 0.5, canvas.height - m.height);
      ctx.lineTo(m.x + m.width * 0.65, canvas.height - m.height * 0.4);
      ctx.closePath();
      ctx.fill();
    }
  }

  // 3. Cyber Sci-Fi Scrolling Grid
  ctx.strokeStyle = isFrost ? 'rgba(0, 220, 255, 0.07)' : 'rgba(255, 60, 0, 0.06)';
  ctx.lineWidth = 1;
  const gridSize = 45;
  for (let x = gridOffset; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // 4. Ambient Weather Particles
  for (const b of backgroundEmbers) {
    if (isFrost) {
      ctx.save();
      ctx.globalAlpha = b.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      if (b.r > 2.2) {
        ctx.strokeStyle = 'rgba(180, 245, 255, 0.75)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.x - b.r * 1.6, b.y);
        ctx.lineTo(b.x + b.r * 1.6, b.y);
        ctx.moveTo(b.x, b.y - b.r * 1.6);
        ctx.lineTo(b.x, b.y + b.r * 1.6);
        ctx.stroke();
      }
      ctx.restore();
    } else {
      ctx.fillStyle = `rgba(255, 140, 30, ${b.alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 5. Draw Cyber-Conduits (Molten vs Glacial Pipes)
  drawModernPipes();

  // 6. Draw Shockwaves
  for (const s of shockwaves) {
    ctx.save();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 3.5;
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 7. Draw Thruster Particles
  for (const t of thrusterParticles) {
    ctx.save();
    ctx.globalAlpha = t.life;
    let col;
    if (t.isFrost) {
      col = t.isOverdrive ? '#00ffff' : (t.life > 0.5 ? '#ffffff' : '#66e5ff');
    } else {
      col = t.isOverdrive ? '#00e5ff' : (t.life > 0.5 ? '#ffaa00' : '#ff3300');
    }
    ctx.fillStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.size * t.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 8. Draw Animated Flappy Bird
  drawModernSeahorse();

  // 9. Explosion Debris
  for (const pt of particles) {
    ctx.save();
    ctx.fillStyle = pt.color;
    ctx.globalAlpha = pt.life;
    ctx.shadowColor = pt.color;
    ctx.shadowBlur = 8;
    ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
    ctx.restore();
  }

  // 10. HUD Floating Overlays
  drawModernTextMarkers();

  ctx.restore();
}

function drawModernPipes() {
  const capHeight = 26;
  const capWidth = PIPE_WIDTH;
  const stemWidth = 76;
  const stemOffset = (capWidth - stemWidth) / 2;
  const time = Date.now() * 0.003;
  const isFrost = currentMode === 'frost';

  for (const p of pipes) {
    if (p.smashed) continue;

    const stemX = p.x + stemOffset;

    // --- TOP CONDUIT ---
    const topStemHeight = Math.max(0, p.topHeight - capHeight);
    if (topStemHeight > 0) {
      if (isFrost) {
        const topGrad = ctx.createLinearGradient(stemX, 0, stemX + stemWidth, 0);
        topGrad.addColorStop(0, '#031728');
        topGrad.addColorStop(0.2, '#0a3a5e');
        topGrad.addColorStop(0.5, '#1e78ad');
        topGrad.addColorStop(0.8, '#0d466f');
        topGrad.addColorStop(1, '#041f36');
        ctx.fillStyle = topGrad;
        ctx.fillRect(stemX, 0, stemWidth, topStemHeight);

        // Specular ice crystal reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fillRect(stemX + 10, 0, 5, topStemHeight);

        // Glowing interior neon cryo vein
        const veinGlow = Math.sin(time + p.fissureOffset) * 0.35 + 0.65;
        ctx.strokeStyle = `rgba(0, 240, 255, ${veinGlow})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(stemX + stemWidth / 2, 0);
        ctx.lineTo(stemX + stemWidth / 2, topStemHeight);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        const topGrad = ctx.createLinearGradient(stemX, 0, stemX + stemWidth, 0);
        topGrad.addColorStop(0, '#220404');
        topGrad.addColorStop(0.2, '#660b0b');
        topGrad.addColorStop(0.45, '#850f0f');
        topGrad.addColorStop(0.8, '#4d0808');
        topGrad.addColorStop(1, '#1a0303');
        ctx.fillStyle = topGrad;
        ctx.fillRect(stemX, 0, stemWidth, topStemHeight);

        // Glowing interior neon magma vein
        const veinGlow = Math.sin(time + p.fissureOffset) * 0.3 + 0.7;
        ctx.strokeStyle = `rgba(255, 80, 0, ${veinGlow})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff4400';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(stemX + stemWidth / 2, 0);
        ctx.lineTo(stemX + stemWidth / 2, topStemHeight);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Top Cap
    if (isFrost) {
      const capGrad = ctx.createLinearGradient(p.x, 0, p.x + capWidth, 0);
      capGrad.addColorStop(0, '#0a3d61');
      capGrad.addColorStop(0.5, '#00c3ff');
      capGrad.addColorStop(1, '#0a3d61');
      ctx.fillStyle = capGrad;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 12;
      ctx.fillRect(p.x, p.topHeight - capHeight, capWidth, capHeight);

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.fillRect(p.x + 4, p.topHeight - 6, capWidth - 8, 3);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#ff3300';
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 10;
      ctx.fillRect(p.x, p.topHeight - capHeight, capWidth, capHeight);
      ctx.fillStyle = '#ffbb00';
      ctx.fillRect(p.x + 4, p.topHeight - 6, capWidth - 8, 3);
      ctx.shadowBlur = 0;
    }

    // --- BOTTOM CONDUIT ---
    const bottomCapY = p.bottomY;
    const bottomStemY = p.bottomY + capHeight;
    const bottomStemHeight = Math.max(0, canvas.height - bottomStemY);

    // Bottom Cap
    if (isFrost) {
      const capGrad = ctx.createLinearGradient(p.x, 0, p.x + capWidth, 0);
      capGrad.addColorStop(0, '#0a3d61');
      capGrad.addColorStop(0.5, '#00c3ff');
      capGrad.addColorStop(1, '#0a3d61');
      ctx.fillStyle = capGrad;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 12;
      ctx.fillRect(p.x, bottomCapY, capWidth, capHeight);

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.fillRect(p.x + 4, bottomCapY + 3, capWidth - 8, 3);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#ff3300';
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 10;
      ctx.fillRect(p.x, bottomCapY, capWidth, capHeight);
      ctx.fillStyle = '#ffbb00';
      ctx.fillRect(p.x + 4, bottomCapY + 3, capWidth - 8, 3);
      ctx.shadowBlur = 0;
    }

    // Bottom Stem
    if (bottomStemHeight > 0) {
      if (isFrost) {
        const botGrad = ctx.createLinearGradient(stemX, 0, stemX + stemWidth, 0);
        botGrad.addColorStop(0, '#031728');
        botGrad.addColorStop(0.2, '#0a3a5e');
        botGrad.addColorStop(0.5, '#1e78ad');
        botGrad.addColorStop(0.8, '#0d466f');
        botGrad.addColorStop(1, '#041f36');
        ctx.fillStyle = botGrad;
        ctx.fillRect(stemX, bottomStemY, stemWidth, bottomStemHeight);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fillRect(stemX + 10, bottomStemY, 5, bottomStemHeight);

        const veinGlow = Math.cos(time + p.fissureOffset) * 0.35 + 0.65;
        ctx.strokeStyle = `rgba(0, 240, 255, ${veinGlow})`;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(stemX + stemWidth / 2, bottomStemY);
        ctx.lineTo(stemX + stemWidth / 2, canvas.height);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        const botGrad = ctx.createLinearGradient(stemX, 0, stemX + stemWidth, 0);
        botGrad.addColorStop(0, '#220404');
        botGrad.addColorStop(0.2, '#660b0b');
        botGrad.addColorStop(0.45, '#850f0f');
        botGrad.addColorStop(0.8, '#4d0808');
        botGrad.addColorStop(1, '#1a0303');
        ctx.fillStyle = botGrad;
        ctx.fillRect(stemX, bottomStemY, stemWidth, bottomStemHeight);

        const veinGlow = Math.cos(time + p.fissureOffset) * 0.3 + 0.7;
        ctx.strokeStyle = `rgba(255, 80, 0, ${veinGlow})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff4400';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(stemX + stemWidth / 2, bottomStemY);
        ctx.lineTo(stemX + stemWidth / 2, canvas.height);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }
}

function drawModernSeahorse() {
  ctx.save();
  ctx.translate(brick.x + brick.width / 2, brick.y + brick.height / 2);
  ctx.rotate(brick.rotation);

  const startX = -brick.width / 2;
  const startY = -brick.height / 2;

  const frameSeq = [0, 1, 0, 2];
  const activeFrame = frameSeq[flapFrameIndex % 4];

  const isFrost = currentMode === 'frost';
  let sprite;

  if (isFrost) {
    sprite = flappyBlue[activeFrame];
  } else {
    sprite = overdriveActive ? flappyRed[activeFrame] : flappyYellow[activeFrame];
  }

  // Aura and glow effects
  if (overdriveActive) {
    const time = Date.now() * 0.008;
    const auraColor = isFrost ? '#00f0ff' : '#ff3700';
    const ringColor = isFrost ? 'rgba(180, 245, 255, 0.7)' : 'rgba(255, 200, 0, 0.7)';

    // Outer radiant plasma / cryo ring
    ctx.save();
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = auraColor;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 36 + Math.sin(time) * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.shadowColor = auraColor;
    ctx.shadowBlur = 24;
  } else {
    ctx.shadowColor = isFrost ? '#00e5ff' : '#ffaa00';
    ctx.shadowBlur = isFrost ? 12 : 8;
  }

  if (sprite.complete && sprite.naturalWidth > 0) {
    ctx.drawImage(sprite, startX, startY, brick.width, brick.height);
  }

  ctx.restore();
}

function drawModernTextMarkers() {
  const isFrost = currentMode === 'frost';

  // Floating score tags
  for (const f of floatTexts) {
    ctx.save();
    ctx.globalAlpha = f.alpha;
    ctx.font = '900 18px "Orbitron", sans-serif';
    ctx.fillStyle = isFrost ? '#00f0ff' : '#ff6600';
    ctx.shadowColor = isFrost ? '#00ffff' : '#ff3300';
    ctx.shadowBlur = 10;
    ctx.fillText(f.text, f.x, f.y);
    ctx.restore();
  }

  // Holographic Smash markers
  ctx.font = '900 22px "Orbitron", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = isFrost ? '#00f0ff' : '#ff3700';
  ctx.shadowColor = isFrost ? '#ffffff' : '#ffaa00';
  ctx.shadowBlur = 15;
  for (const s of smashTexts) {
    ctx.fillText(s.text || (isFrost ? 'GLACIAL SHATTER!' : 'MAGMA SMASH!'), s.x, s.y);
  }

  // Supercharged Overdrive banner
  for (const b of burstTexts) {
    ctx.save();
    ctx.globalAlpha = b.life;
    ctx.font = '900 26px "Orbitron", sans-serif';
    ctx.fillStyle = isFrost ? '#ffffff' : '#ffcc00';
    ctx.shadowColor = isFrost ? '#00e5ff' : '#ff6600';
    ctx.shadowBlur = 22;
    ctx.fillText(b.text, b.x, b.y);

    ctx.font = '700 14px "Orbitron", sans-serif';
    ctx.fillStyle = isFrost ? '#5ce1e6' : '#00e5ff';
    ctx.fillText(b.sub, b.x, b.y + 28);
    ctx.restore();
  }

  ctx.shadowBlur = 0;
}

// ==========================================
// 6. EVENT BINDINGS
// ==========================================
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    e.preventDefault();
    jump();
  }
  if (e.code === 'KeyT') {
    toggleTheme();
  }
  if (e.code === 'KeyF') {
    toggleFullscreen();
  }
  if (e.code === 'KeyM') {
    sound.init();
    sound.muted = !sound.muted;
    const icon = document.getElementById('muteIcon');
    if (icon) icon.textContent = sound.muted ? '🔇' : '🔊';
  }
});

canvas.addEventListener('pointerdown', (e) => {
  jump();
});

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetGame();
});

replayBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetGame();
});

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTheme();
  });
}

if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFullscreen();
  });
}

document.addEventListener('fullscreenchange', () => {
  const isFull = !!document.fullscreenElement;
  if (fullscreenBtn) {
    const icon = fullscreenBtn.querySelector('.btn-icon');
    const text = fullscreenBtn.querySelector('.btn-text');
    if (icon) icon.textContent = isFull ? '🗗' : '⛶';
    if (text) text.textContent = isFull ? 'تصغير' : 'ملء الشاشة';
  }
  setTimeout(resizeCanvas, 100);
});

if (muteBtn) {
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.init();
    sound.muted = !sound.muted;
    const icon = document.getElementById('muteIcon');
    if (icon) icon.textContent = sound.muted ? '🔇' : '🔊';
  });
}

if (biomeMagmaBtn) {
  biomeMagmaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    applyTheme('magma');
  });
}

if (biomeFrostBtn) {
  biomeFrostBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    applyTheme('frost');
  });
}

// Initial theme setup
applyTheme(currentMode);

// Game loop runner
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

draw();
requestAnimationFrame(loop);
