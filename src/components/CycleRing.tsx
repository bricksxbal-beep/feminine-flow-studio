import { useMemo } from 'react';
import { CycleData } from '@/types/cycle';
import { getCurrentCycleDay } from '@/lib/cycleCalculations';
import { getPhaseSegments, CyclePhase } from '@/lib/phaseCalculations';

const PHASE_COLORS: Record<CyclePhase, string> = {
  menstrual: 'hsl(340, 82%, 67%)',
  follicular: 'hsl(280, 65%, 75%)',
  ovulation: 'hsl(160, 50%, 55%)',
  luteal: 'hsl(260, 50%, 65%)',
};

const PHASE_COLORS_DIM: Record<CyclePhase, string> = {
  menstrual: 'hsl(340, 50%, 85%)',
  follicular: 'hsl(280, 40%, 88%)',
  ovulation: 'hsl(160, 35%, 85%)',
  luteal: 'hsl(260, 35%, 85%)',
};

interface CycleRingProps {
  cycleData: CycleData;
  size?: number;
}

export const CycleRing = ({ cycleData, size = 280 }: CycleRingProps) => {
  const currentDay = getCurrentCycleDay(cycleData);
  const segments = getPhaseSegments(cycleData);
  const totalDays = cycleData.cycleLength;
  const center = size / 2;
  const radius = (size - 40) / 2;
  const dotRadius = 5;
  const progressDotRadius = 8;

  const dots = useMemo(() => {
    const items = [];
    for (let day = 1; day <= totalDays; day++) {
      const angle = ((day - 1) / totalDays) * 360 - 90;
      const rad = (angle * Math.PI) / 180;
      const x = center + radius * Math.cos(rad);
      const y = center + radius * Math.sin(rad);

      const segment = segments.find(s => day >= s.start && day <= s.end);
      const phase = segment?.phase || 'luteal';
      const isPast = day <= currentDay;
      const isCurrent = day === currentDay;

      items.push({ day, x, y, phase, isPast, isCurrent });
    }
    return items;
  }, [totalDays, currentDay, segments, center, radius]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      {/* Background circle */}
      <circle cx={center} cy={center} r={radius + 15} fill="none" stroke="hsl(330, 30%, 92%)" strokeWidth="1" opacity="0.5" />
      
      {/* Phase arc backgrounds */}
      {segments.map((seg, i) => {
        const startAngle = ((seg.start - 1) / totalDays) * 360 - 90;
        const endAngle = (seg.end / totalDays) * 360 - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const arcRadius = radius - 18;
        
        const x1 = center + arcRadius * Math.cos(startRad);
        const y1 = center + arcRadius * Math.sin(startRad);
        const x2 = center + arcRadius * Math.cos(endRad);
        const y2 = center + arcRadius * Math.sin(endRad);
        const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;

        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${x2} ${y2}`}
            fill="none"
            stroke={PHASE_COLORS[seg.phase]}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.2"
          />
        );
      })}

      {/* Day dots */}
      {dots.map(({ day, x, y, phase, isPast, isCurrent }) => (
        <g key={day}>
          {isCurrent ? (
            <>
              <circle cx={x} cy={y} r={progressDotRadius + 4} fill={PHASE_COLORS[phase]} opacity="0.15">
                <animate attributeName="r" values={`${progressDotRadius + 2};${progressDotRadius + 6};${progressDotRadius + 2}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={progressDotRadius} fill={PHASE_COLORS[phase]} stroke="white" strokeWidth="2" />
            </>
          ) : (
            <circle
              cx={x}
              cy={y}
              r={dotRadius}
              fill={isPast ? PHASE_COLORS[phase] : PHASE_COLORS_DIM[phase]}
              opacity={isPast ? 0.9 : 0.4}
            />
          )}
        </g>
      ))}
    </svg>
  );
};
