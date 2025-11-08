import type { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string;
  icon: IconType;
  iconBgColor: string;
}

const StatsCard = ({ title, value, icon: Icon, iconBgColor }: StatsCardProps) => {
  return (
    <div className="bg-brand-surface p-6 rounded-2xl border border-brand-border flex items-center justify-between shadow-sm">
      <div>
        <p className="text-brand-text-secondary">{title}</p>
        <p className="text-5xl font-bold text-brand-green-dark mt-2">{value}</p>
      </div>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBgColor}`}>
        <Icon size={32} className="text-brand-green-dark" />
      </div>
    </div>
  );
};

export default StatsCard;
