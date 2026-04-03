import { X } from "lucide-react";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
}

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ7eN5L7LByRIRcTJEj6n2t_0";

const ReviewModal = ({ open, onClose }: ReviewModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-[scale-in_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-foreground text-center mb-6 font-montserrat">
          Suivez les étapes :
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <span className="text-foreground font-medium">Laissez nous un avis</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <span className="text-foreground font-medium">Revenez sur cette page</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎡</span>
            <span className="text-foreground font-medium">Faites tourner la roue !</span>
          </div>
        </div>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-primary-foreground font-bold py-3 rounded-xl text-lg hover:opacity-90 transition-opacity font-montserrat"
        >
          ⭐ Notez sur Google
        </a>
      </div>
    </div>
  );
};

export default ReviewModal;
