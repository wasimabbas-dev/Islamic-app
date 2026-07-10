import HeroSearch from "./HeroSearch";
import FeatureBadge from "./FeatureBadge";

const HeroLeft = () => {
  return (
    <div>
      <p className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
        Trusted Islamic Knowledge Platform
      </p>

      <h1 className="text-5xl font-bold leading-tight text-slate-900">
        Seek Guidance.
        <br />
        Find Authentic Answers.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
        Explore authentic Islamic knowledge based on the Quran, Sunnah, and
        Hanafi Fiqh. Search fatwas, ask scholars, and deepen your understanding
        with confidence.
      </p>

      <div className="mt-8">
        <HeroSearch />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <FeatureBadge text="Quran Based" />
        <FeatureBadge text="Verified Scholars" />
        <FeatureBadge text="Hanafi Fiqh" />
        <FeatureBadge text="Secure Platform" />
      </div>
    </div>
  );
};

export default HeroLeft;
