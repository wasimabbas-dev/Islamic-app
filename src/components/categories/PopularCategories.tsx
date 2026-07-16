import CategoryCard from "../cards/CategoryCard";
import StatCard from "../cards/StatCard";
import { categories, stats } from "../../data/homeData";

const PopularCategories = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          {/* <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            Popular Categories
          </span> */}

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Browse Questions by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Find answers to Islamic questions organized by topic. Browse through
            our comprehensive collection of scholarly responses.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 rounded-3xl bg-white p-8 shadow-lg">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
