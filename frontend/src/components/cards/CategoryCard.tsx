import type { Category } from "../../data/homeData";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = category.icon;

  return (
    <div className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-violet-300">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
        <Icon className={`h-8 w-8 ${category.iconColor}`} />
      </div>

      <h3 className="text-center text-lg font-semibold text-gray-900">
        {category.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {category.questions} Questions
      </p>
    </div>
  );
};

export default CategoryCard;
