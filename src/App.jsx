import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import hemaImg from './assets/hema.jpg';
import './App.css';

// Romantic Tamil Song - Munbe Vaa (from Sillunu Oru Kaadhal | A.R. Rahman, Naresh Iyer, Shreya Ghoshal)
const TAMIL_SONG_URL = "/munbe_vaa.mp3";

// Web Audio API Synthesizer (Realistic sounds: camera shutter, scanner, chords, chimes)
const playSoundFX = (type = 'click') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'heart') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'shutter') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.06);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);

      setTimeout(() => {
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(300, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
          gain2.gain.setValueAtTime(0.2, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc2.start(ctx.currentTime);
          osc2.stop(ctx.currentTime + 0.08);
        } catch {}
      }, 70);
    } else if (type === 'scan') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(660, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'reveal') {
      [587.33, 739.99, 880, 1174.66].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
        subGain.gain.setValueAtTime(0.14, now + i * 0.08);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        subOsc.start(now + i * 0.08);
        subOsc.stop(now + i * 0.08 + 0.25);
      });
    } else if (type === 'scratch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 300, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.1);
        subGain.gain.setValueAtTime(0.15, now + i * 0.1);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
        subOsc.start(now + i * 0.1);
        subOsc.stop(now + i * 0.1 + 0.3);
      });
    } else if (type === 'catch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'spin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(560, now + 0.1);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {}
};

// Curated Photos of Hema (Only Real Photos - Dump Photos Removed)
const INITIAL_HEMA_PHOTOS = [
  {
    id: 1,
    title: "Queen Hema ✨",
    tagline: "The smile that outshines every spotlight",
    url: hemaImg,
    quote: "Hema's elegance is so natural it makes perfection look easy.",
  },
];

// Diverse Floating Heart Badges for Hema
const HEMA_HEART_STYLES = [
  { icon: "💖", text: "Hema", color: "#ec4899" },
  { icon: "✨", text: "Queen Hema", color: "#f59e0b" },
  { icon: "💎", text: "Hema 💎", color: "#06b6d4" },
  { icon: "👑", text: "Iconic Hema", color: "#fbbf24" },
  { icon: "🌸", text: "Sweet Hema", color: "#f472b6" },
  { icon: "🪐", text: "Hema in Orbit", color: "#8b5cf6" },
  { icon: "🌹", text: "Hema 🌹", color: "#f43f5e" },
  { icon: "💫", text: "Radiant Hema", color: "#a855f7" },
  { icon: "🥰", text: "Hema ✨", color: "#fb7185" },
];

// Procedural Generator for 20,736+ Unique Impressive Lines
const QUOTE_PARTS = {
  prefixes: [
    "Rumor has it,", "Scientists recently established that", "It is mathematically confirmed:",
    "Even state-of-the-art AI algorithms agree:", "Frankly speaking,", "In a room full of ordinary mortals,",
    "The official handbook of style states:", "Legend says that every single time you talk,",
    "Harvard & MIT are currently drafting a case study on", "If charisma had an official global currency,",
    "The international benchmark for cool just declared:", "Breaking news from the Department of Pure Energy:"
  ],
  traits: [
    "your razor-sharp wit", "your sheer intellectual horsepower", "your effortless aesthetic charisma",
    "your unmatched Main Character presence", "your high-octane creative brilliance", "your cinematic poise and confidence",
    "your dangerously contagious humor", "your world-class taste in everything", "your uncanny, 200 IQ intuition",
    "your radiant, room-commanding energy", "your legendary ability to stay calm and iconic", "your god-tier conversational agility"
  ],
  superlatives: [
    "could single-handedly revive the economy in 48 hours", "makes the sun feel like it needs to turn up its brightness",
    "is currently defying three fundamental laws of modern physics", "should technically require a government-issued luxury permit",
    "leaves everyone around you looking like background NPCs", "could negotiate world peace before breakfast without breaking a sweat",
    "deserves its own national holiday and commemorative gold coin", "is so iconic it makes museum masterpieces look like rough sketches",
    "outclasses high-end fashion magazines by simply existing", "could talk an offline supercomputer into rebooting out of sheer respect",
    "is the blueprint of how excellence was intended to look", "sets standards so astronomical that satellites are taking notes"
  ],
  closers: [
    "and honestly? We're all just fortunate to witness it.", "and that's not flattery—that's peer-reviewed empirical fact.",
    "so please keep being completely, undeniably phenomenal.", "which explains why you're in an untouchable league of your own.",
    "meaning everyone nearby is secretly taking mental notes.", "so go ahead and adjust your crown, because you earned every carat.",
    "and the planet is easily 10x cooler simply because you're here.", "so never let anyone dim your 10,000-watt spotlight.",
    "which confirms what the universe already knew: you're built different.", "giving a whole new definition to effortless perfection.",
    "leaving no doubt that you are truly one of one.", "and quite frankly, nobody is doing it quite like you."
  ]
};

