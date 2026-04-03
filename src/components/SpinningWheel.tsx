import { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const SEGMENTS = 10;
const SEGMENT_ANGLE = 360 / SEGMENTS;

// Alternating: PERDU (grey), 🎁 (orange)
const segmentData = Array.from({ length: SEGMENTS }, (_, i) => ({
  isGift: i % 2 === 1,
  label: i % 2 === 1 ? "🎁" : "PERDU",
}));

interface SpinningWheelProps {
  enabled: boolean;
  onResult: (isWin: boolean) => void;
}

const SpinningWheel = ({ enabled, onResult }: SpinningWheelProps) => {
  const controls = useAnimation();
  const [spinning, setSpinning] = useState(false);
  const currentRotation = useRef(0);

  const spin = async () => {
    if (!enabled || spinning) return;
    setSpinning(true);

    // Random extra rotations (5-8 full spins) + random final angle
    const extraSpins = 5 + Math.random() * 3;
    const finalAngle = Math.random() * 360;
    const totalRotation = extraSpins * 360 + finalAngle;
    const newRotation = currentRotation.current + totalRotation;

    await controls.start({
      rotate: newRotation,
      transition: {
        duration: 4 + Math.random() * 2,
        ease: [0.2, 0.8, 0.3, 1],
      },
    });

    currentRotation.current = newRotation;

    // Calculate which segment the pointer points to
    // Pointer is at top (0°). We need to find which segment is at 0° after rotation.
    const normalizedAngle = ((360 - (newRotation % 360)) + 360) % 360;
    const segmentIndex = Math.floor(normalizedAngle / SEGMENT_ANGLE);
    const isWin = segmentData[segmentIndex].isGift;

    setSpinning(false);
    onResult(isWin);
  };

  const drawWheel = () => {
    const size = 300;
    const center = size / 2;
    const radius = size / 2;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segmentData.map((seg, i) => {
          const startAngle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const x1 = center + radius * Math.cos(startAngle);
          const y1 = center + radius * Math.sin(startAngle);
          const x2 = center + radius * Math.cos(endAngle);
          const y2 = center + radius * Math.sin(endAngle);

          const midAngle = ((i + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
          const textX = center + radius * 0.65 * Math.cos(midAngle);
          const textY = center + radius * 0.65 * Math.sin(midAngle);
          const textRotation = (i + 0.5) * SEGMENT_ANGLE;

          return (
            <g key={i}>
              <path
                d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                fill={seg.isGift ? "hsl(22, 95%, 46%)" : "hsl(0, 0%, 15%)"}
                stroke="hsl(28, 52%, 90%)"
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                fill="white"
                fontSize={seg.isGift ? "22" : "10"}
                fontWeight="bold"
                fontFamily="Montserrat, sans-serif"
              >
                {seg.label}
              </text>
            </g>
          );
        })}
        {/* Center circle */}
        <circle cx={center} cy={center} r={30} fill="hsl(28, 52%, 90%)" stroke="hsl(0,0%,15%)" strokeWidth="3" />
      </svg>
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Pointer arrow at top */}
      <div className="relative z-10 -mb-3">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <polygon points="15,28 5,5 25,5" fill="hsl(22, 95%, 46%)" stroke="hsl(0,0%,10%)" strokeWidth="2" />
        </svg>
      </div>

      {/* Wheel */}
      <motion.div animate={controls} className="relative">
        {drawWheel()}
        {/* Spin button overlay */}
        <button
          onClick={spin}
          disabled={!enabled || spinning}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-secondary text-secondary-foreground font-montserrat font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-transform hover:scale-110 z-10"
        >
          {spinning ? "..." : "SPIN"}
        </button>
      </motion.div>
    </div>
  );
};

export default SpinningWheel;
