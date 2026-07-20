import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, ChevronDown, Volume2, VolumeX, X, Hotel, MailOpen, Heart, Stars } from "lucide-react";
import { useInView } from 'react-intersection-observer';

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Shaleeka & Sachini
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const backgroundMusic = "/Until_I_Found_You-646184-mobiles24.mp3";
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbzeguee7EGTyHfIwmmVJfjHulTx03lc3wLeqJtq0Rw3OGiQ9HUPBzJ76i0yM91bX3mQ/exec";

/** iOS / Android block unmuted autoplay; iPadOS may report as MacIntel. */
function isLikelyMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  return false;
}

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#ff0080", "#ff8c00", "#ffd700", "#00ffff", "#8a2be2", "#ffffff"];
    const petalCount = isMobile ? 15 : 25;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 6,
      rotation: Math.random() * 360,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 30 - 15,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""
        }`}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(227,207,172,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const targetDate = useMemo(() => new Date("September 21, 2026 10:00:00").getTime(), []);

  const getTimeLeft = (): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
  })), []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-gradient-to-br from-[#5F3924] via-[#B7410E] to-[#5F3924] flex flex-col items-center overflow-hidden z-20"
    >
      {/* Texture & Glow Layer */}
      <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-[#d4af37]/20"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360, 0],
              opacity: [0, 0.45, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-6xl px-6 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/45 bg-black/30 px-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f7e7ce] sm:text-sm">
              The Big Day Approaches
            </span>
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
          </motion.div>

          <h2 className="font-alex text-6xl md:text-[8rem] leading-tight text-white drop-shadow-xl">
            Counting Down to <span className="relative inline-block text-shimmer">
              Forever
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-[#f7e7ce]/80 font-montserrat tracking-[0.3em] text-[10px] md:text-xs uppercase font-bold">
            Every second brings us closer to our blessed wedding day. We cannot wait to celebrate this grace-filled moment with you.
          </p>
        </motion.div>

        <div className="w-full rounded-[2.5rem] border border-[#d4af37]/30 bg-black/20 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-6 md:p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.1,
                  type: "spring",
                  bounce: 0.35
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-[#d4af37]/40 group-hover:bg-white/10 md:p-8">
                  <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#d4af37]/20" />
                  <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-[#d4af37]/10" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-[64px] w-full items-center justify-center overflow-hidden sm:h-[78px] md:h-[96px]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: 40, opacity: 0, scale: 0.65 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -40, opacity: 0, scale: 0.65 }}
                          transition={{
                            type: "spring",
                            stiffness: 370,
                            damping: 24,
                            mass: 1
                          }}
                          className="absolute font-serif text-5xl font-semibold text-[#f7e7ce] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 rounded-full border border-[#d4af37]/40 bg-black/40 px-3 py-1.5 shadow-sm md:mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37] md:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-[#d4af37]">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-[#f7e7ce]/80 sm:text-2xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Preload critical assets */
const criticalAssets = ["/monogram_aa.png"];
function preloadAssets() {
  criticalAssets.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const honeymoonRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 38,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 36,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 33,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
  ];

  const doubleRates = [
    {
      plan: "Full Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 35,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 33,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 30,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Half Board",
      rooms: [
        { name: "Superior Room", rate: "LKR 32,500.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 30,500.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 27,500.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Bed & Breakfast",
      rooms: [
        { name: "Superior Room", rate: "LKR 29,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 27,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 24,000.00", view: "Jungle View" },
      ],
    },
    {
      plan: "Room Only",
      rooms: [
        { name: "Superior Room", rate: "LKR 26,000.00", view: "Mountain View" },
        { name: "Super Deluxe Room", rate: "LKR 24,000.00", view: "Mountain View" },
        { name: "Deluxe Room", rate: "LKR 21,000.00", view: "Jungle View" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#fcfcf0]">
          <div>
            <h2 className="font-cinzel text-xl md:text-2xl text-[#B7410E] font-bold">Accommodation Rates</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#B7410E] mt-1">Saminro Grand Palace, Makola</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#fcfcf0]/30">
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#B7410E]/30" />
                <h3 className="font-playball text-3xl text-[#B7410E]">Honeymoon Room Rates</h3>
                <div className="h-px flex-1 bg-[#B7410E]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {honeymoonRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#D8BCA3]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#B7410E] mb-4 border-b border-[#D8BCA3]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#B7410E] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#B7410E]/30" />
                <h3 className="font-playball text-3xl text-[#B7410E]">Double Room Rates</h3>
                <div className="h-px flex-1 bg-[#B7410E]/30" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {doubleRates.map((plan) => (
                  <div key={plan.plan} className="bg-white p-6 rounded-xl border border-[#D8BCA3]/30 shadow-sm">
                    <h4 className="font-cinzel text-sm font-bold text-[#B7410E] mb-4 border-b border-[#D8BCA3]/20 pb-2">{plan.plan}</h4>
                    <div className="space-y-3">
                      {plan.rooms.map((room) => (
                        <div key={room.name} className="flex justify-between items-center gap-4">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{room.name}</p>
                            <p className="text-[10px] text-slate-400">{room.view}</p>
                          </div>
                          <p className="text-xs font-bold text-[#B7410E] whitespace-nowrap">{room.rate}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check In</p>
                <p className="font-cinzel text-xl text-[#B7410E]">2:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Check Out</p>
                <p className="font-cinzel text-xl text-[#B7410E]">12:00 PM</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Availability</p>
                <p className="font-cinzel text-sm text-[#B7410E] leading-tight">Max 16 Rooms Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-50 flex justify-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] italic font-medium">Please contact the resort or couple for bookings</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WeddingInvitation() {
  const [introState, setIntroState] = useState<'button' | 'video' | 'opened'>('button');
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
  });

  // --- Personalization Logic ---
  const [guestName, setGuestName] = useState<string | null>(null);
  const [guestPrefix, setGuestPrefix] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    const name = params.get("name");
    const prefix = params.get("prefix");
    
    if (name) {
      setGuestName(name);
    } else if (to) {
      setGuestName(to.replace(/_/g, " "));
    }
    
    if (prefix) {
      setGuestPrefix(prefix);
    }
  }, []);
  // -----------------------------

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [musicAudible, setMusicAudible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUnlockedRef = useRef(false);
  const hasStartedMusicRef = useRef(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = false;
      audio.volume = 0;
      await audio.play();
      
      const fadeInterval = setInterval(() => {
        if (audio.volume < 0.95) {
          audio.volume += 0.05;
        } else {
          audio.volume = 1;
          clearInterval(fadeInterval);
        }
      }, 200);

      hasStartedMusicRef.current = true;
      audioUnlockedRef.current = true;
      setMusicAudible(true);
      return true;
    } catch (err) {
      console.error("Audio play failed:", err);
      return false;
    }
  }, []);

  const playMutedMusicFallback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.muted = true;
      audio.volume = 1;
      await audio.play();
      setMusicAudible(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const unlockAudioFromGesture = useCallback(async () => {
    if (audioUnlockedRef.current) return;

    const ok = await playMusic();

    if (!ok) {
      await playMutedMusicFallback();
    }
  }, [playMusic, playMutedMusicFallback]);

  const handleSoundToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void unlockAudioFromGesture();

    const wantOn = audio.muted || audio.paused;
    if (wantOn) {
      audio.muted = false;
      void audio.play().then(
        () => setMusicAudible(true),
        () => { },
      );
    } else {
      audio.muted = true;
      setMusicAudible(false);
    }
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    const handler = () => {
      void unlockAudioFromGesture();
    };

    document.addEventListener("pointerdown", handler, { capture: true, passive: true });
    document.addEventListener("touchstart", handler, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    if (introState === 'opened') {
      preloadAssets();
    }
  }, [introState]);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Missing VITE_GOOGLE_SCRIPT_URL");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // With no-cors, we can't check response.ok, so we assume success if no promise rejection
    } catch (err) {
      console.error("Submission error:", err);
      throw err;
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        day: "1",
        name: rsvpForm.name.trim(),
        attending: rsvpForm.attending,
        guests: rsvpForm.attending === "yes" ? rsvpForm.guests : "0",
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", attending: "yes", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        day: "1",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  useEffect(() => {
    if (introState === 'opened') {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [introState]);

  return (
    <main
      className={`min-h-screen w-full bg-[#fdfaf5] transition-all duration-1000 ${introState === 'opened'
        ? "relative"
        : "h-[100dvh] overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {introState === 'button' && (
          <motion.div
            key="button-intro"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#fdfaf5] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="font-alex text-4xl md:text-6xl text-[#5F3924] mb-6">Shaleeka & Sachini</h2>
              <button
                onClick={() => setIntroState('video')}
                className="px-8 py-3 bg-[#B7410E] text-white rounded-full font-montserrat text-xs uppercase tracking-[0.2em] hover:bg-[#774C32] transition-colors shadow-lg cursor-pointer"
              >
                View Invitation
              </button>
            </motion.div>
          </motion.div>
        )}

        {introState === 'video' && (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            onClick={() => {
              setIntroState('opened');
              void unlockAudioFromGesture();
            }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => {
                setIntroState('opened');
                void unlockAudioFromGesture();
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src="/Wedding_entrance_floral_arch_202605161834.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 z-10 bg-black/30" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
              <motion.img
                src="/1__2_-removebg-preview.png"
                alt="Welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="w-full max-w-[75vw] md:max-w-[500px] object-contain drop-shadow-xl -translate-y-12 md:translate-y-0"
              />
            </div>
          </motion.div>
        )}

        {introState === 'opened' && (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
            onPointerDownCapture={() => {
              void unlockAudioFromGesture();
            }}
            onTouchStartCapture={() => {
              void unlockAudioFromGesture();
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIntroState('button')}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            <section 
              className="relative z-10 flex min-h-[95dvh] w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-8 md:min-h-[100dvh]"
              style={{
                backgroundImage: 'url("/ChatGPT Image Jul 19, 2026, 11_47_31 PM.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Decorative background elements (removed as requested) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-2xl px-5 py-4 sm:px-12 sm:py-12 md:px-20 md:py-20 flex flex-col items-center"
              >
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center font-cinzel text-[9px] md:text-xs font-semibold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#8C6246] mb-2 -mt-4 md:-mt-8 drop-shadow-sm"
                >
                  The Wedding Celebration
                </motion.p>
                
                {/* Small Divider */}
                <div className="flex items-center justify-center mb-4 md:mb-8 gap-2">
                   <div className="w-1 h-1 rotate-45 bg-[#d4af37]"></div>
                   <div className="w-6 md:w-8 h-[0.5px] bg-[#d4af37]"></div>
                   <div className="w-1 md:w-1.5 h-1 md:h-1.5 rotate-45 bg-[#d4af37]"></div>
                   <div className="w-6 md:w-8 h-[0.5px] bg-[#d4af37]"></div>
                   <div className="w-1 h-1 rotate-45 bg-[#d4af37]"></div>
                </div>

                <h1 className="text-center font-alex text-[3.8rem] leading-[0.9] text-[#A64B29] sm:text-[6rem] md:text-[7.5rem] lg:text-[8rem]">
                  <span className="block text-[#A64B29]">Shaleeka</span>
                  <div className="my-2 md:my-4 flex items-center justify-center gap-3 md:gap-4">
                    <div className="flex items-center gap-1">
                       <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]"></div>
                       <div className="w-8 md:w-12 h-[1px] bg-[#d4af37]"></div>
                    </div>
                    <span className="font-serif text-3xl italic text-[#d4af37] sm:text-5xl md:text-6xl px-1">&amp;</span>
                    <div className="flex items-center gap-1">
                       <div className="w-8 md:w-12 h-[1px] bg-[#d4af37]"></div>
                       <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]"></div>
                    </div>
                  </div>
                  <span className="block text-[#A64B29]">Sachini</span>
                </h1>

                {/* Date Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="mt-8 md:mt-16 w-full flex items-center justify-center gap-4 md:gap-8 max-w-lg"
                >
                  <div className="flex flex-col flex-1 items-center justify-center border-y-[0.5px] border-[#d4af37] py-2">
                    <span className="font-cinzel text-[#8C6246] tracking-[0.2em] md:tracking-[0.3em] uppercase text-sm md:text-lg font-bold">September</span>
                  </div>
                  <div className="h-16 md:h-20 w-[0.5px] bg-[#d4af37]"></div>
                  <span className="font-serif text-[4rem] md:text-[5.5rem] leading-none text-[#5F3924]">21</span>
                  <div className="h-16 md:h-20 w-[0.5px] bg-[#d4af37]"></div>
                  <div className="flex flex-col flex-1 items-center justify-center border-y-[0.5px] border-[#d4af37] py-2">
                    <span className="font-cinzel text-[#8C6246] tracking-[0.2em] md:tracking-[0.3em] uppercase text-sm md:text-lg font-bold">2026</span>
                  </div>
                </motion.div>

                <div className="mx-auto mt-10 md:mt-16 w-full max-w-sm flex flex-col space-y-6 md:space-y-8">
                  {/* Ceremony */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 shadow-sm p-1.5 overflow-hidden">
                      <div className="w-full h-full rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white p-2">
                        <img src="/poruwa_icon.png" alt="Poruwa" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-bold mb-1">Ceremony</span>
                      <span className="font-cinzel text-xl md:text-2xl text-[#5F3924] uppercase">Poruwa</span>
                      <span className="font-cinzel text-sm md:text-base text-[#8C6246] uppercase mt-0.5 font-medium">10.05 AM</span>
                    </div>
                  </motion.div>
                  
                  <div className="flex items-center justify-center gap-2">
                     <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                     <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60"></div>
                     <div className="w-1 h-1 rotate-45 bg-[#d4af37]/60"></div>
                     <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60"></div>
                     <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                  </div>

                  {/* Venue */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 shadow-sm p-1.5 overflow-hidden">
                      <div className="w-full h-full rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white p-2">
                        <img src="/venue_icon.png" alt="Venue" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-bold mb-1">Venue</span>
                      <span className="font-cinzel text-lg md:text-xl text-[#5F3924] uppercase">Hotel Green Court</span>
                      <span className="font-cinzel text-xs md:text-sm text-[#8C6246] uppercase mt-0.5 font-medium tracking-wide">(Grand Ballroom)</span>
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-center gap-2">
                     <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                     <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60"></div>
                     <div className="w-1 h-1 rotate-45 bg-[#d4af37]/60"></div>
                     <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60"></div>
                     <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                  </div>

                  {/* Reception */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="flex items-center gap-6"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0 shadow-sm p-1.5 overflow-hidden">
                      <div className="w-full h-full rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white p-2">
                        <img src="/reception_icon.png" alt="Reception" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-bold mb-1">Reception</span>
                      <span className="font-cinzel text-base md:text-lg text-[#5F3924] uppercase">10.40 AM - 4.00 PM</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-6 z-30 md:bottom-10"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#A67B5B]">Scroll</span>
                  <ChevronDown className="h-5 w-5 text-[#B7410E]" />
                </motion.div>
              </motion.div>
            </section>

            <section className="relative py-24 md:py-36 w-full flex flex-col items-center overflow-hidden z-10 border-b-[0.5px] border-[#d4af37]/30 bg-[#fdfaf5]">
              <div className="absolute inset-0 opacity-[0.5] bg-[url('https://www.transparenttextures.com/patterns/white-marble.png')] pointer-events-none" />

              {/* Cute heart accents for 'Cute' feel */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 text-pink-300 opacity-40"
              >
                <Heart size={30} fill="currentColor" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 text-pink-300 opacity-40"
              >
                <Heart size={20} fill="currentColor" />
              </motion.div>

              <div className="absolute top-12 left-12 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute top-12 right-12 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#d4af37] opacity-60 hidden md:block"></div>

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-4 w-full"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#d4af37] rotate-90 opacity-80">
                       <path d="M12 2C12 2 16 6 16 10C16 14 12 18 12 18C12 18 8 14 8 10C8 6 12 2 12 2Z"/>
                       <path d="M12 18L12 22"/>
                       <path d="M12 14C12 14 16 16 18 14C20 12 20 8 20 8C20 8 16 8 14 10C12 12 12 14 12 14Z"/>
                       <path d="M12 14C12 14 8 16 6 14C4 12 4 8 4 8C4 8 8 8 10 10C12 12 12 14 12 14Z"/>
                    </svg>
                    <p className="tracking-[0.3em] md:tracking-[0.4em] text-[#8C6246] text-[10px] md:text-[12px] uppercase font-montserrat font-bold drop-shadow-sm text-center">
                      {guestName ? "WE CORDIALLY INVITE" : "TOGETHER WE REQUEST THE HONOUR OF YOUR PRESENCE"}
                    </p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#d4af37] -rotate-90 opacity-80">
                       <path d="M12 2C12 2 16 6 16 10C16 14 12 18 12 18C12 18 8 14 8 10C8 6 12 2 12 2Z"/>
                       <path d="M12 18L12 22"/>
                       <path d="M12 14C12 14 16 16 18 14C20 12 20 8 20 8C20 8 16 8 14 10C12 12 12 14 12 14Z"/>
                       <path d="M12 14C12 14 8 16 6 14C4 12 4 8 4 8C4 8 8 8 10 10C12 12 12 14 12 14Z"/>
                    </svg>
                  </div>
                  
                  {guestName && (
                    <div className="pt-1 pb-2 w-full flex justify-center">
                      <span className="text-[#5F3924] font-alex text-[3.5rem] md:text-[5.5rem] block drop-shadow-sm leading-none text-center px-4">
                        {guestPrefix ? `${guestPrefix} ` : ''}{guestName}
                      </span>
                    </div>
                  )}

                  <p className="text-[#8C6246] font-cinzel text-[11px] md:text-[15px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-center px-4 mt-2 font-semibold drop-shadow-sm">
                    TO CELEBRATE THE WEDDING<br className="md:hidden" /> OF THEIR CHILDREN
                  </p>

                  {!guestName && (
                    <div className="pt-4 pb-2 w-full flex justify-center">
                      <span className="text-[#5F3924] font-alex text-[3.5rem] md:text-[5.5rem] block my-2 drop-shadow-sm leading-none text-center">
                        Invite You
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 w-full max-w-[280px] md:max-w-[400px] mt-6 mb-4">
                    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#d4af37]">
                       <path d="M12 2C12 2 16 6 16 10C16 14 12 18 12 18C12 18 8 14 8 10C8 6 12 2 12 2Z"/>
                    </svg>
                    <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col items-center justify-center mb-8">
                  {/* Minimalist Names side */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex flex-col items-center text-center space-y-2 md:space-y-4 z-20 w-full"
                  >
                    <div className="w-full flex flex-col items-center justify-center mb-4 md:mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#d4af37] rotate-90 opacity-80">
                           <path d="M12 2C12 2 16 6 16 10C16 14 12 18 12 18C12 18 8 14 8 10C8 6 12 2 12 2Z"/>
                           <path d="M12 18L12 22"/>
                           <path d="M12 14C12 14 16 16 18 14C20 12 20 8 20 8C20 8 16 8 14 10C12 12 12 14 12 14Z"/>
                           <path d="M12 14C12 14 8 16 6 14C4 12 4 8 4 8C4 8 8 8 10 10C12 12 12 14 12 14Z"/>
                        </svg>
                        <p className="font-cinzel text-[11px] md:text-[13px] tracking-[0.2em] md:tracking-[0.25em] text-[#5F3924] uppercase font-bold text-center drop-shadow-sm">
                          Together with their parents
                        </p>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#d4af37] -rotate-90 opacity-80">
                           <path d="M12 2C12 2 16 6 16 10C16 14 12 18 12 18C12 18 8 14 8 10C8 6 12 2 12 2Z"/>
                           <path d="M12 18L12 22"/>
                           <path d="M12 14C12 14 16 16 18 14C20 12 20 8 20 8C20 8 16 8 14 10C12 12 12 14 12 14Z"/>
                           <path d="M12 14C12 14 8 16 6 14C4 12 4 8 4 8C4 8 8 8 10 10C12 12 12 14 12 14Z"/>
                        </svg>
                      </div>

                      <div className="space-y-2 md:space-y-4 mt-2">
                        <p className="font-cinzel text-[12px] md:text-[15px] tracking-[0.2em] md:tracking-[0.3em] text-[#8C6246] uppercase font-semibold text-center drop-shadow-sm">
                          Mr. and Mrs. Kudabalage
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-8 md:w-12 h-[0.5px] bg-[#d4af37]/60"></div>
                          <p className="font-serif text-[14px] md:text-[18px] text-[#5F3924] italic">&amp;</p>
                          <div className="w-8 md:w-12 h-[0.5px] bg-[#d4af37]/60"></div>
                        </div>
                        <p className="font-cinzel text-[12px] md:text-[15px] tracking-[0.2em] md:tracking-[0.3em] text-[#8C6246] uppercase font-semibold text-center drop-shadow-sm">
                          Mr. and Mrs. Handapangoda
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex justify-center overflow-hidden pt-4 md:pt-8">
                      <h3 className="text-[4rem] sm:text-7xl md:text-[9rem] lg:text-[10rem] font-alex text-[#B7410E] leading-none drop-shadow-sm px-2 pb-2">
                        Shaleeka
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 w-full justify-center px-4 my-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rotate-45 border border-[#d4af37]/60 bg-transparent translate-x-1 z-10"></div>
                        <div className="h-[0.5px] w-12 md:w-20 bg-[#d4af37]/60"></div>
                      </div>
                      <span className="font-serif text-4xl md:text-6xl text-[#d4af37] italic font-light px-2">&amp;</span>
                      <div className="flex items-center">
                        <div className="h-[0.5px] w-12 md:w-20 bg-[#d4af37]/60"></div>
                        <div className="w-2 h-2 rotate-45 border border-[#d4af37]/60 bg-transparent -translate-x-1 z-10"></div>
                      </div>
                    </div>

                    <div className="w-full flex justify-center overflow-hidden">
                      <h3 className="text-[4rem] sm:text-7xl md:text-[9rem] lg:text-[10rem] font-alex text-[#B7410E] leading-none drop-shadow-sm px-2 pt-2">
                        Sachini
                      </h3>
                    </div>
                    
                    {/* Bottom Ornament */}
                    <div className="flex items-center justify-center gap-3 mt-10 md:mt-12 opacity-80 text-[#d4af37]">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60"></div>
                        <div className="w-16 h-[0.5px] bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/80"></div>
                      </div>
                      <Heart size={16} strokeWidth={1.5} className="text-[#d4af37]" />
                      <div className="flex items-center">
                        <div className="w-16 h-[0.5px] bg-gradient-to-l from-[#d4af37]/20 to-[#d4af37]/80"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>



            <CountdownTimer />

            <section className="relative py-24 md:py-36 bg-white overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-[1px] bg-[#B7410E]" />
                        <span className="text-[#C9A227]">✦</span>
                        <span className="text-[#B7410E] font-bold uppercase tracking-[0.4em] text-[10px]">
                          T H E | V E N U E
                        </span>
                      </div>
                      <h3 className="font-cinzel text-[2.5rem] md:text-[4rem] text-[#B7410E] leading-tight tracking-widest font-bold uppercase">
                        Hotel Green court <br className="md:hidden" /><span className="text-[1.2rem] md:text-[2rem]">(Grand Ballroom)</span>
                      </h3>
                    </div>

                    <div className="space-y-8 pl-6 border-l border-[#D8BCA3]/40">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#B7410E] mt-1 shrink-0" />
                        <p className="text-lg md:text-xl text-[#B7410E] font-cinzel leading-relaxed tracking-wide uppercase">
                          Hotel Green court <span className="text-sm md:text-base">(Grand Ballroom)</span>, Homagama.
                        </p>
                      </div>
                      <p className="text-[#B7410E]/70 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        (Poruwa Ceremony at 10.05 AM) MONDAY, 21 SEPTEMBER 2026. Reception from 10.40 AM to 4.00 PM.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() =>
                          window.open("https://www.google.com/maps/search/?api=1&query=Hotel+Green+court+Homagama", "_blank")
                        }
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#B7410E] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-[#774C32]"
                      >
                        <MapPin className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Get Directions
                      </button>

                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10"></div>
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe 
                        src="https://maps.google.com/maps?q=Hotel%20Green%20court,%20Homagama&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="100%" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000" 
                        style={{ border: 0 }}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse"></span>View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 bg-[#f8f6f2] flex flex-col items-center overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  FOR OUR BIG DAY
                </motion.h2>

                <div className="relative w-full max-w-[550px] aspect-[4/5] flex items-center justify-center pt-12 md:pt-24 mt-12 md:mt-0">
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/images/11.png"
                      alt="Envelope"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.7 }}
                    whileInView={{ opacity: 1, y: 0, scale: 0.85 }}
                    transition={{ delay: 0.6, duration: 2.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute -top-32 md:-top-56 left-1/2 -translate-x-1/2 w-[100%] md:w-[120%] h-64 md:h-[320px] pointer-events-none z-0"
                  >
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-sm opacity-90"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-x-[-1] -rotate-12 translate-x-12 opacity-80"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom rotate-[15deg] -translate-x-12 opacity-70"
                    />
                    <img
                      src="/images/12.png"
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain object-bottom scale-75 translate-y-12 opacity-60"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-10 w-[94%] md:w-[88%] bg-[#fdfaf5]/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[0.5px] border-[#d4af37]/40 flex flex-col items-center pt-4 pb-12 px-6 md:px-10"
                  >
                    {/* Premium inner frame */}
                    <div className="absolute inset-3 md:inset-4 border-[0.5px] border-[#d4af37]/20 pointer-events-none" />

                    <div className="w-full flex flex-col items-center mt-6 relative z-10 px-2 md:px-6">
                      <p className="font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] text-slate-500 uppercase font-medium mb-2 text-center leading-relaxed">
                        RSVP - Dammika 077 909 0515 | Sachini 076 850 4398
                      </p>

                      <div className="flex items-center justify-center gap-4 w-full mb-8">
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                        <h3 className="font-alex text-5xl md:text-7xl text-gold-gradient whitespace-nowrap leading-[0.8] drop-shadow-sm px-2">
                          R.S.V.P
                        </h3>
                        <div className="h-[0.5px] w-full bg-[#d4af37]/40" />
                      </div>

                      <form className="w-full space-y-8 text-left max-w-sm mt-4" onSubmit={handleRsvpSubmit}>
                        <div className="relative group">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">Name(s)</label>
                          <input
                            type="text"
                            placeholder="M.................................................."
                            value={rsvpForm.name}
                            onChange={(e) => {
                              setRsvpStatus("idle");
                              setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic"
                            required
                          />
                        </div>



                        <div className="space-y-5 pt-6">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Will you attend?
                          </label>

                          <div className="flex flex-col gap-3 font-serif italic text-lg md:text-xl text-slate-700">
                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "yes" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "yes" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "yes"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "yes" })); }} />
                              <span>Delightfully accepts</span>
                            </label>

                            <label className="flex items-center gap-4 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-none border-[0.5px] flex items-center justify-center transition-colors ${rsvpForm.attending === "no" ? "border-[#d4af37] bg-[#d4af37]/10" : "border-slate-300 bg-transparent group-hover:border-[#d4af37]/50"}`}>
                                {rsvpForm.attending === "no" && <div className="w-3 h-3 bg-[#d4af37]" />}
                              </div>
                              <input type="radio" className="hidden" checked={rsvpForm.attending === "no"} onChange={() => { setRsvpStatus("idle"); setRsvpForm((prev) => ({ ...prev, attending: "no" })); }} />
                              <span>Regretfully declines</span>
                            </label>
                          </div>
                        </div>

                        {rsvpForm.attending === "yes" && (
                          <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-500 relative group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] absolute -top-4 left-0 transition-colors group-focus-within:text-[#d4af37]">
                              Number of Guests
                            </label>
                            <div className="relative">
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => {
                                  setRsvpStatus("idle");
                                  setRsvpForm((prev) => ({ ...prev, guests: e.target.value }));
                                }}
                                className="w-full bg-transparent border-b-[0.5px] border-slate-300 px-0 py-2 text-slate-800 focus:outline-none focus:border-[#d4af37] transition-all font-serif text-lg md:text-xl italic appearance-none cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num.toString()}>
                                    {num} {num === 1 ? "Guest" : "Guests"}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                                <ChevronDown size={16} />
                              </div>
                            </div>
                          </div>
                        )}

                        {(rsvpStatus === "success" || rsvpStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold tracking-widest uppercase mt-4 ${rsvpStatus === "success" ? "text-emerald-700" : "text-red-500"
                              }`}
                          >
                            {rsvpStatus === "success"
                              ? "Thank you! RSVP sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}

                        <div className="pt-8">
                          <button
                            type="submit"
                            disabled={rsvpStatus === "sending"}
                            className="w-full border-[0.5px] border-[#d4af37] bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-white py-4 rounded-sm font-montserrat text-[10px] md:text-[11px] tracking-[0.3em] font-medium transition-all shadow-[0_4px_10px_rgba(0,0,0,0.03)] uppercase disabled:opacity-50"
                          >
                            {rsvpStatus === "sending" ? "SENDING..." : "CONFIRM ATTENDANCE"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            <div className="relative bg-[#D8BCA3]/10">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

              <section className="relative py-24 md:py-36 flex flex-col items-center overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B7410E]/10 mb-8 mt-4 shadow-sm border border-[#B7410E]/20">
                      <Sparkles className="w-8 h-8 text-[#B7410E]" />
                    </div>

                    <h2 className="font-script text-[4.5rem] sm:text-[5rem] md:text-[7rem] text-[#B7410E] mb-6 drop-shadow-sm leading-none">
                      Best Wishes
                    </h2>
                    <div className="h-px w-24 bg-[#D8BCA3] mb-8" />

                    <p className="text-[#B7410E] text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-serif tracking-[0.1em] px-4 uppercase font-bold">
                      Your presence at our wedding is the greatest gift of all. However, if you
                      wish to honor us with a message, we would be delighted to read it!
                    </p>

                    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(6,78,59,0.1)] border border-[#D8BCA3]/50 relative group card-marble">
                      <div className="absolute inset-0 gold-foil-edge opacity-20 pointer-events-none" />
                      <div className="absolute inset-2 border-[0.5px] border-[#B7410E]/20 pointer-events-none transition-colors duration-700" />

                      <form className="space-y-12 text-left relative z-10" onSubmit={handleWishSubmit}>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B7410E]/40">
                            From
                          </label>
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#D8BCA3]/40 px-0 py-4 text-[#B7410E] placeholder:text-[#D8BCA3]/30 focus:outline-none focus:border-[#B7410E] transition-all font-cinzel text-lg tracking-widest"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B7410E]/40">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            placeholder="WISHES..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#D8BCA3]/40 px-0 py-4 text-[#B7410E] placeholder:text-[#D8BCA3]/30 focus:outline-none focus:border-[#B7410E] transition-all font-cinzel text-lg tracking-widest resize-none"
                            required
                          />
                        </div>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <p
                            className={`text-[10px] text-center font-semibold ${wishStatus === "success" ? "text-emerald-700" : "text-red-500"
                              }`}
                          >
                            {wishStatus === "success"
                              ? "Wish sent successfully."
                              : "Something went wrong. Please try again."}
                          </p>
                        )}
                        <div className="pt-6 flex justify-center">
                          <button
                            type="submit"
                            disabled={wishStatus === "sending"}
                            className="bg-[#B7410E] text-white px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#774C32] transition-all duration-300 shadow-md disabled:opacity-70"
                          >
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </section>

              <footer className="relative py-24 md:py-32 bg-[#5F3924] w-full flex flex-col items-center overflow-hidden z-20">
                {/* Subtle vignette over the deep green */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0"></div>

                {/* Elegant border details */}
                <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
                <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[#d4af37]/20 pointer-events-none z-10 hidden md:block rounded-sm shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]"></div>

                <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center relative z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#d4af37]/40" />
                      <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-[#d4af37]/60" />
                      <div className="h-[0.5px] w-12 md:w-16 bg-[#d4af37]/40" />
                    </div>

                    <p className="font-montserrat text-[9px] md:text-[11px] tracking-[0.5em] text-[#f7e7ce]/70 uppercase font-medium mb-4">
                      With heartfelt gratitude
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mt-4">
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Shaleeka
                      </h2>
                      <span className="font-serif text-3xl md:text-5xl text-[#d4af37] italic opacity-80 drop-shadow-md pb-2">&</span>
                      <h2 className="font-alex text-5xl md:text-7xl text-gold-gradient py-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-none">
                        Sachini
                      </h2>
                    </div>
                  </motion.div>

                  <div className="mt-20 pt-8 border-t-[0.5px] border-[#d4af37]/30 w-full max-w-xs md:max-w-md flex flex-col items-center gap-4">
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#f7e7ce]/50 font-bold leading-relaxed flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <span>© 2026 Shaleeka & Sachini</span>
                      <span className="hidden md:inline text-[#d4af37]/30">|</span>
                      <span>All Rights Reserved</span>
                    </p>
                    <p className="text-[#D4AF37]/80 text-[10px] md:text-xs mt-2 font-montserrat tracking-wider text-center">
                      Want a beautiful wedding website like this? Create yours with <a target="_blank" rel="noreferrer" className="text-white hover:text-[#D4AF37] underline transition-colors" href="https://wa.me/94707819074">invitemint</a>
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        preload="metadata"
        playsInline
        className="sr-only"
        aria-hidden
      />

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={() => handleSoundToggle()}
        aria-pressed={musicAudible}
        aria-label={musicAudible ? "Mute background music" : "Unmute background music"}
        className="fixed bottom-6 left-6 z-[120] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#B7410E] bg-white/95 text-[#B7410E] shadow-[0_0_0_4px_rgba(197,160,89,0.2),0_10px_36px_-6px_rgba(135,147,122,0.45)] backdrop-blur-md touch-manipulation transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(197,160,89,0.28),0_14px_44px_-6px_rgba(135,147,122,0.5)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7410E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfaf5]"
      >
        {musicAudible ? <Volume2 className="h-6 w-6" strokeWidth={2} /> : <VolumeX className="h-6 w-6" strokeWidth={2} />}
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #D8BCA333;
        }
        ::-webkit-scrollbar-thumb {
          background: #B7410E66;
          border-radius: 10px;
        }
      `,
        }}
      />
      <AdminPanel />
      <AnimatePresence>
        {isAccommodationOpen && (
          <AccommodationModal
            isOpen={isAccommodationOpen}
            onClose={() => setIsAccommodationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState(window.location.origin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsVisible(true);
    }
  }, []);

  const generateLink = () => {
    const fullName = prefix === "None" ? name : `${prefix} ${name}`;
    const urlSafeName = fullName.trim().replace(/\s+/g, "_");
    const link = `${baseUrl}?to=${urlSafeName}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-[200] max-w-sm w-full bg-white/90 backdrop-blur-xl border border-theme-200 rounded-2xl shadow-2xl p-6 font-montserrat animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel font-bold text-theme-800 text-sm tracking-widest uppercase">
          Invitation Manager
        </h2>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <VolumeX className="w-4 h-4 rotate-45" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Base Hosted Link
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://your-wedding-site.com"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Prefix
          </label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          >
            <option>Mr. & Mrs.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Miss</option>
            <option>Family</option>
            <option>Dear</option>
            <option>None</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1 block">
            Guest Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-theme-400"
          />
        </div>

        <button
          onClick={generateLink}
          className="w-full bg-[#B7410E] text-white py-3 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-[#774C32] transition-all"
        >
          Generate Personalized Link
        </button>

        {generatedLink && (
          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col gap-2">
            <p className="text-[9px] text-stone-500 break-all font-mono">{generatedLink}</p>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-theme-200 transition-all"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-[9px] text-stone-400 leading-relaxed">
        Tip: Add <span className="font-bold">?admin=true</span> to any URL to open this menu again.
      </p>
    </div>
  );
}
