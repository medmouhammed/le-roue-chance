import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

const PRIZES = [
  "Soupe Miso Offerte",
  "Dessert offert",
  "10% Réduction",
  "Cadeau Surprise",
];

interface VoucherScreenProps {
  open: boolean;
  onClose: () => void;
}

const VoucherScreen = ({ open, onClose }: VoucherScreenProps) => {
  const [prize] = useState(() => PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open, onClose]);

  if (!open) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/70 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-[scale-in_0.3s_ease-out]">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Gift className="text-primary-foreground" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2 font-montserrat">
          🎉 Félicitations !
        </h2>

        <p className="text-lg font-semibold text-primary mb-4 font-montserrat">
          {prize}
        </p>

        <p className="text-muted-foreground text-sm mb-2">
          Présentez cet écran au serveur
        </p>

        <div className="bg-muted rounded-xl py-3 px-6 inline-block">
          <span className="text-2xl font-bold font-montserrat text-foreground tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Ce bon expire dans le temps affiché
        </p>
      </div>
    </div>
  );
};

export default VoucherScreen;
