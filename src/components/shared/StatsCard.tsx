interface StatsCardProps {
  number: string;
  label: string;
}

export function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
      <div className="text-4xl font-black text-red-600 mb-2">{number}</div>
      <div className="text-sm text-gray-700 font-semibold">{label}</div>
    </div>
  );
}
