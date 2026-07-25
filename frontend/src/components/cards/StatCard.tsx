import type { Stat } from "../../data/homeData";

interface StatCardProps {
  stat: Stat;
}

const StatCard = ({ stat }: StatCardProps) => {
  const Icon = stat.icon;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 ">
        <Icon className={`h-7 w-7 ${stat.iconColor}`} />
      </div>

      <div>
        <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>

        <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
      </div>
    </div>
  );
};

export default StatCard;
