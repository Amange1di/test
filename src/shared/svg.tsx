type SmallGlass2Props = {
  value: number;
  vesselCap: number;
  pourSize: number;
};

export const SmallGlass2 = ({ value, vesselCap, pourSize }: SmallGlass2Props) => {
  const minY = 30;
  const maxY = 0;
  const waterLevelY = minY - ((value / vesselCap) * (minY - maxY));

  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 12 L42 12 Q48 14 46 68 Q45 74 30 74 Q15 74 14 68 Q12 14 18 12 Z"
        stroke="#2ecc40"
        strokeWidth="4"
        fill="#fff6"
      />
      <rect x="44" y="28" width="8" height="24" rx="4" stroke="#2ecc40" strokeWidth="4" fill="none" />
      <path
        d={`
          M17 ${waterLevelY} 
          Q30 ${waterLevelY + 12} 43 ${waterLevelY} 
          Q44 68 30 70 
          Q16 68 17 ${waterLevelY} 
          Z
        `}
        fill="#00eaff"
        fillOpacity="0.7"
      />
      <g stroke="#fff" strokeWidth="2">
        <line x1="20" y1="22" x2="32" y2="22" />
        <line x1="20" y1="32" x2="32" y2="32" />
        <line x1="20" y1="42" x2="32" y2="42" />
        <line x1="20" y1="52" x2="32" y2="52" />
        <line x1="20" y1="62" x2="32" y2="62" />
      </g>
      <circle cx="30" cy="65" r="10" fill="#222" />
      <text x="30" y="70" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">
        {value}
      </text>
    </svg>
  );
};




export const BigGlass = ({ value, pouring, pourSize, vesselCap }: { value?: number; pouring?: boolean; pourSize?: number; vesselCap?: number }) => {
  const cap = vesselCap ?? 5;
  const waterLevel = value !== undefined ? Math.max(0, Math.min(1, value / cap)) : 0;
  const y = 98 - (98 - 42) * waterLevel;
  const h = 98 - y;
  let newY = y;
  let newH = 0;
  if (pouring && pourSize && value !== undefined) {
    const nextLevel = Math.max(0, Math.min(1, (value + pourSize) / cap));
    newY = 98 - (98 - 42) * nextLevel;
    newH = y - newY;
  }
  return (
    <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="60" height="90" rx="8" stroke="#2ecc40" strokeWidth="4" fill="#fff6" />
      <rect x="75" y="30" width="12" height="50" rx="6" stroke="#2ecc40" strokeWidth="4" fill="none" />
      <rect x="17" y={y} width="56" height={h} rx="6" fill="#00eaff" fillOpacity="0.7" style={{ transition: 'y 0.3s, height 0.3s' }} />
      {pouring && pourSize && newH > 0 && (
        <rect x="17" y={newY} width="56" height={newH} rx="6" fill="#00eaff" fillOpacity="0.95" style={{ transition: 'y 0.3s, height 0.3s' }} />
      )}
      <g stroke="#fff" strokeWidth="2">
        <line x1="20" y1="20" x2="30" y2="20" />
        <line x1="20" y1="30" x2="30" y2="30" />
        <line x1="20" y1="40" x2="30" y2="40" />
        <line x1="20" y1="50" x2="30" y2="50" />
        <line x1="20" y1="60" x2="30" y2="60" />
        <line x1="20" y1="70" x2="30" y2="70" />
        <line x1="20" y1="80" x2="30" y2="80" />
        <line x1="20" y1="90" x2="30" y2="90" />
      </g>
      {value !== undefined && <circle cx="60" cy="90" r="12" fill="#222" />}
      {value !== undefined && (
        <text x="60" y="95" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="bold">{value}</text>
      )}
    </svg>
  );
};

export const SmallGlass = ({ value }: { value?: number }) => {
  const waterLevel = value !== undefined ? Math.max(0, Math.min(1, value / 3)) : 0;
  const y = 63 - (63 - 24) * waterLevel;
  const h = 63 - y;
  return (
    <svg width="60" height="100" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="40" height="75" rx="6" stroke="#2ecc40" strokeWidth="4" fill="#fff6" />
      <rect x="50" y="25" width="8" height="30" rx="4" stroke="#2ecc40" strokeWidth="4" fill="none" />
      <rect x="12" y={y} width="26" height={h} rx="4" fill="#00eaff" fillOpacity="0.7" style={{ transition: 'y 0.3s, height 0.3s' }} />
      <g stroke="#fff" strokeWidth="2">
        <line x1="15" y1="20" x2="25" y2="20" />
        <line x1="15" y1="30" x2="25" y2="30" />
        <line x1="15" y1="40" x2="25" y2="40" />
        <line x1="15" y1="50" x2="25" y2="50" />
        <line x1="15" y1="60" x2="25" y2="60" />
      </g>
      {value !== undefined && <circle cx="30" cy="60" r="10" fill="#222" />}
      {value !== undefined && (
        <text x="30" y="65" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">{value}</text>
      )}
    </svg>
  );
};

export default {  BigGlass, SmallGlass, SmallGlass2 };
