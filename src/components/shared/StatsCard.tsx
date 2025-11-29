interface StatsCardProps {
  number: string;
  label: string;
}

export function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div className="tile-stats text-center">
      <div className="text-3xl md:text-4xl font-black text-red-900 mb-2">
        {number}
      </div>
      <div className="text-sm md:text-base text-red-800 font-semibold">
        {label}
      </div>
    </div>
  );
}
