import { useState, useEffect, useCallback } from "react";
import FloatingFood from "@/components/FloatingFood";
import SpinningWheel from "@/components/SpinningWheel";
import ReviewModal from "@/components/ReviewModal";
import VoucherScreen from "@/components/VoucherScreen";

const SPIN_COOLDOWN_KEY = "le_nippon_last_spin";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

const canSpin = () => {
  const last = localStorage.getItem(SPIN_COOLDOWN_KEY);
  if (!last) return true;
  return Date.now() - parseInt(last, 10) > COOLDOWN_MS;
};

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [wheelEnabled, setWheelEnabled] = useState(false);
  const [thanksMessage, setThanksMessage] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  const [showLost, setShowLost] = useState(false);
  const [cooldownBlocked, setCooldownBlocked] = useState(false);

  // Check cooldown on mount
  useEffect(() => {
    if (!canSpin()) setCooldownBlocked(true);
  }, []);

  // Window focus detection: when user returns from Google review
  useEffect(() => {
    if (!modalOpen) return;

    const handleFocus = () => {
      setModalOpen(false);
      setThanksMessage(true);
      setWheelEnabled(true);
      setTimeout(() => setThanksMessage(false), 2500);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [modalOpen]);

  const handlePlay = () => {
    if (cooldownBlocked) return;
    setModalOpen(true);
  };

  const handleResult = useCallback((isWin: boolean) => {
    localStorage.setItem(SPIN_COOLDOWN_KEY, Date.now().toString());
    setWheelEnabled(false);
    setCooldownBlocked(true);

    setTimeout(() => {
      if (isWin) {
        setShowVoucher(true);
      } else {
        setShowLost(true);
        setTimeout(() => setShowLost(false), 3000);
      }
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      <FloatingFood />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-foreground font-montserrat tracking-tight">
          Le Nippon
        </h1>
        <p className="text-muted-foreground text-sm mt-1 font-montserrat">
          Marseille • Restaurant Japonais
        </p>
      </div>

      {/* Thanks message */}
      {thanksMessage && (
        <div className="relative z-10 mb-4 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold font-montserrat animate-[fade-in_0.3s_ease-out]">
          Merci ! 🎉
        </div>
      )}

      {/* Wheel */}
      <div className="relative z-10">
        <SpinningWheel enabled={wheelEnabled} onResult={handleResult} />
      </div>

      {/* Play button */}
      {!wheelEnabled && !cooldownBlocked && (
        <button
          onClick={handlePlay}
          className="relative z-10 mt-8 bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform font-montserrat"
        >
          🎰 JOUER LA PARTIE
        </button>
      )}

      {cooldownBlocked && !showVoucher && (
        <p className="relative z-10 mt-8 text-muted-foreground text-sm font-montserrat text-center">
          Vous avez déjà joué aujourd'hui.<br />Revenez demain ! 🍣
        </p>
      )}

      {/* Lost message */}
      {showLost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/60 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-8 text-center shadow-2xl animate-[scale-in_0.3s_ease-out]">
            <p className="text-3xl mb-2">😢</p>
            <p className="text-xl font-bold font-montserrat text-foreground">Perdu !</p>
            <p className="text-muted-foreground text-sm mt-1">Retentez votre chance demain</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReviewModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <VoucherScreen open={showVoucher} onClose={() => setShowVoucher(false)} />
    </div>
  );
};

export default Index;