export default function UltimateExperience() {
  const [level, setLevel] = useState(0);

  // Audio & Dock
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Particles & Screen Click Surprise
  const [particles, setParticles] = useState([]);
  const [surpriseHearts, setSurpriseHearts] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  // Hema's Photos & Modals
  const [hemaPhotos, setHemaPhotos] = useState(INITIAL_HEMA_PHOTOS);
  const [revealedPhotoIds, setRevealedPhotoIds] = useState([1]);
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState(false);
  const fileInputRef = useRef(null);

  // =========================================================================
  // STAGE 0: BIOMETRIC HEART SCANNER LOCKSCREEN
  // =========================================================================
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const scanTimerRef = useRef(null);

  const startScanning = () => {
    setIsScanning(true);
    playSoundFX('scan');
    let p = 0;
    scanTimerRef.current = setInterval(() => {
      p += 5;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(scanTimerRef.current);
        playSoundFX('victory');
        setLevel(1);
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
        confetti({
          particleCount: 70,
          spread: 120,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'],
        });
      }
    }, 45);
  };

  const cancelScanning = () => {
    if (scanProgress < 100) {
      clearInterval(scanTimerRef.current);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  // Screen Click Surprise Hearts
  const handleScreenSurpriseClick = (e) => {
    if (
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('canvas') ||
      e.target.closest('video') ||
      e.target.closest('.modal-content') ||
      e.target.closest('.modern-dock')
    ) {
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const styleObj = HEMA_HEART_STYLES[Math.floor(Math.random() * HEMA_HEART_STYLES.length)];
    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      icon: styleObj.icon,
      text: styleObj.text,
      color: styleObj.color,
      rotation: Math.floor(Math.random() * 30) - 15,
      scale: (Math.random() * 0.3 + 0.9).toFixed(2),
    };

    playSoundFX('heart');
    setSurpriseHearts((prev) => [...prev.slice(-14), newHeart]);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount % 4 === 0) {
      const nextUnrevealed = hemaPhotos.find((p) => !revealedPhotoIds.includes(p.id));
      if (nextUnrevealed) {
        setRevealedPhotoIds((prev) => [...prev, nextUnrevealed.id]);
        setActivePhotoModal(nextUnrevealed);
        playSoundFX('reveal');
      } else {
        playSoundFX('heart');
      }
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ['#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'],
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSurpriseHearts((prev) => prev.filter((h) => Date.now() - h.id < 1800));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  // Custom Photo Upload
  const handleCustomPhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const newPhotoObj = {
          id: Date.now(),
          title: "Cherished Moment 💖",
          tagline: "Special Memory of Hema",
          url: uploadEvent.target.result,
          quote: "A picture-perfect moment of the one and only Hema.",
        };
        setHemaPhotos((prev) => [newPhotoObj, ...prev]);
        setRevealedPhotoIds((prev) => [...prev, newPhotoObj.id]);
        setActivePhotoModal(newPhotoObj);
        playSoundFX('victory');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // =========================================================================
  // GAME 1: MEMORY MATRIX
  // =========================================================================
  const [tiles, setTiles] = useState([
    { id: 1, icon: '💎', label: 'Diamond', matched: false },
    { id: 2, icon: '⚡', label: 'Lightning', matched: false },
    { id: 3, icon: '👑', label: 'Crown', matched: false },
    { id: 4, icon: '🚀', label: 'Rocket', matched: false },
    { id: 5, icon: '💎', label: 'Diamond', matched: false },
    { id: 6, icon: '⚡', label: 'Lightning', matched: false },
    { id: 7, icon: '👑', label: 'Crown', matched: false },
    { id: 8, icon: '🚀', label: 'Rocket', matched: false },
  ]);
  const [activeTiles, setActiveTiles] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  useEffect(() => {
    setTiles((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  const handleTileClick = (index) => {
    if (activeTiles.length === 2 || activeTiles.includes(index) || tiles[index].matched) return;
    playSoundFX('click');
    const updated = [...activeTiles, index];
    setActiveTiles(updated);

    if (updated.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [i1, i2] = updated;
      if (tiles[i1].icon === tiles[i2].icon) {
        playSoundFX('reveal');
        setTiles((prev) =>
          prev.map((t, idx) => (idx === i1 || idx === i2 ? { ...t, matched: true } : t))
        );
        setActiveTiles([]);
      } else {
        setTimeout(() => setActiveTiles([]), 750);
      }
    }
  };
  const isMemoryMatrixCleared = tiles.every((t) => t.matched);

  // =========================================================================
  // GAME 2: STARLIGHT REFLEX CATCHER
  // =========================================================================
  const [gameScore, setGameScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCatchGameActive, setIsCatchGameActive] = useState(false);
  const [fallingStars, setFallingStars] = useState([]);

  const startCatchGame = () => {
    setGameScore(0);
    setCombo(1);
    setTimeLeft(15);
    setIsCatchGameActive(true);
    setFallingStars([]);
    playSoundFX('click');
  };

  useEffect(() => {
    if (!isCatchGameActive) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setIsCatchGameActive(false);
          playSoundFX('victory');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCatchGameActive]);

  useEffect(() => {
    if (!isCatchGameActive) return;
    const spawner = setInterval(() => {
      const items = ['✨', '💎', '🌟', '⚡', '🪐', '🔥', '💖'];
      const newItem = {
        id: Math.random(),
        icon: items[Math.floor(Math.random() * items.length)],
        x: Math.floor(Math.random() * 80) + 10,
        speed: Math.random() * 1.5 + 2,
      };
      setFallingStars((prev) => [...prev.slice(-10), newItem]);
    }, 550);
    return () => clearInterval(spawner);
  }, [isCatchGameActive]);

  const catchStar = (id) => {
    playSoundFX('catch');
    setGameScore((s) => s + 50 * combo);
    setCombo((c) => Math.min(c + 1, 5));
    setFallingStars((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================================================================
  // GAME 3: NEON ROMANCE ROULETTE
  // =========================================================================
  const perks = [
    "Lifetime Free Coffee & Croissant Pass ☕",
    "Supreme Aux Cord & Music Veto Power 🎧",
    "Personal 24/7 Professional Hype-Squad 📣",
    "VIP Immunity To Win Every Single Debate 🥇",
    "Gourmet Midnight Snack Delivery Run 🍕",
    "Official Star Named In Hema's Honor In Orbit 🪐",
  ];
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPerk, setWonPerk] = useState(null);

  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    playSoundFX('spin');
    const extraSpin = Math.floor(Math.random() * 360) + 1800;
    const finalAngle = wheelRotation + extraSpin;
    setWheelRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      playSoundFX('reveal');
      const normalized = finalAngle % 360;
      const prizeIdx = Math.floor((360 - normalized) / 60) % 6;
      setWonPerk(perks[prizeIdx]);
    }, 3200);
  };

  // =========================================================================
  // STAGE 4: 10 AURA AUDIT QUESTIONS FOR HEMA
  // =========================================================================
  const questionsList = useMemo(() => [
    {
      id: 1,
      q: "What should the authorities do if Hema's charisma accidentally blinds someone?",
      options: [
        { text: "Issue mandatory polarized designer sunglasses to the public 😎", commentary: "Safety first. Hema is a walking solar flare of brilliance.", aura: 2500 },
        { text: "File an official apology to physics for breaking radiation limits ⚡", commentary: "Newton and Einstein are currently crying in awe of Hema.", aura: 2800 },
        { text: "Double down. They needed to witness authentic greatness anyway 👑", commentary: "Bold. Iconic. Unapologetic royalty behavior from Hema.", aura: 3000 },
      ],
    },
    {
      id: 2,
      q: "If top scientists scanned Hema's brain right now, what would they discover?",
      options: [
        { text: "A galaxy made of brilliant ideas, witty remarks, and pure gold 🌌", commentary: "NASA is submitting a research grant on Hema as we speak.", aura: 2900 },
        { text: "A 4D chessboard constantly strategizing 10 steps ahead ♟️", commentary: "Grandmasters tremble when Hema enters the room.", aura: 2700 },
        { text: "Dangerous levels of effortless humor and flawless aesthetic taste 🎨", commentary: "The diagnostic machine overheated from Hema's pure culture.", aura: 3100 },
      ],
    },
    {
      id: 3,
      q: "What is Hema's verified, undisputed superpower in everyday life?",
      options: [
        { text: "Lighting up the entire room within 0.4 seconds of arriving 🌟", commentary: "Electric companies hate how Hema replaces an entire power grid.", aura: 2600 },
        { text: "Uncanny intuition that makes fortune tellers look obsolete 🔮", commentary: "Hema doesn't guess; the universe whispers spoilers to her.", aura: 2900 },
        { text: "Looking effortlessly iconic while doing the absolute bare minimum 💅", commentary: "Doing nothing has never looked so high-fashion as when Hema does it.", aura: 3200 },
      ],
    },
    {
      id: 4,
      q: "If Hema was on the cover of Forbes or Vogue next week, what is the headline?",
      options: [
        { text: "'The Standard: How Hema Redefined Style & Success' 📰", commentary: "Every other magazine instantly goes out of print.", aura: 3100 },
        { text: "'Too Sharp To Fail: Hema The Unstoppable Mastermind' 💼", commentary: "Wall Street just adjusted all portfolios in Hema's favor.", aura: 3000 },
        { text: "'Living Proof That Main Character Energy Is A Biological Fact' 💎", commentary: "Scientists officially confirmed Hema is the protagonist.", aura: 3300 },
      ],
    },
    {
      id: 5,
      q: "How does Hema naturally handle an unexpected plot twist or inconvenience?",
      options: [
        { text: "Outsmart it with 4D chess moves before anyone even notices ♟️", commentary: "Problem solved before anyone even knew it existed.", aura: 2800 },
        { text: "Laugh at it with immaculate composure like a movie hero 🎬", commentary: "Explosions in the background, Hema never looks back.", aura: 3000 },
        { text: "Turn it into an iconic story that everyone talks about for years 🥂", commentary: "Turning chaos into gold-standard lore. Legendary.", aura: 3200 },
      ],
    },
    {
      id: 6,
      q: "What's the classified secret behind Hema's impeccable taste?",
      options: [
        { text: "Natural-born genius. You either have it or you don't 💅", commentary: "Some people study aesthetics; Hema IS the curriculum.", aura: 3100 },
        { text: "A curated radar that filters out anything below perfection 🍸", commentary: "High standards, zero compromises, pristine delivery.", aura: 2900 },
        { text: "A direct blessing from the muses of modern culture 🪐", commentary: "The deities of good taste picked Hema as their favorite.", aura: 3000 },
      ],
    },
    {
      id: 7,
      q: "If Hema's aura had a mandatory safety warning label, what would it say?",
      options: [
        { text: "⚠️ Caution: High risk of making everyone else look average", commentary: "Human resources has prepared the non-disclosure agreement.", aura: 3200 },
        { text: "⚡ Warning: Uncontrollable laughter and high dopamine ahead", commentary: "Clinically proven to cure bad days in 3 minutes.", aura: 2900 },
        { text: "🔥 Danger: Extreme swagger; proceed with protective goggles", commentary: "Too hot to handle, too charismatic to ignore.", aura: 3300 },
      ],
    },
    {
      id: 8,
      q: "What happens to the ambient environment when Hema walks into a room?",
      options: [
        { text: "The background music automatically changes to a cinematic score 🎶", commentary: "Hans Zimmer is personally composing Hema's soundtrack.", aura: 3000 },
        { text: "The lighting magically shifts to golden-hour radiance 💡", commentary: "Fluorescent bulbs spontaneously convert to ring lights.", aura: 2800 },
        { text: "Everyone subtly adjusts their posture to match Hema's energy 📝", commentary: "You don't need a crown when your presence does the talking.", aura: 3200 },
      ],
    },
    {
      id: 9,
      q: "On a scale of 1 to 10, how lethal is Hema's sense of humor?",
      options: [
        { text: "Solid 14/10. Medically certified to cause cheek muscle cramps 😂", commentary: "Doctors recommend breathing exercises around Hema.", aura: 3100 },
        { text: "Razor-sharp wit that cuts through awkward silences instantly 🗡️", commentary: "Fastest punchlines in the western hemisphere.", aura: 2900 },
        { text: "Elite dry sarcasm paired with angelic innocence 😇", commentary: "The deadliest combination known to comedy.", aura: 3400 },
      ],
    },
    {
      id: 10,
      q: "If the universe had to issue Hema a permanent cosmic title today, which is hers?",
      options: [
        { text: "Supreme Architect of Immaculate Vibes & High Standards 👑", commentary: "Officially registered in the intergalactic registry under Hema.", aura: 3500 },
        { text: "Chief Executive of Unapologetic Brilliance & Radiance 💎", commentary: "The board of directors votes 100% in favor of Hema.", aura: 3400 },
        { text: "Undisputed Heavyweight Champion of Charm & Intellect 🏆", commentary: "Undefeated, undisputed, universally recognized.", aura: 3600 },
      ],
    },
  ], []);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answeredMap, setAnsweredMap] = useState({});
  const [totalAuraScore, setTotalAuraScore] = useState(94200);

  const handleAnswer = (option, idx) => {
    playSoundFX('click');
    setAnsweredMap((prev) => ({
      ...prev,
      [currentQIndex]: { option, index: idx },
    }));
    setTotalAuraScore((prev) => prev + option.aura);
  };

  const nextQuestion = () => {
    playSoundFX('click');
    if (currentQIndex < questionsList.length - 1) {
      setCurrentQIndex((c) => c + 1);
    } else {
      setLevel(5); // Go to Scratch Card Game
      playSoundFX('victory');
    }
  };

  // =========================================================================
  // STAGE 5: GOLDEN SCRATCH-OFF CARD (Secret Photo & Note Reveal)
  // =========================================================================
  const canvasRef = useRef(null);
  const [isScratchedOff, setIsScratchedOff] = useState(false);
  const [, setScratchPercent] = useState(0);

  useEffect(() => {
    if (level !== 5) return;
    setIsScratchedOff(false);
    setScratchPercent(0);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 340;
    canvas.height = 240;

    ctx.globalCompositeOperation = 'source-over';

    // Golden foil gradient cover
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.7, '#d97706');
    grad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative text on gold foil
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = '12px sans-serif';
    ctx.fillText('Hema\'s Secret Surprise Inside', canvas.width / 2, canvas.height / 2 + 16);
  }, [level]);

  // Full Scratch Action: Clears 100% of the foil and triggers celebration
  const fullScratch = () => {
    if (isScratchedOff) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setIsScratchedOff(true);
    setScratchPercent(100);
    playSoundFX('victory');
    confetti({
      particleCount: 90,
      spread: 120,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#ffffff', '#06b6d4'],
    });
  };

  const handleScratchMove = (e) => {
    if (isScratchedOff) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
    if (clientX === undefined || clientY === undefined) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    playSoundFX('scratch');

    setScratchPercent((p) => {
      const next = p + 4;
      // Auto full-clear when scratch begins so card is completely and cleanly revealed
      if (next >= 20 && !isScratchedOff) {
        fullScratch();
      }
      return next;
    });
  };

  // =========================================================================
  // STAGE 6: 1500+ QUOTES GENERATOR
  // =========================================================================
  const [generatedQuote, setGeneratedQuote] = useState('');
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [copiedToast, setCopiedToast] = useState(false);

  const generateNewImpressiveLine = () => {
    playSoundFX('click');
    const p = QUOTE_PARTS.prefixes[Math.floor(Math.random() * QUOTE_PARTS.prefixes.length)];
    const t = QUOTE_PARTS.traits[Math.floor(Math.random() * QUOTE_PARTS.traits.length)];
    const s = QUOTE_PARTS.superlatives[Math.floor(Math.random() * QUOTE_PARTS.superlatives.length)];
    const c = QUOTE_PARTS.closers[Math.floor(Math.random() * QUOTE_PARTS.closers.length)];
    setGeneratedQuote(`"${p} Hema, ${t} ${s}, ${c}"`);
  };

  useEffect(() => {
    generateNewImpressiveLine();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    playSoundFX('reveal');
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const toggleFavorite = (text) => {
    playSoundFX('click');
    setSavedFavorites((prev) =>
      prev.includes(text) ? prev.filter((i) => i !== text) : [...prev, text]
    );
  };

  // =========================================================================
  // STAGE 7: LIVE WEBCAM PHOTO BOOTH & SOUVENIR SNAPSHOT
  // =========================================================================
  const videoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedSelfie, setCapturedSelfie] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch {
      alert("Camera access was not granted or not available. You can also upload a photo below!");
    }
  };

  const triggerPhotoCountdown = () => {
    setCountdown(3);
    playSoundFX('click');
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          snapPhoto();
          return null;
        }
        playSoundFX('click');
        return c - 1;
      });
    }, 1000);
  };

  const snapPhoto = () => {
    setIsFlashing(true);
    playSoundFX('shutter');
    setTimeout(() => setIsFlashing(false), 280);

    const video = videoRef.current;
    const canvas = photoCanvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth || 480;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext('2d');
      // Mirror image for a natural selfie look
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedSelfie(dataUrl);

      // Stop video stream
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsCameraActive(false);

      // Grand celebration explosion
      confetti({
        particleCount: 100,
        spread: 140,
        origin: { y: 0.5 },
        colors: ['#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'],
      });
    }
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        setCapturedSelfie(uploadEvt.target.result);
        playSoundFX('reveal');
      };
      reader.readAsDataURL(file);
    }
  };

  const userCosmicTitle = useMemo(() => {
    if (answeredMap[9]?.option?.text) {
      return answeredMap[9].option.text.replace(/[👑💎🏆]/gu, '').trim();
    }
    return "Supreme Architect of Immaculate Vibes";
  }, [answeredMap]);

  return (
    <div
      className="ultimate-app"
      onClick={handleScreenSurpriseClick}
      onMouseMove={(e) => {
        const x = e.clientX;
        const y = e.clientY;
        if (Math.random() > 0.45) return;
        setParticles((prev) => [...prev.slice(-14), { id: Date.now() + Math.random(), x, y }]);
      }}
    >
      <audio ref={audioRef} src={TAMIL_SONG_URL} loop preload="auto" />

      {/* Screen Flash Effect when Photo is Snapped */}
      <div className={`camera-flash-overlay ${isFlashing ? 'active' : ''}`} />

      {/* Spotify-Style Music Controller - Tamil Romantic Song */}
      <div className="modern-dock" onClick={toggleMusic} title="Toggle Tamil Song: Munbe Vaa">
        <div className={`dock-disc ${isPlaying ? 'spinning' : ''}`}>
          <span>🎵</span>
        </div>
        <div className="dock-meta">
          <span className="dock-title">{isPlaying ? 'Munbe Vaa En Anbe Vaa' : 'Munbe Vaa (Paused)'}</span>
          <span className="dock-subtitle">{isPlaying ? 'Playing for Queen Hema 💖' : 'Tap to Play Tamil Song ▶️'}</span>
        </div>
        <div className={`eq-cluster ${isPlaying ? 'playing' : ''}`}>
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
        </div>
      </div>

      {/* Floating Vault Shortcut Pill */}
      <div
        className="vault-pill-trigger"
        onClick={() => {
          playSoundFX('click');
          setIsGalleryDrawerOpen(true);
        }}
        title="Open Hema's Secret Photo Vault"
      >
        <span className="vault-pill-icon">📸</span>
        <span className="vault-pill-label">Hema's Vault ({revealedPhotoIds.length}/{hemaPhotos.length})</span>
      </div>

      {/* Ambient Glow Orbs */}
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-violet" />
      <div className="ambient-orb orb-cyan" />

      {/* Cursor Particles */}
      {particles.map((p) => (
        <span key={p.id} className="cursor-particle" style={{ left: p.x, top: p.y }}>
          ✦
        </span>
      ))}

      {/* Floating Hearts with Name "Hema" on Screen Click */}
      {surpriseHearts.map((h) => (
        <div
          key={h.id}
          className="hema-floating-heart"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
            transform: `translate(-50%, -50%) rotate(${h.rotation}deg) scale(${h.scale})`,
            color: h.color,
            borderColor: h.color,
          }}
        >
          <span className="heart-badge-icon">{h.icon}</span>
          <span className="heart-badge-name">{h.text}</span>
          <span className="heart-mini-sparkle">✨</span>
        </div>
      ))}

      {/* Navigation Pills */}
      <div className="stage-nav">
        {[
          { idx: 0, label: 'Portal' },
          { idx: 1, label: 'Memory' },
          { idx: 2, label: 'Starlight' },
          { idx: 3, label: 'Roulette' },
          { idx: 4, label: 'Aura Quiz' },
          { idx: 5, label: 'Scratch Card' },
          { idx: 6, label: '1500+ Quotes' },
          { idx: 7, label: 'Photo Booth' },
        ].map((item) => (
          <button
            key={item.idx}
            className={`nav-pill ${level === item.idx ? 'active' : ''} ${level > item.idx ? 'completed' : ''}`}
            onClick={() => {
              playSoundFX('click');
              setLevel(item.idx);
            }}
          >
            <span className="pill-dot" />
            <span className="pill-text">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ===================================================================
          STAGE 0: BIOMETRIC HEART SCANNER LOCKSCREEN WITH HEMA'S PHOTO
          =================================================================== */}
      {level === 0 && (
        <div className="modern-card portal-card">
          <div className="cyber-badge">✦ PRIVATE SANCTUARY FOR HEMA ✦</div>

          {/* Queen Hema's Royal Portrait with Rotating Aura & Crown */}
          <div className="portal-avatar-wrapper">
            <div className="portal-avatar-glow" />
            <img src={hemaImg} alt="Queen Hema" className="portal-avatar-img" />
            <span className="portal-crown-badge">👑</span>
          </div>

          <h1 className="hero-gradient">For Queen Hema</h1>
          <p className="hero-description">
            A private universe designed in code just for you. Touch and hold the glowing biometric scanner below to unlock your surprise experience!
          </p>

          <div
            className={`biometric-scanner-zone ${isScanning ? 'scanning' : ''}`}
            onMouseDown={startScanning}
            onMouseUp={cancelScanning}
            onMouseLeave={cancelScanning}
            onTouchStart={startScanning}
            onTouchEnd={cancelScanning}
          >
            <div className="scanner-ripple" />
            <div className="scanner-heart-icon">💖</div>
            <div className="scanner-beam" />
            <span className="scanner-label">
              {isScanning ? `SCANNING AURA... ${scanProgress}%` : 'HOLD FINGER HERE TO ENTER'}
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: '16px' }}>
            💡 Tap & hold for 2 seconds • Sound and music will begin automatically
          </p>
        </div>
      )}

      {/* ===================================================================
          STAGE 1: 3D MEMORY MATRIX
          =================================================================== */}
      {level === 1 && (
        <div className="modern-card">
          <div className="cyber-badge">GAME 1: NEURAL MEMORY MATRIX</div>
          <h2 className="section-title">Hema's Power Tokens</h2>
          <p className="section-subtitle">
            Match all 4 pairs of icons to unlock Level 2:
          </p>

          <div className="matrix-board">
            {tiles.map((t, idx) => {
              const isOpen = t.matched || activeTiles.includes(idx);
              return (
                <div
                  key={t.id}
                  className={`matrix-tile ${isOpen ? 'is-flipped' : ''} ${t.matched ? 'is-matched' : ''}`}
                  onClick={() => handleTileClick(idx)}
                >
                  <div className="tile-flipper">
                    <div className="tile-back">✦</div>
                    <div className="tile-front">{t.icon}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {isMemoryMatrixCleared ? (
            <div className="completion-toast">
              <p className="toast-headline">🎉 Perfect Match in {memoryMoves} moves! You're unmatched, Hema.</p>
              <button onClick={() => setLevel(2)} className="btn-glow-primary">
                Next: Starlight Catcher &rarr;
              </button>
            </div>
          ) : (
            <p className="matrix-counter">Moves: {memoryMoves} • Click anywhere for surprise hearts</p>
          )}
        </div>
      )}

      {/* ===================================================================
          STAGE 2: STARLIGHT REFLEX CATCHER
          =================================================================== */}
      {level === 2 && (
        <div className="modern-card">
          <div className="cyber-badge">GAME 2: REFLEX CHALLENGE</div>
          <h2 className="section-title">Starlight Catcher</h2>
          <p className="section-subtitle">Tap falling gems to boost Hema's aura multiplier!</p>

          <div className="arcade-hud">
            <div className="hud-metric">
              <span className="metric-label">TIME</span>
              <span className="metric-val">{timeLeft}s</span>
            </div>
            <div className="hud-metric">
              <span className="metric-label">SCORE</span>
              <span className="metric-val gold-accent">{gameScore}</span>
            </div>
            <div className="hud-metric">
              <span className="metric-label">COMBO</span>
              <span className="metric-val purple-accent">x{combo}</span>
            </div>
          </div>

          <div className="sky-canvas">
            {!isCatchGameActive && timeLeft === 15 && (
              <div className="game-overlay">
                <button onClick={startCatchGame} className="btn-glow-primary">
                  Start 15s Blitz! ⚡
                </button>
              </div>
            )}

            {!isCatchGameActive && timeLeft === 0 && (
              <div className="game-overlay">
                <h3 style={{ fontSize: '1.4rem', color: '#f59e0b', marginBottom: '8px' }}>
                  🏆 High Score: {gameScore} PTS!
                </h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={startCatchGame} className="btn-secondary">Retry 🔄</button>
                  <button onClick={() => setLevel(3)} className="btn-glow-primary">Next: Roulette &rarr;</button>
                </div>
              </div>
            )}

            {isCatchGameActive &&
              fallingStars.map((item) => (
                <div
                  key={item.id}
                  className="falling-star"
                  style={{ left: `${item.x}%`, animationDuration: `${item.speed}s` }}
                  onClick={() => catchStar(item.id)}
                >
                  {item.icon}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ===================================================================
          STAGE 3: NEON ROMANCE ROULETTE
          =================================================================== */}
      {level === 3 && (
        <div className="modern-card">
          <div className="cyber-badge">GAME 3: PRIVILEGE ROULETTE</div>
          <h2 className="section-title">Spin for Hema's VIP Perk</h2>
          <p className="section-subtitle">Spin to unlock a certified life privilege:</p>

          <div className="roulette-container">
            <div className="wheel-pointer">🔻</div>
            <div
              className="roulette-wheel"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning ? 'transform 3.2s cubic-bezier(0.12, 0.85, 0.25, 1)' : 'none',
              }}
            >
              <div className="wheel-hub">🎁</div>
            </div>
          </div>

          {wonPerk && (
            <div className="won-perk-box">
              <span className="perk-label">🏆 OFFICIAL PRIVILEGE UNLOCKED FOR HEMA:</span>
              <p className="perk-content">{wonPerk}</p>
            </div>
          )}

          <div className="roulette-btn-row">
            <button
              onClick={spinRoulette}
              className="btn-glow-primary"
              disabled={isSpinning}
            >
              {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL 🎡'}
            </button>
            {wonPerk && (
              <button onClick={() => setLevel(4)} className="btn-secondary" style={{ borderColor: '#10b981', color: '#10b981' }}>
                Next: Aura Quiz &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================
          STAGE 4: 10 AURA QUESTIONS
          =================================================================== */}
      {level === 4 && (
        <div className="modern-card question-card">
          <div className="card-top-hud">
            <div className="cyber-badge">HEMA'S AURA AUDIT • {currentQIndex + 1}/10</div>
            <div className="aura-live-counter">
              <span>⚡ AURA:</span> <strong>{totalAuraScore.toLocaleString()}</strong>
            </div>
          </div>

          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentQIndex + 1) / questionsList.length) * 100}%` }}
            />
          </div>

          <h2 className="quiz-question-title">{questionsList[currentQIndex].q}</h2>

          <div className="options-stack">
            {questionsList[currentQIndex].options.map((opt, idx) => {
              const isSelected = answeredMap[currentQIndex]?.index === idx;
              return (
                <button
                  key={idx}
                  className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswer(opt, idx)}
                >
                  <span className="option-indicator">{isSelected ? '✓' : idx + 1}</span>
                  <span className="option-text">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {answeredMap[currentQIndex] && (
            <div className="commentary-banner">
              <span className="commentary-tag">💡 AUDIT COMMENTARY:</span>
              <p className="commentary-body">{answeredMap[currentQIndex].option.commentary}</p>
              <div className="aura-bump-tag">+{answeredMap[currentQIndex].option.aura} AURA POINTS</div>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={nextQuestion}
              className="btn-glow-primary"
              disabled={!answeredMap[currentQIndex]}
            >
              {currentQIndex < questionsList.length - 1 ? 'Next Question &rarr;' : 'Go to Scratch Card 🎁'}
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
          STAGE 5: GOLDEN SCRATCH-OFF CARD (Secret Photo & Message)
          =================================================================== */}
      {level === 5 && (
        <div className="modern-card">
          <div className="cyber-badge gold-badge">GAME 4: MYSTERY SCRATCH CARD</div>
          <h2 className="section-title">Scratch To Reveal The Surprise</h2>
          <p className="section-subtitle">
            Scratch off the gold foil or click Reveal to unlock Hema's surprise:
          </p>

          <div className="scratch-stage-wrapper">
            <div className="scratch-underlayer">
              <img
                src={hemaImg}
                alt="Secret Reveal for Hema"
                className="scratch-revealed-img"
              />
              <div className="scratch-note-bubble">
                <h4>Dear Hema 💖</h4>
                <p>"You are my favorite view in every universe. Thank you for being you!"</p>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className={`scratch-canvas ${isScratchedOff ? 'scratched-off' : ''}`}
              onClick={fullScratch}
              onMouseMove={(e) => e.buttons === 1 && handleScratchMove(e)}
              onTouchMove={handleScratchMove}
            />
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isScratchedOff ? (
              <>
                <button onClick={fullScratch} className="btn-glow-gold" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
                  ✨ Full Scratch / Reveal All
                </button>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  (Or scratch lightly to auto-clear)
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.98rem' }}>
                  🎉 Card 100% Fully Scratched! Beautiful Surprise Revealed!
                </span>
              </div>
            )}
          </div>

          {/* AFTER SCRATCH: SHOW THE QUOTES DIRECTLY! */}
          {isScratchedOff && (
            <div className="scratch-quotes-reveal-section" style={{ marginTop: '26px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '22px' }}>
              <div className="card-top-hud">
                <div className="cyber-badge">✦ THE INFINITE IMPRESS ENGINE ✦</div>
                <span className="live-pool-tag">20,736+ Combinations for Hema</span>
              </div>

              <h3 className="section-title" style={{ fontSize: '1.45rem', marginTop: '12px', color: '#fbcfe8' }}>
                Compliments Written in Stars for Hema
              </h3>
              <p className="section-subtitle">
                A library of timeless quotes and compliments curated for Queen Hema:
              </p>

              <div className="quote-spotlight-box">
                <div className="quote-mark">“</div>
                <p className="active-quote-text">{generatedQuote}</p>
                <div className="quote-controls-bar">
                  <button onClick={() => copyToClipboard(generatedQuote)} className="pill-action-btn">
                    {copiedToast ? '✓ Copied!' : '📋 Copy Quote'}
                  </button>
                  <button
                    onClick={() => toggleFavorite(generatedQuote)}
                    className={`pill-action-btn ${savedFavorites.includes(generatedQuote) ? 'fav-active' : ''}`}
                  >
                    {savedFavorites.includes(generatedQuote) ? '❤️ Saved' : '🤍 Save'}
                  </button>
                  <button onClick={generateNewImpressiveLine} className="pill-action-btn next-btn">
                    🎲 Next Quote
                  </button>
                </div>
              </div>

              {savedFavorites.length > 0 && (
                <div style={{ margin: '14px 0', padding: '10px 14px', background: 'rgba(236,72,153,0.1)', borderRadius: '14px', border: '1px solid rgba(236,72,153,0.25)', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f472b6', display: 'block', marginBottom: '6px' }}>
                    ❤️ HEMA'S SAVED FAVORITE QUOTES ({savedFavorites.length}):
                  </span>
                  {savedFavorites.map((fav, i) => (
                    <p key={i} style={{ fontSize: '0.8rem', color: '#f1f5f9', margin: '4px 0', fontStyle: 'italic' }}>
                      • {fav}
                    </p>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '22px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setLevel(6)} className="btn-secondary">
                  Open Extended Quote Matrix &rarr;
                </button>
                <button onClick={() => setLevel(7)} className="btn-glow-primary">
                  Enter VIP Photo Booth & Finale 📸 &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================
          STAGE 6: 1500+ IMPRESSIVE LINES GENERATOR
          =================================================================== */}
      {level === 6 && (
        <div className="modern-card quote-matrix-card">
          <div className="card-top-hud">
            <div className="cyber-badge">✦ THE INFINITE IMPRESS ENGINE ✦</div>
            <span className="live-pool-tag">20,736+ Combinations for Hema</span>
          </div>

          <h2 className="section-title">Compliments Written in Code</h2>
          <p className="section-subtitle">A library of compliments tailored for Hema:</p>

          <div className="quote-spotlight-box">
            <div className="quote-mark">“</div>
            <p className="active-quote-text">{generatedQuote}</p>
            <div className="quote-controls-bar">
              <button onClick={() => copyToClipboard(generatedQuote)} className="pill-action-btn">
                {copiedToast ? '✓ Copied!' : '📋 Copy Quote'}
              </button>
              <button
                onClick={() => toggleFavorite(generatedQuote)}
                className={`pill-action-btn ${savedFavorites.includes(generatedQuote) ? 'fav-active' : ''}`}
              >
                {savedFavorites.includes(generatedQuote) ? '❤️ Saved' : '🤍 Save'}
              </button>
              <button onClick={generateNewImpressiveLine} className="pill-action-btn next-btn">
                🎲 Next Quote
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button onClick={() => setLevel(7)} className="btn-glow-primary">
              Enter The VIP Photo Booth & Finale &rarr; 📸
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
          STAGE 7: LIVE PHOTO BOOTH & SOUVENIR GOLD PASS
          =================================================================== */}
      {level === 7 && (
        <div className="modern-card grand-finale-card">
          <div className="cyber-badge gold-badge">✦ THE GRAND FINALE ✦</div>
          <h2 className="hero-gradient" style={{ fontSize: '2.1rem' }}>
            Hema's VIP Photo Booth 📸
          </h2>
          <p className="section-subtitle">
            Take a live photo right now to create your personalized VIP keepsake pass!
          </p>

          {!capturedSelfie ? (
            <div className="photo-booth-viewport">
              <video ref={videoRef} autoPlay playsInline muted className="booth-video" />
              <canvas ref={photoCanvasRef} style={{ display: 'none' }} />

              {countdown && <div className="booth-countdown-digit">{countdown}</div>}

              {!isCameraActive ? (
                <div className="booth-prompt-center">
                  <span style={{ fontSize: '3rem', marginBottom: '8px' }}>📷</span>
                  <button onClick={startCamera} className="btn-glow-primary">
                    Turn On Camera 📸
                  </button>
                  <button
                    onClick={() => {
                      setCapturedSelfie(hemaImg);
                      playSoundFX('victory');
                      confetti({
                        particleCount: 100,
                        spread: 140,
                        origin: { y: 0.5 },
                        colors: ['#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'],
                      });
                    }}
                    className="btn-secondary"
                    style={{ marginTop: '4px', borderColor: '#f59e0b', color: '#fbbf24' }}
                  >
                    👑 Generate Pass with Hema's Photo
                  </button>
                  <label className="booth-upload-fallback">
                    Or select another picture from your phone
                    <input type="file" accept="image/*" onChange={handleSelfieUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              ) : (
                <div className="booth-controls-dock">
                  <button onClick={triggerPhotoCountdown} className="btn-snap-photo">
                    ⚡ SNAP PHOTO (3s) 📸
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="luxury-black-card" id="hema-pass-card">
              <div className="card-foil-strip">
                <span className="strip-text">AUTHENTICATED VIP PASS</span>
                <span className="strip-serial">#HEMA-NO-1-SUPERSTAR</span>
              </div>

              <div className="card-interior">
                <div className="card-top-profile-row">
                  <div className="souvenir-photo-wrapper">
                    <img src={capturedSelfie} alt="Hema's Live Souvenir" className="souvenir-photo-img" />
                    <span className="photo-verified-stamp">VERIFIED ❤️</span>
                  </div>

                  <div className="souvenir-meta-col">
                    <span className="card-sub-tag">PERMANENT TITLE</span>
                    <h3 className="card-member-title">Queen Hema</h3>
                    <p style={{ fontSize: '0.8rem', color: '#fbcfe8', fontWeight: '700' }}>{userCosmicTitle}</p>
                    <button
                      onClick={() => {
                        setCapturedSelfie(null);
                        startCamera();
                      }}
                      className="btn-retake-tiny"
                    >
                      🔄 Retake Photo
                    </button>
                  </div>
                </div>

                <div className="card-grid-metrics">
                  <div className="metric-box">
                    <label>VERIFIED AURA</label>
                    <p>{totalAuraScore.toLocaleString()} PTS</p>
                  </div>
                  <div className="metric-box">
                    <label>GLOBAL RANKING</label>
                    <p className="gold-text">Top 0.0001%</p>
                  </div>
                  <div className="metric-box">
                    <label>AWARDED PERK</label>
                    <p className="rose-text">{wonPerk || 'Unlimited Free Kisses 💋'}</p>
                  </div>
                  <div className="metric-box">
                    <label>DATE ISSUED</label>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="card-hologram-divider" />

                <div className="card-security-bar">
                  <div className="barcode-font">||||| HEMA |||| 2026 |||||| |</div>
                  <div className="holographic-seal">
                    <span>💎 QUEEN HEMA 💎</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="finale-button-cluster" style={{ marginTop: '16px' }}>
            <button
              onClick={() => {
                playSoundFX('victory');
                confetti({
                  particleCount: 120,
                  spread: 160,
                  origin: { y: 0.5 },
                  colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'],
                });
              }}
              className="btn-glow-primary"
            >
              Fire Confetti Cannon 🎉
            </button>
            <button onClick={() => window.print()} className="btn-secondary">
              Save / Print Pass 🖨️
            </button>
          </div>

          <p style={{ marginTop: '18px', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
            "Out of 8 billion people in the world, there will only ever be one Hema. You are loved beyond words!"
          </p>
        </div>
      )}

      {/* Polaroid Modal */}
      {activePhotoModal && (
        <div className="polaroid-modal-backdrop" onClick={() => setActivePhotoModal(null)}>
          <div className="polaroid-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="polaroid-close-btn" onClick={() => setActivePhotoModal(null)}>✕</button>
            <div className="polaroid-tape">✦ MEMORY UNLOCKED ✦</div>
            <div className="polaroid-photo-frame">
              <img src={activePhotoModal.url} alt={activePhotoModal.title} className="polaroid-img" />
            </div>
            <div className="polaroid-details">
              <h3 className="polaroid-title">{activePhotoModal.title}</h3>
              <p className="polaroid-tagline">{activePhotoModal.tagline}</p>
              <p className="polaroid-quote">"{activePhotoModal.quote}"</p>
              <div className="polaroid-signature">With Love For Hema 💖</div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Drawer */}
      {isGalleryDrawerOpen && (
        <div className="polaroid-modal-backdrop" onClick={() => setIsGalleryDrawerOpen(false)}>
          <div className="gallery-drawer-card" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="cyber-badge gold-badge">✦ HEMA'S PRIVATE GALLERY ✦</span>
                <h2 className="section-title" style={{ fontSize: '1.4rem' }}>Surprise Memory Capsules</h2>
              </div>
              <button className="polaroid-close-btn" onClick={() => setIsGalleryDrawerOpen(false)}>✕</button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '14px' }}>
              Special memory capsules for Hema. You can also upload more custom photos below!
            </p>

            <div style={{ marginBottom: '16px' }}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleCustomPhotoUpload}
              />
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              >
                📸 Add More Photos of Hema
              </button>
            </div>

            <div className="gallery-grid">
              {hemaPhotos.map((photo) => {
                const isUnlocked = revealedPhotoIds.includes(photo.id);
                return (
                  <div
                    key={photo.id}
                    className={`gallery-item-tile ${isUnlocked ? 'unlocked' : 'locked'}`}
                    onClick={() => {
                      if (isUnlocked) {
                        playSoundFX('click');
                        setActivePhotoModal(photo);
                      }
                    }}
                  >
                    {isUnlocked ? (
                      <>
                        <img src={photo.url} alt={photo.title} className="gallery-thumbnail" />
                        <span className="gallery-item-badge">{photo.title}</span>
                      </>
                    ) : (
                      <div className="locked-placeholder">
                        <span style={{ fontSize: '1.8rem' }}>🔒</span>
                        <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Click screen to reveal</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}